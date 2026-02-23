import mongoose from "mongoose"
import { envs } from "../../config/plugins/envs.plugin"
import { MongoDatabase } from "../../data/mongo/init"
import { MongoLogDatasource } from "./mongo-log.datasource"
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"
import { LogModel } from "../../data/mongo/models/log.model"

describe("Prueba MongoLogDatasource", () => {

    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        })
    })

    afterEach(async () => {
        await LogModel.deleteMany()

    })

    afterAll(() => {
        mongoose.connection.close()
    })

    const logDataSource = new MongoLogDatasource()

    const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: "mongo-datsouce-test",
        origin: "mongo-log-datasource.test",
    })

    test('should create log', async () => {


        const logSpy = jest.spyOn(console, "log")

        const log = new LogEntity({
            level: LogSeverityLevel.high,
            message: "mongo-datsouce-test",
            origin: "mongo-log-datasource.test",
        })

        await logDataSource.saveLog(log)


        expect(logSpy).toHaveBeenCalled()
        expect(logSpy).toHaveBeenCalledWith("Mongo log created:", expect.any(String))

    })

    test("should get one log", async () => {

        await logDataSource.saveLog(log)
        const logs = await logDataSource.getLogs(LogSeverityLevel.high)

        expect(logs.length).toBe(1)
        expect(logs[0]?.level).toBe(LogSeverityLevel.high)
    })

    test("should get logs", async () => {

        await logDataSource.saveLog(log)
        await logDataSource.saveLog(log)
        await logDataSource.saveLog(log)
        await logDataSource.saveLog(log)
        const logs = await logDataSource.getLogs(LogSeverityLevel.high)

        expect(logs.length).toBe(4)
        expect(logs[0]?.level).toBe(LogSeverityLevel.high)
    })

})
