import {IUsersTokensRepository} from "@modules/accounts/repositories/IUsersTokensRepository";
import {ICreateUserDto} from "@modules/accounts/dtos/ICreateUserDto";
import {UserTokens} from "@modules/accounts/infra/typeorm/entities/UserTokens";
import {injectable} from "tsyringe";
import {getRepository, Repository} from "typeorm";

@injectable()
export class UsersTokensRepository implements  IUsersTokensRepository{
    private repository: Repository<UserTokens>

    constructor() {
        this.repository = getRepository(UserTokens);
    }

    async create(data: ICreateUserDto): Promise<UserTokens> {
        const userToken = this.repository.create(data);
        return await this.repository.save(userToken);
    }

}
