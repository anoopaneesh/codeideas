"use client"
import React, { useState } from 'react'
import { RiLayout2Line } from "react-icons/ri";
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CodeLayout } from '@/common/types';
import { useRouter } from 'next/navigation';
import { MdModeEdit } from "react-icons/md";
import { IoMdCloud } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from './ui/input';

interface NavbarProps {
    layout: CodeLayout,
    handleLayoutChange: (layout: CodeLayout) => void
}

const layoutIconClass = {
    [CodeLayout.LEFT]: 'rotate-180',
    [CodeLayout.TOP]: '-rotate-90',
    [CodeLayout.RIGHT]: 'rotate-0'
}

const Navbar: React.FC<NavbarProps> = ({ layout, handleLayoutChange }) => {
    const [popoverOpen, setPopoverOpen] = useState(false)
    const [nameValue, setNameValue] = useState("Untitled")
    const [nameEdit, setNameEdit] = useState(false)
    const router = useRouter()
    const changeLayout = (newLayout: CodeLayout) => {
        handleLayoutChange(newLayout)
        setPopoverOpen(false)
    }
    const handleNameEdit = () => {
        setNameEdit(true)
    }
    const handleSignOut = () => {
        localStorage.removeItem(process.env.NEXT_PUBLIC_ST_ID + 'access_token')
        router.push('/login')
    }
    return (
        <div className='w-full h-20 bg-black flex justify-between items-center px-32'>
            <div>
                <div className='flex items-center gap-2'>
                    {nameEdit ? <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-white">
                        <Input type="text" className='bg-[#252830] text-2xl font-semibold outline-none border-none text-white w-60 focus:bg-[#444857]' value={nameValue} onChange={(event: any) => {

                            setNameValue(event.target.value)
                        }} onBlur={() => {
                            setNameEdit(false)
                        }} />
                    </h3> : <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-white">
                        {nameValue}
                    </h3>}
                    {!nameEdit && <MdModeEdit className='text-white cursor-pointer' onClick={handleNameEdit} />}
                </div>
            </div>
            <div className='cursor-pointer space-x-6 flex items-center'>
                <div className='bg-[#252830] hover:bg-[#717790] p-2 rounded-sm flex items-end gap-2'><IoMdCloud color="white" size={26} /><p className='text-white font-semibold select-none'>Save</p></div>
                <Popover open={popoverOpen} >
                    <PopoverTrigger onClick={() => setPopoverOpen((oldValue) => !oldValue)} className={`bg-[#252830] hover:bg-[#717790] p-2 rounded-sm ${layoutIconClass[layout]} `}>
                        <RiLayout2Line color='white' size={30} />
                    </PopoverTrigger>
                    <PopoverContent className='bg-[#252830] text-white border-none w-[180px]  transition-all mt-2 py-2 rounded-sm'>
                        <p className='font-semibold px-2 py-1 mb-4'>Change View</p>
                        <div className='flex gap-2 w-[120px] justify-between'>
                            <span className={` ${layout === CodeLayout.LEFT && 'bg-slate-500'} p-2 rounded-sm rotate-180 cursor-pointer`} onClick={() => changeLayout(CodeLayout.LEFT)}><RiLayout2Line color='white' size={30} /></span>
                            <span className={`${layout === CodeLayout.TOP && 'bg-slate-500'} p-2 rounded-sm -rotate-90 cursor-pointer`} onClick={() => changeLayout(CodeLayout.TOP)}><RiLayout2Line color='white' size={30} /></span>
                            <span className={`${layout === CodeLayout.RIGHT && 'bg-slate-500'} p-2 rounded-sm cursor-pointer`} onClick={() => changeLayout(CodeLayout.RIGHT)}><RiLayout2Line color='white' size={30} /></span>
                        </div>
                    </PopoverContent>
                </Popover>
                <Popover >
                    <PopoverTrigger>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className='bg-[#252830] text-white border-none w-[180px]  transition-all mt-2 py-2 rounded-sm'>
                        <p className='font-semibold px-2 py-1 hover:bg-[#717790] cursor-pointer'>My Ideas</p>
                        <p className='font-semibold px-2 py-1 hover:bg-[#717790] cursor-pointer' onClick={() => handleSignOut()}>Log Out</p>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

export default Navbar
