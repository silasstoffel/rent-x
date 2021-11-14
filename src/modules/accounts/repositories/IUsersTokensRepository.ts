import {ICreateUserDto} from "@modules/accounts/dtos/ICreateUserDto";
import {UserTokens} from "@modules/accounts/infra/typeorm/entities/UserTokens";

export interface IUsersTokensRepository {
    create(data: ICreateUserDto): Promise<UserTokens>
}
