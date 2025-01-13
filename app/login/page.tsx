"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { login } from "@/services/auth.service"
import { useRouter } from "next/navigation"


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})

export default function Login() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [errorText,setErrorText] = useState("")
    const { toast } = useToast();
    const redirectedEmail = searchParams.get('email')
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: redirectedEmail || "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setErrorText("")
            const data = await login({ username: values.username, password: values.password })
            localStorage.setItem(process.env.NEXT_PUBLIC_ST_ID+'access_token',data.access_token)
            localStorage.setItem(process.env.NEXT_PUBLIC_ST_ID+'refresh_token',data.refresh_token)
            setTimeout(() => {
                router.push('/')
            }, 500)
            toast({
                title: "User logged in successfully.",
                duration: 500,
                onDurationChange: (...args) => {
                    console.log({ args })
                }
            })


        } catch (error: any) {
            setErrorText(error.message)
        }
    }

    return (<div className="bg-black w-full h-screen flex flex-col items-center justify-center text-white">
        <div className="flex flex-col gap-2 px-8 py-16 border border-neutral-900 rounded-md items-center">
            <p className="text-4xl font-bold mb-4">Log In</p>
            <div className="w-[400px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username or Email</FormLabel>
                                    <FormControl>
                                        <Input className="border-0 focus:outline-0 focus:ring-0 bg-neutral-900" placeholder="codeideas" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" className="border-0 focus:outline-0 focus:ring-0 bg-neutral-900" placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <p className="text-red-500">{errorText}</p>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
            <Link href="/signup"><p className="underline mt-10">Don't have an account ? Join Us</p></Link>
        </div>
    </div>)
}
