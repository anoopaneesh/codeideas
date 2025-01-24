import { getUser } from "@/helpers/user.helper";
import { connectDB } from "@/lib/connection";
import User from "@/models/User.model";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const authHeader =  request.headers.get('Authorization')
        const token = authHeader?.split('Bearer ')?.[1]
        if(!token){
            return NextResponse.json({message:"Unauthorized"},{status:401})
        }
        const tokenData = jwt.decode(token)
        const hashedPassword = await bcrypt.hash(data.password,10)
        await connectDB(); 
        const userExists = await getUser({email:data.email})
        if(userExists){
            return NextResponse.json({message:"User already exists"},{status:409})
        }
        const usernameParts = new RegExp('[a-z]+').exec(data.email.toLowerCase())
        const user = new User({
            username:usernameParts?.[0] || "",
            email:data.email,
            password:hashedPassword
        })
        await user.save()
        return NextResponse.json({ message: "Account created successfully." }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}