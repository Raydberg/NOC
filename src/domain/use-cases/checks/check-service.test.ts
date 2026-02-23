import { LogEntity } from "../../entities/log.entity"
import { CheckService } from "./check-service"

describe("ChechService UseCase", () => {

    const mockLogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const successCallback = jest.fn()
    const errorCallback = jest.fn()

    const checkService = new CheckService(
        mockLogRepository,
        successCallback,
        errorCallback
    )

    beforeEach(() => {
        jest.clearAllMocks()
    })


    test("should call success Callback when fetch return true ", async () => {


        const wasOk = await checkService.execute("https://google.com")

        expect(wasOk).toBeTruthy()

        //Comprueba que fue llamado
        expect(successCallback).toHaveBeenCalled()
        //Comprueba que no sea llamado
        expect(errorCallback).not.toHaveBeenCalled()

        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })
    test("should call success Callback when fetch return false ", async () => {


        const wasOk = await checkService.execute("https://googlke.com")

        expect(wasOk).toBe(false)

        //Comprueba que fue llamado
        expect(successCallback).not.toHaveBeenCalled()
        //Comprueba que no sea llamado
        expect(errorCallback).toHaveBeenCalled()

        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })
})