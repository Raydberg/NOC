import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"
import { LogRepositoryImpl } from "./log.repository.impl"

describe("Log Repository Implement Test", () => {


    const mockLogDataSource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const log = {
        level: LogSeverityLevel.low,
        message: "Test log repository impl",
        origin: "log.repository.impl.test.ts"
    } as LogEntity

    const mockLogRepositoryImpl = new LogRepositoryImpl(mockLogDataSource)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("should test for when saveLog called", async () => {

        await mockLogRepositoryImpl.saveLog(log)

        expect(mockLogRepositoryImpl.saveLog).toHaveBeenCalledWith(log)
        expect(mockLogRepositoryImpl.saveLog).toHaveBeenCalledTimes(1)

    })
    test("should test for when getLogs called", async () => {

        await mockLogRepositoryImpl.getLogs(LogSeverityLevel.low)

        expect(mockLogRepositoryImpl.getLogs).toHaveBeenCalledWith(log.level)
        expect(mockLogRepositoryImpl.getLogs).toHaveBeenCalledTimes(1)

    })
})