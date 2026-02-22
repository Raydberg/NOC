import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'

interface SendMailOptions {
    to: string | string[],
    subject: string,
    htmlBody: string,
    attachments?: Attachement[]
}

interface Attachement {
    filename: string,
    path: string
}



export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_MAIL,
            pass: envs.MAILER_SECRET
        }
    })

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options
        try {
            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            })

            return true
        } catch (error) {


            return false
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = "Logs del servidor"
        const htmlBody = `
        <h1>Hola</h1>
        `
        const attachments: Attachement[] = [
            { filename: "logs-all.log", path: "./logs/logs-all.log" },
            { filename: "logs-all.log", path: "./logs/logs-mediun.log" },
            { filename: "logs-all.log", path: "./logs/logs-high.log" }
        ]

        return this.sendEmail({
            to, subject, htmlBody, attachments
        })

    }



}