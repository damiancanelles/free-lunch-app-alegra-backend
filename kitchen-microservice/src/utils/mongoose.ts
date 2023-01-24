import { connect, set } from "mongoose";

export async function connectMongoDB() {
    try {
        set('strictQuery', false)
        await connect(process.env.MONGODB_URL || "mongodb+srv://damian:313ctr0Slayer12@cluster0.63ifkbo.mongodb.net/storage-db?retryWrites=true&w=majority")
        console.log('Database connected')
    } catch (error) {
        console.log('Database connection error')
    }
}