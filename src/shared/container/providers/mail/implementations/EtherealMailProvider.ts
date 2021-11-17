import {IMailProvider} from "@shared/container/providers/mail/IMailProvider";
import nodemailer, {Transporter} from 'nodemailer';

export class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(account => {
            this.client =  nodemailer.createTransport({
               host: account.smtp.host,
               port: account.smtp.port,
               secure: account.smtp.secure,
               auth: {
                   user: account.user,
                   pass: account.pass
               }
           });
        }).catch(err => console.error(err));
    }

    async sendMail(to: string, subject: string, body: string): Promise<void> {
        const info = await this.client.sendMail({
            to,
            from: "Rentx <noreplay@rentx.com.br>",
            subject,
            text: body,
            html: body
        });

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

}
