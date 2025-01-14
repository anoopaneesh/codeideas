import axiosInstance from "./axiosInstance"
type SignUpValues = {
    email: string
    password: string
}
export const signup = async (values: SignUpValues) => {
    try {
        const data = await axiosInstance.post('/api/signup', JSON.stringify({

            "email": values.email,
            "password": values.password,
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error: any) {
        const status = error?.response?.status
        if (status === 409) {
            throw new Error(error?.response?.data?.message)
        }
        throw new Error("Signup failed, please try again.")
    }
}

type LoginValues = {
    username: string
    password: string
}

export const login = async (values: LoginValues) => {
    try {
        const { data } = await axiosInstance.post('/api/login', JSON.stringify(values), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return data
    } catch (error: any) {
        const status = error?.response?.status
        if (status === 404) {
            throw new Error(error?.response?.data?.message)
        }
        throw new Error("Login failed, please try again.")
    }
}

export const verify = async () : Promise<boolean> => {
    try {
        await axiosInstance.get('/api/verify')
        return true
    } catch (error: any) {
        const status = error?.response?.status
        if (status === 403 || status === 401) {
            throw new Error(error?.response?.data?.message)
        }

        throw new Error('User authorization failed')
    }
}