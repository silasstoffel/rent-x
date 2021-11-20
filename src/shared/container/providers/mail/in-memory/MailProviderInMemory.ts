import {IMailProvider} from "@shared/container/providers/mail/IMailProvider";

export class MailProviderInMemory implements IMailProvider {
    sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
        return;
    }
}
