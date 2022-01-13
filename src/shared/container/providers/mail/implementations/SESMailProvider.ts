import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import { SES } from "aws-sdk";

import { IMailProvider } from "@shared/container/providers/mail/IMailProvider";

export class SESMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        nodemailer
            .createTestAccount()
            .then((account) => {
                this.client = nodemailer.createTransport({
                    SES: new SES({
                        apiVersion: '2010-12-01',
                        region: process.env.AWS_DEFAULT_REGION,
                    })
                });
            })
            .catch((err) => console.error(err));
    }

    async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string
    ): Promise<void> {
        const template = fs.readFileSync(path).toString("utf-8");
        const tpl = handlebars.compile(template);
        const html = tpl(variables);

        await this.client.sendMail({
            to,
            from: "Rentx <oi@silas-on.space>",
            subject,
            html,
        });
    }
}
