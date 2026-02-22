import { LogDataSource } from "../../domain/datasources/log-datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from 'fs';


export class FileSystemDatasource implements LogDataSource {
    private readonly logPath = "logs/"
    private readonly allLogsPath = "logs/logs-low.log"
    private readonly mediumLogsPath = "logs/logs-medium.log"
    private readonly highLogsPath = "logs/logs-high.log"

    constructor() {
        this.createLogsFile()
    }
    private createLogsFile = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath, { recursive: true })
        }
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach((path) => {
            if (fs.existsSync(path)) return
            fs.writeFileSync(path, "")
        })

    }
    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newLog)}\n`

        fs.appendFileSync(this.allLogsPath, logAsJson)

        switch (newLog.level) {
            case LogSeverityLevel.low: return
            case LogSeverityLevel.medium:
                fs.appendFileSync(this.mediumLogsPath, logAsJson)
            case LogSeverityLevel.high:
                fs.appendFileSync(this.highLogsPath, logAsJson)
            default:
                throw new Error(`Level ${newLog.level} not found`)
        }
    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8')
        if (content === '') return []
        const stringLogs = content.split("\n").map((log) => LogEntity.fromJson(log))
        return stringLogs
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath)
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath)
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
            default:
                throw new Error(`${severityLevel} not implement`)
        }
    }
}