import { LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import { LogRepository } from "../../repositories/log.repository"

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>
}


type SuccessCallback = () => void
type ErrorBallback = (error: string) => void


export class CheckService implements CheckServiceUseCase {
    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorBallback
    ) { }
    async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url)
            if (!req.ok) throw new Error(`Error on check service ${url}`)
            const log = new LogEntity({
                message: `Service ${url} working`,
                level: LogSeverityLevel.low,
                origin: "check-service.ts"
            })
            this.logRepository.saveLog(log)
            this.successCallback()
            return true
        } catch (error) {
            const errorString = `${error}`
            const log = new LogEntity({
                message: errorString,
                level: LogSeverityLevel.high,
                origin: "check-service.ts"
            })
            this.logRepository.saveLog(log)
            this.errorCallback(errorString)
            return false
        }
    }
}