//axiosInstance.js

import axios from 'axios';

//creating an axios instance
const axiosInstance = axios.create({
    baseURL: '',
    withCredentials: true // This attaches cookies (e.g., refresh token) to the request
});

/** Interceptor for requests sent from the application: 
retrieve the Access Token from localStorage and 
add it to every API request made using the axios instance.
*/
axiosInstance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem(process.env.NEXT_PUBLIC_ST_ID + 'access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

/** Interceptor for responses received by the application: 
check if the response indicates an expired access token, and 
if so, send a refresh token request to obtain a new access token and
retry the original request using the updated token.
Here the refresh token is stored as cookies.
*/
axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {

        const originalRequest = error.config;

        if (error.response && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await axios.post('/api/refresh', JSON.stringify({ refresh_token: localStorage.getItem(process.env.NEXT_PUBLIC_ST_ID + "refresh_token")}), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response) {
                    //update the access token-t
                    localStorage.setItem(process.env.NEXT_PUBLIC_ST_ID + 'access_token', response.data.access_token);

                    originalRequest.headers['Authorization'] = `Bearer ${response.data.access_token}`;

                    return axiosInstance(originalRequest);
                }
            } catch (error) {
                // console.error('Error fetching data:', error);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;