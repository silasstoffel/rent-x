import {UserTokens} from "@modules/accounts/infra/typeorm/entities/UserTokens";
import {ICreateUserTokenDto} from "@modules/accounts/dtos/ICreateUserTokenDto";

export interface IUsersTokensRepository {
    create(data: ICreateUserTokenDto): Promise<UserTokens>
}
