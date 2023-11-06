import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'

let mongo: any
beforeAll(async () => {
    process.env.JWT_KEY = 'asdfasdf';

    mongo = await MongoMemoryServer.create()
    const uri = mongo.getUri()

    mongoose.connect(uri, {})
})

beforeEach(async () => {
    const collections = mongoose.connection.collections

    for (const key in collections) {
        const collection = collections[key]
        await collection.deleteMany({})
    }
})

afterAll(async () => {
    await mongo.stop()
    await mongoose.connection.close()
})