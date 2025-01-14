import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
export async function GET(request: NextRequest) {
    try { 
        const refresh_token = request.cookies.get('refresh_token')?.value
        if(!refresh_token) throw new Error('No refresh token provided')
        const decoded = jwt.verify(refresh_token, process.env.REFRESH_JWT_SECRET!);
        const access_token = jwt.sign(decoded, process.env.JWT_SECRET!, { expiresIn: '1h' })
        return NextResponse.json({ access_token })
    } catch (error: any) {
        return NextResponse.json({ message: "Invalid or expired refresh token" }, { status: 403 })
    }
}