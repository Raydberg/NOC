import { CronService } from "./cron/cron.service"
import { CheckService } from "../domain/use-cases/checks/check-service"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources"



const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource())


export class ServerApp {

    static start() {
        console.log("Server started...")
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {

        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log("success"),
        //             (error) => console.log(error)
        //         ).execute("http://localhost:3000")
        //     }
        // )
    }

}