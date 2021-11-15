import {inject, injectable} from "tsyringe";
import {IUsersTokensRepository} from "@modules/accounts/repositories/IUsersTokensRepository";
import {sign, verify} from "jsonwebtoken";

import Auth from "@config/auth";
import {AppError} from "@shared/errors/AppError";
import {IDateProvider} from "@shared/container/providers/date/IDateProvider";

interface IPayload {
    sub: string,
    email: string
}

@injectable()
export class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokenRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ) {
    }

    async execute(token: string): Promise<string> {
        const decode = verify(token, Auth.refresh_token_secret) as IPayload;
        const userId = decode.sub;
        const refreshToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(userId, token);

        if (!refreshToken) {
            throw new AppError("Refresh token doesn't exists!");
        }

        await this.usersTokenRepository.delete(refreshToken.id);

        const newRefreshToken = sign({email: decode.email}, Auth.refresh_token_secret, {
            subject: userId,
            expiresIn: Auth.refresh_token_expires
        });

        await this.usersTokenRepository.create({
            refresh_token: newRefreshToken,
            user_id: decode.sub,
            expires_date: this.dateProvider.addDays(Auth.refresh_token_expires_days)
        });

        return newRefreshToken;
    }
}
