import { getUser } from "@/helpers/user.helper";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserModel } from "@/common/types";
export async function POST(request:NextRequest){
    try{
        const data = await request.json()
        const userExist : UserModel = await getUser({username:data.username,email:data.username})
        console.log(userExist)
        if(!userExist){
            return NextResponse.json({message:"User does not exist."},{status:404})
        }
        //check password match
       const passwordCheck = await bcryptjs.compare(data.password,userExist.password)

        const access_token = jwt.sign({id:userExist._id.toString(),email:userExist.email,username:userExist.username},process.env.JWT_SECRET||"secret",{
            expiresIn:"1h"
        })
        const refresh_token = jwt.sign({id:userExist._id.toString(),email:userExist.email,username:userExist.username},process.env.REFRESH_JWT_SECRET||"refresh-secret",{expiresIn:'2 days'})

       if(!passwordCheck) return NextResponse.json({message:"Username or password is invalid"},{status:404})
       return NextResponse.json({access_token,refresh_token})
    }catch(error){
         return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
} 