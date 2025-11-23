'use server'

import mongoose from 'mongoose'

let isConnected: boolean = false

export const connectToDB = async (): Promise<void> => {
    mongoose.set('strictQuery', true)

    if(!process.env.MONGODB_URL) throw new Error('Missing Mongodb Url')
    
    if(isConnected) {
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL as string)

        isConnected = true
    } catch(err: any) {
        throw new Error(`Error connecting to Database ${err.message}`)
    }
}
