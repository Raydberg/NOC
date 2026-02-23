import { LogEntity, LogSeverityLevel } from "./log.entity"

describe("LogEntity", () => {

    const dataObj = {
        message: "Log test",
        level: LogSeverityLevel.high,
        origin: "log.entity.test.ts"
    }

    test("should create a LogEntity instance", () => {
        const log = new LogEntity({
            message: "Log test",
            level: LogSeverityLevel.high,
            origin: "log.entity.test.ts"
        })

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe(dataObj.message)
        expect(log.level).toBe(dataObj.level)
        expect(log.origin).toBe(dataObj.origin)
        expect(log.createdAt).toBeInstanceOf(Date)
    })

    test("sould create log entity instand from json", () => {
        const json = `
        {
            "message": "Test create data with prisma",
            "origin": "app.ts",
            "level": "low",
            "createdAt": "2026-02-22 06:38:04.268"
        }
    `

        const log = LogEntity.fromJson(json)
        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe("Test create data with prisma")
        expect(log.origin).toBe("app.ts")
        expect(log.level).toBe(LogSeverityLevel.low)
        expect(log.createdAt).toBeInstanceOf(Date)
    })

    test("should create a LogEntity instance from object", () => {
        const log = LogEntity.fromObject(dataObj)
        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe(dataObj.message)
        expect(log.level).toBe(dataObj.level)
        expect(log.origin).toBe(dataObj.origin)
        expect(log.createdAt).toBeInstanceOf(Date)
    })

})