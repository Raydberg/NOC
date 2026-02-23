import mongoose from "mongoose"
import { MongoDatabase } from "./init"

describe("Init MongoDb", () => {

    afterAll(() => {
        mongoose.connection.close()
    })

    test("should connec mongo db", async () => {
        const connected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        })

        expect(connected).toBeTruthy()
    })


    test("Should throw an error", async () => {

        try {
            const connected = await MongoDatabase.connect({
                dbName: process.env.MONGO_DB_NAME!,
                mongoUrl: 'test'
            })
            expect(true).toBe(false)
        } catch (error) {

        }


    })

})