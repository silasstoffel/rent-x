import {inject, injectable} from "tsyringe";
import {compare} from "bcrypt";
import {sign} from "jsonwebtoken";

import {IUsersRepository} from "@modules/accounts/repositories/IUsersRepository";
import {AppError} from "@shared/errors/AppError";
import tokenConfig from '@config/auth';
import {IUsersTokensRepository} from "@modules/accounts/repositories/IUsersTokensRepository";
import {IDateProvider} from "@shared/container/providers/date/IDateProvider";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        email: string;
        name: string;
    };
    token: string;
    refresh_token: string
}

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokenRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ) {
    }

    async execute({email, password}: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("E-mail or password invalid.");
        }

        const validPassword = await compare(password, user.password);
        if (!validPassword) {
            throw new AppError("E-mail or password invalid.");
        }

        const config = {
            subject: user.id,
            expiresIn: tokenConfig.token_expires,
        };

        const payload = {
            email: user.email,
            name: user.name,
        };

        const token = sign(payload, tokenConfig.token_secret, config);
        const refreshToken = sign({email}, tokenConfig.refresh_token_secret, {
            subject: user.id,
            expiresIn: tokenConfig.refresh_token_expires
        });

        await this.usersTokenRepository.create({
            user_id: user.id,
            refresh_token: refreshToken,
            expires_date: this.dateProvider.addDays(tokenConfig.refresh_token_expires_days)
        });

        return {
            token,
            refresh_token: refreshToken,
            user: {
                name: user.name,
                email: user.email,
            },
        };
    }
}
