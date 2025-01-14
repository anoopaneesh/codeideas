"use client"
import { verify } from '@/services/auth.service'
import React, { JSX, PropsWithChildren, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
const IsAuthorized = (Page: () => JSX.Element) => {
    const authorized = () => {
        const [loading, setLoading] = useState(true)
        const router = useRouter();
        const verifyUser = async () => {
            try {
                await verify();
                setLoading(false);
            } catch (error) {
                router.push('/login')
            }
        }

        useEffect(() => {
            verifyUser()
        }, [])

        return loading ? <div
            className='w-full h-screen bg-black'
        >
            
        </div>: <Page />
    }
    return authorized
}

export default IsAuthorized
