import { CronService } from "./cron/cron.service"
import { CheckService } from "../domain/use-cases/checks/check-service"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources"
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource"
import { PostgresDatasource } from "../infrastructure/datasources/postgres-log.datasource"



// const logRepository = new LogRepositoryImpl(new FileSystemDatasource())
// const logRepository = new LogRepositoryImpl(new MongoLogDatasource())
const logRepository = new LogRepositoryImpl(new PostgresDatasource())

export class ServerApp {

    static start() {
        console.log("Server started...")
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {

        //         new CheckService(
        //             logRepository,
        //             () => console.log("success"),
        //             (error) => console.log(error)
        //         ).execute("http://localhost:3000")
        //     }
        // )
    }

}