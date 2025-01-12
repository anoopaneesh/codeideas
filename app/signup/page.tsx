"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod" 
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { signup } from "@/services/auth.service"
import { useRouter } from "next/navigation"


const formSchema = z.object({
 
    email: z.string().email({
        message: "Email address is not valid"
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string()
})

export default function SignUp() {
    const {toast} = useToast()
    const router = useRouter()
    const [errorText, setErrorText] = useState("")
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { 
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setErrorText("")
            // Do something with the form values.
            // ✅ This will be type-safe and validated.
            console.log(values)
            if (values.confirmPassword !== values.password) {
                setErrorText("Passwords does not match")
                return;
            }

            const data = await signup({email:values.email,password:values.password})
            setTimeout(() => {
                router.push(`/login?email=${values.email}`)
            },2000)
            toast({
                title:"Account created successfully",
                duration:2000,
                onDurationChange:(...args) => {
                    console.log({args})
                }
            })

            
        } catch (error:any) {
            setErrorText(error.message)
        }

    }



    return (<div className="bg-black w-full h-screen flex flex-col items-center justify-center text-white">
        <div className="flex flex-col gap-2 px-8 py-16 border border-neutral-900 rounded-md items-center">
            <p className="text-4xl font-bold mb-4">Join Codeideas</p>
            <div className="w-[400px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input className="border-0 focus:outline-0 focus:ring-0 bg-neutral-900" placeholder="xyz@abc.com" {...field} />
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
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
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
            <Link href="/login"><p className="underline mt-10">Already have an account ? Log in</p></Link>
        </div>
    </div>)
}
