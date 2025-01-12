import User from "@/models/User.model"
import mongoose from "mongoose"

type UserWithUserName = {
    username: string
    email?: string
}

type UserWithEmail = {
    username?: string
    email: string
}


export const getUser = async (user: UserWithEmail | UserWithUserName) => {
    const conditions = []
    if(user.username) conditions.push({username:user.username})
    if(user.email) conditions.push({email:user.email})
    const result = await User.findOne({ $or: conditions })
    return result;
}   