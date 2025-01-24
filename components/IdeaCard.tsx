import React from 'react'
import { FaHeart } from 'react-icons/fa'


interface IdeaProp{
    title:string
    likes:number
}

const IdeaCard = (props:IdeaProp) => {
    return (
        <div className='w-[350px] p-2 hover:p-4 bg-[#1e1f26] space-y-4 rounded-sm box-content transition-all cursor-pointer'>
            <div className='h-[200px] w-full bg-gray-100 rounded-e-sm'>

            </div>
            <div className='space-y-2'>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-white">
                    {props.title}
                </h4>
                <div className='flex items-center justify-center gap-2 hover:bg-[#5a5f73] w-10 h-8 rounded-md transition-all'><FaHeart className='text-white inline' /><span className='text-white'>{props.likes}</span></div>
            </div>
        </div>
    )
}

export default IdeaCard
