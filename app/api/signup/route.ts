import { getUser } from "@/helpers/user.helper";
import { connectDB } from "@/lib/connection";
import User from "@/models/User.model";
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const hashedPassword = await bcrypt.hash(data.password,10)
        await connectDB(); 
        const userExists = await getUser({email:data.email})
        console.log(userExists)
        if(userExists){
            return NextResponse.json({message:"User already exists"},{status:409})
        }
        const user = new User({
            username:data.username,
            email:data.email,
            password:hashedPassword
        })
        await user.save()
        return NextResponse.json({ message: "Account created successfully." }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}