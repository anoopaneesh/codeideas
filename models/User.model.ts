import mongoose, { models } from "mongoose";

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
}, { timestamps: true })


const User = models.User || mongoose.model('User',UserSchema)


export default User