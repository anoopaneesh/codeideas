"use client"
import { Input } from '@/components/ui/input'
import React, { startTransition } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaHeart } from "react-icons/fa";
import IdeaCard from '@/components/IdeaCard'
import { useRouter } from 'next/navigation'
import { useProgressBar } from '@/components/common/progress-bar'
import IsAuthorized from '@/components/hoc/IsAuthorized'


const Home = () => {
    const router = useRouter()
    const { start, done } = useProgressBar()
    const openCreateIdea = () => {
        start()
        startTransition(() => {
            router.push('/code')
            done()
        })
    }
    return (
        <div className='h-full flex flex-col'>
            <nav className='h-20 bg-black w-full flex justify-between items-center px-32 relative'>
                <div>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-white">
                        CodeIdeas
                    </h3>
                </div>
                <div className='flex items-center gap-4'>
                    <Button className='bg-purple-700 font-bold hover:bg-purple-800 select-none' onClick={openCreateIdea}>Create Idea</Button>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <Input type='text' placeholder='Search' className='bg-[#252830] outline-none border-none text-white w-60 focus:bg-[#444857] font-bold' />
                </div>
            </nav>
            <div className='flex-1 bg-[#131417]'>
                <Tabs defaultValue="your-ideas" className="w-full">
                    <TabsList className='bg-transparent mt-8'>
                        <TabsTrigger value="your-ideas">My Ideas</TabsTrigger>
                        <TabsTrigger value="favorites">Favorites</TabsTrigger>
                    </TabsList>
                    <TabsContent value="your-ideas" className='w-full  px-32 grid grid-cols-4 gap-4 mt-4'>
                        <IdeaCard title="MyIdea01" likes={10} />
                        <IdeaCard title="MyIdea01" likes={10} />
                        <IdeaCard title="MyIdea01" likes={10} />
                        <IdeaCard title="MyIdea01" likes={10} />
                        <IdeaCard title="MyIdea01" likes={10} />
                        <IdeaCard title="MyIdea01" likes={10} />
                        <IdeaCard title="MyIdea01" likes={10} />
                    </TabsContent>
                    <TabsContent value="favorites">Change your password here.</TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default IsAuthorized(Home)
