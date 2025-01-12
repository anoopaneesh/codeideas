import axios from "axios"

type SignUpValues = {
    email: string
    password: string
}
export const signup = async (values: SignUpValues) => {
    try {
        const data = await axios.post('/api/signup', JSON.stringify({

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