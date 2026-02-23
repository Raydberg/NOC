import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDataSource } from "./log-datasources";

describe("log-datasource.ts", () => {

    const newLog = new LogEntity({
        origin: "log-datasource.test.ts",
        message: "test-message",
        level: LogSeverityLevel.high
    })

    //Lo que en verdad importa es que implemente la interfaz de LogDataSource
    class MockLogDatasource implements LogDataSource {
        /**
         * No importa mucho la implementacion que tenga 
         * nuestors metodos , lo que importa es que se implementen
         */
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog]
        }

    }

    test("should test the abstract class", async () => {
        const mockLogDatasource = new MockLogDatasource()

        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource)
        expect(mockLogDatasource).toHaveProperty("saveLog")
        expect(mockLogDatasource).toHaveProperty("getLogs")
        //Probamos que sean funciones y sean definidas
        expect(typeof mockLogDatasource.getLogs).toBe("function")
        expect(typeof mockLogDatasource.saveLog).toBe("function")

        await mockLogDatasource.saveLog(newLog)
        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high)
        console.log(logs[0])
        expect(logs).toHaveLength(1)
        expect(logs[0]).toBeInstanceOf(LogEntity)

    })
})