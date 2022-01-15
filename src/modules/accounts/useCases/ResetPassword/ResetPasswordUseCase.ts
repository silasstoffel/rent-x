import {inject, injectable} from "tsyringe";
import {hash} from "bcrypt"

import {IUsersTokensRepository} from "@modules/accounts/repositories/IUsersTokensRepository";
import {AppError} from "@shared/errors/AppError";
import {IDateProvider} from "@shared/container/providers/date/IDateProvider";
import {IUsersRepository} from "@modules/accounts/repositories/IUsersRepository";


@injectable()
export class ResetPasswordUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokenRepository: IUsersTokensRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ) {
    }

    async execute(token: string, password: string): Promise<void> {
        const userToken = await this.usersTokenRepository.findByRefreshToken(token);
        if (!userToken) {
            throw new AppError('Invalid token');
        }

        if (this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.now())) {
            throw new AppError('Token expired!');
        }

        const user = await this.usersRepository.findById(userToken.user_id);
        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.usersTokenRepository.delete(userToken.id);
    }
}
