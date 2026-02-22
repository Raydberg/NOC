import { loadEnvFile } from "node:process"
import { ServerApp } from "./presentation/server"

(() => {
    main()
})()

function main() {
    ServerApp.start()
    // loadEnvFile()
    // console.log(process.env.MAILER_EMAIL)
}