import { EmailService } from "../../../presentation/email/email.service"
import { LogEntity } from "../../entities/log.entity"
import { LogRepository } from "../../repositories/log.repository"
import { SendLogEmail } from "./send-email-logs"

describe('SendEmailService UseCase', () => {


    const mockLogRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }



    const checkEmailService = new SendLogEmail(
        mockEmailService as any,
        mockLogRepository
    )

    beforeEach(() => {
        jest.clearAllMocks()
    })


    test('should call success callback when send Email Logs', async () => {


        const wasOk = await checkEmailService.execute("ray@gmail.com")
        expect(wasOk).toBeTruthy()
        //Se comprueba que se haya llamado una vez
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })

    test('should call error callback when send Email Logs', async () => {
        //Forzamos a que devuelva un falso
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false)
        const result = await checkEmailService.execute("dddd@gmail")


        expect(result).toBe(false)
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )

    })

})