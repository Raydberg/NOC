import { SeverityLevel } from "../../config/lib/generated/enums";
import { prisma } from "../../config/lib/prisma";
import { LogDataSource } from "../../domain/datasources/log-datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgresDatasource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {

        const level = severityEnum[log.level]

        prisma.logModel.create({
            data: {
                ...log,
                level
            }
        });

    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel]

        const logs = await prisma.logModel.findMany({
            where: { level }
        })
        return logs.map(LogEntity.fromObject)
    }
}