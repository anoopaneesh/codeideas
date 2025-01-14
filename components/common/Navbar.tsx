"use client"
import React, { useState } from 'react'
import { RiLayout2Line } from "react-icons/ri";
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CodeLayout } from '@/common/types';
import { useRouter } from 'next/navigation';
import { FaUser } from "react-icons/fa";

interface NavbarProps{
    layout: CodeLayout,
    handleLayoutChange: (layout:CodeLayout) => void
}

const layoutIconClass = {
    [CodeLayout.LEFT]:'rotate-180',
    [CodeLayout.TOP] : '-rotate-90',
    [CodeLayout.RIGHT]: 'rotate-0'
}

const Navbar : React.FC<NavbarProps> = ({layout,handleLayoutChange}) => {
    const [popoverOpen,setPopoverOpen] = useState(false)
    const router = useRouter()
    const changeLayout = (newLayout:CodeLayout) => {
        handleLayoutChange(newLayout)
        setPopoverOpen(false)
    }
    const handleSignOut=  () => {
        localStorage.removeItem(process.env.NEXT_PUBLIC_ST_ID+'access_token')
        router.push('/login')
    }
    return (
        <div className='w-full h-16 bg-black flex justify-between items-center px-16'>
            <div></div>
            <div className='cursor-pointer space-x-6'>

                <Popover open={popoverOpen} >
                    <PopoverTrigger onClick={() => setPopoverOpen((oldValue) => !oldValue)} className={`bg-slate-900 p-2 rounded-sm ${layoutIconClass[layout]} `}>
                       <RiLayout2Line color='white' size={30} />
                    </PopoverTrigger>
                    <PopoverContent className='bg-zinc-950 text-white border-none'>
                        <p className='font-bold mb-4'>Change View</p>
                        <div className='flex gap-2 w-[120px] justify-between'>
                            <span className={` ${layout === CodeLayout.LEFT && 'bg-slate-500'} p-2 rounded-sm rotate-180 cursor-pointer`} onClick={() => changeLayout(CodeLayout.LEFT)}><RiLayout2Line color='white' size={30} /></span>
                            <span className={`${layout === CodeLayout.TOP && 'bg-slate-500'} p-2 rounded-sm -rotate-90 cursor-pointer`} onClick={() => changeLayout(CodeLayout.TOP)}><RiLayout2Line color='white' size={30} /></span>
                            <span className={`${layout === CodeLayout.RIGHT && 'bg-slate-500'} p-2 rounded-sm cursor-pointer`} onClick={() => changeLayout(CodeLayout.RIGHT)}><RiLayout2Line color='white' size={30}/></span>
                        </div>
                    </PopoverContent>
                </Popover>
                <Popover >
                    <PopoverTrigger className={`bg-slate-900 p-2 rounded-sm`}>
                       <FaUser color='white' size={30} />
                    </PopoverTrigger>
                    <PopoverContent className='bg-zinc-950 text-white border-none'>
                        <p className='font-bold mb-4'>My Account</p>
                         <p className='cursor-pointer rounded-sm hover:bg-neutral-900 py-3 px-2' onClick={() => handleSignOut()}>Sign Out</p>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

export default Navbar
