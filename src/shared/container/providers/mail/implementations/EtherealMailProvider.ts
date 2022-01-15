import {IMailProvider} from "@shared/container/providers/mail/IMailProvider";
import nodemailer, {Transporter} from 'nodemailer';
import handlebars from 'handlebars';
import  fs from 'fs';

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

    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
        const template = fs.readFileSync(path).toString('utf-8');
        const tpl = handlebars.compile(template);
        const html = tpl(variables);

        const info = await this.client.sendMail({
            to,
            from: "Rentx <noreplay@rentx.com.br>",
            subject,
            html
        });

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

}
