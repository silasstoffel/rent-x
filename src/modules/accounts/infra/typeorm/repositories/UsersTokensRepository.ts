import {IUsersTokensRepository} from "@modules/accounts/repositories/IUsersTokensRepository";
import {UserTokens} from "@modules/accounts/infra/typeorm/entities/UserTokens";
import {injectable} from "tsyringe";
import {getRepository, Repository} from "typeorm";
import {ICreateUserTokenDto} from "@modules/accounts/dtos/ICreateUserTokenDto";

@injectable()
export class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserTokens>

    constructor() {
        this.repository = getRepository(UserTokens);
    }

    async create(data: ICreateUserTokenDto): Promise<UserTokens> {
        const userToken = this.repository.create(data);
        return await this.repository.save(userToken);
    }

    async findByUserIdAndRefreshToken(userId: string, refreshToken: string): Promise<UserTokens> {
        return await this.repository.findOne({
            user_id: userId,
            refresh_token: refreshToken
        });
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete({id});
    }

    async findByRefreshToken(token: string): Promise<UserTokens> {
        return await this.repository.findOne({
            refresh_token: token
        });
    }
}
