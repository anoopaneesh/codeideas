import mongoose from 'mongoose'

type State = {
    db: typeof mongoose | null;
}

const state: State = {
    db: null
}
export async function connectDB() {
    try {
        if (!state.db) {
            state.db = await mongoose.connect(process.env.MONGODB_URL || "", { dbName: "codeideas" })
        }
        return state.db
    } catch (error) {
        console.log(`Error occured connecting to DB`)
    }
}