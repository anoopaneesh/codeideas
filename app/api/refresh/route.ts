import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        const decoded = jwt.verify(data.refresh_token, process.env.REFRESH_JWT_SECRET!);
        const access_token = jwt.sign(decoded, process.env.JWT_SECRET!, { expiresIn: '1h' })
        return NextResponse.json({ access_token })
    } catch (error: any) {
        return NextResponse.json({ message: "Invalid or expired refresh token" }, { status: 403 })
    }
}