import { envs } from "./envs.plugin"

describe("envs.plugin.ts", () => {

    test("should return env options", async () => {
        console.log(envs)
        expect(envs).toEqual(
            {
                PORT: 3000,
                MAILER_SERVICE: 'raydbergg@gmail',
                MAILER_MAIL: 'raysberg@gmail.com',
                MAILER_SECRET: '31231d3e23e323e',
                PROD: false,
                MONGO_URL: 'mongodb://ray:2005@localhost:27017',
                MONGO_DB_NAME: 'NOC',
                MONGO_USER: 'ray',
                MONGO_PASS: '2005',
                POSTGRES_URL: 'postgresql://ray:2005@localhost:5432/noc_db',
                POSTGRES_USER: 'ray',
                POSTGRES_PASSWORD: '2005',
                POSTGRES_DB: 'noc_db'
            }
        )
    })

    test("should retirn error if not fould env", async () => {

        jest.resetModules() //Asegura que no hacemos modificaciones a configuracione santeriores
        process.env.PORT = "ABC"
        try {
            await import("./envs.plugin") //Sirve para volver a cargar el archivo
            expect(true).toBe(false)
        } catch (error) {
            // console.log(error)
            expect(`${error}`).toContain('"PORT" should be a valid integer')
        }

    })
})

