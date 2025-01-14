import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('Authorization')
        const token = authHeader?.split('Bearer ')?.[1]?.trim();
        if (!token) return NextResponse.json({ message: "Forbidden Resource" }, { status: 403 })
        jwt.verify(token, process.env.JWT_SECRET!)
        return NextResponse.json({ message: "User verified successfully" })
    } catch (error) { 
        return NextResponse.json({ message: "Not Authorized" }, { status: 401 })
    }
}