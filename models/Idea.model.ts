import mongoose, { models } from "mongoose";

const IdeaSchema = new mongoose.Schema({
    user: String,
    html: String,
    js: String,
    css:String,
    likes:String,
    title:String,
}, { timestamps: true })


const Idea = models.Idea || mongoose.model('Idea',IdeaSchema)


export default Idea