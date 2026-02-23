import mongoose from "mongoose"
import { envs } from "../../../config/plugins/envs.plugin"
import { MongoDatabase } from "../init"
import { LogModel } from "./log.model"

describe("log.model.ts", () => {

    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        })
    })

    afterAll(() => {
        mongoose.connection.close()
    })

    test("should returl log.model", async () => {
        const logData = {
            origin: "log.model.test.ts",
            message: "test-message",
            level: "low"
        }
        const log = new LogModel(logData)
        await log.validate()

        const logObject = log.toObject({ virtuals: true })

        expect(logObject).toEqual(expect.objectContaining({
            ...logData,
            createdAt: expect.any(Date),
            id: expect.any(String)
        }))
        await LogModel.findByIdAndDelete(log.id)
    })

    test("should return the schema object", () => {
        const schema = LogModel.schema.obj;
        expect(schema).toEqual(expect.objectContaining(
            {
                message: { type: expect.any(Function), require: true },
                origin: { type: expect.any(Function) },
                level: { type: expect.any(Function), enum: ['low', 'medium', 'high'] },
                createdAt: expect.any(Object)
            }
        ))
    })

})
