import { MongoDatabase } from "./data/mongo/init"
import { envs } from "./config/plugins/envs.plugin"
import { LogModel } from "./data/mongo/models/log.model"
import { ServerApp } from "./presentation/server"
import { prisma } from "./config/lib/prisma"


(async () => {
    main()
})()

async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })
    ServerApp.start()

}