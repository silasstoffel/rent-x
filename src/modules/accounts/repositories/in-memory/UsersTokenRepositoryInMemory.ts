import {IUsersTokensRepository} from "@modules/accounts/repositories/IUsersTokensRepository";
import {UserTokens} from "@modules/accounts/infra/typeorm/entities/UserTokens";
import {ICreateUserTokenDto} from "@modules/accounts/dtos/ICreateUserTokenDto";

export class UsersTokenRepositoryInMemory implements IUsersTokensRepository {

    private usersToken: UserTokens[] = [];

    async create(data: ICreateUserTokenDto): Promise<UserTokens> {
        const userToken = new UserTokens();
        Object.assign(userToken, data);
        this.usersToken.push(userToken);
        return userToken;
    }

    async delete(id: string): Promise<void> {
        const item = this.usersToken.find(ut => ut.id === id);
        this.usersToken.splice(
            this.usersToken.indexOf(item)
        );
    }

    async findByRefreshToken(token: string): Promise<UserTokens> {
        return this.usersToken.find(
            (user: UserTokens) => user.refresh_token === token
        );
    }

    async findByUserIdAndRefreshToken(userId: string, refreshToken: string): Promise<UserTokens> {
        return this.usersToken.find(
            (user: UserTokens) => user.user_id === userId && user.refresh_token === refreshToken
        );
    }
}
