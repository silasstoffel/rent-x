import {inject, injectable} from "tsyringe";
import {v4 as uuidV4} from "uuid";

import {IUsersRepository} from "@modules/accounts/repositories/IUsersRepository";
import {IUsersTokensRepository} from "@modules/accounts/repositories/IUsersTokensRepository";
import {AppError} from "@shared/errors/AppError";
import {IDateProvider} from "@shared/container/providers/date/IDateProvider";
import {IMailProvider} from "@shared/container/providers/mail/IMailProvider";

@injectable()
export class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokenRepository: IUsersTokensRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,
        @inject('EtherealMailProvider')
        private mailProvider: IMailProvider
    ) {
    }
    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError("Users doesn't exists.");
        }

        const token = uuidV4();

        await this.usersTokenRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date: this.dateProvider.addHours(3)
        });

        const body = `<h1>Password Recovery</h1>`;
        await this.mailProvider.sendMail(
            user.email,
            'Password Recovery',
            body
        );
    }
}
