import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from './file-system.datasources';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe("FileSystemDatasource", () => {


    const logPath = path.join(__dirname, "../../../logs")

    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true })
    })

    test("should create log file if they don´t exist", () => {
        new FileSystemDatasource()

        const file = fs.readdirSync(logPath)
        expect(file).toEqual(['logs-high.log', 'logs-low.log', 'logs-medium.log'])
    })

    // test("should save a log in log-all.log", () => {
    //     const logDatasource = new FileSystemDatasource()
    //     const log = new LogEntity({
    //         message: "test",
    //         level: LogSeverityLevel.low,
    //         origin: ""
    //     })

    //     logDatasource.saveLog(log)
    // })



})

