import {UserTokens} from "@modules/accounts/infra/typeorm/entities/UserTokens";
import {ICreateUserTokenDto} from "@modules/accounts/dtos/ICreateUserTokenDto";

export interface IUsersTokensRepository {
    create(data: ICreateUserTokenDto): Promise<UserTokens>

    findByUserIdAndRefreshToken(userId: string, refreshToken: string): Promise<UserTokens>

    delete(id: string): Promise<void>

    findByRefreshToken(token: string): Promise<UserTokens>
}
