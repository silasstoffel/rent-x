import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
    private users: User[] = [];

    async create(data: ICreateUserDto): Promise<void> {
        const user = new User();
        Object.assign(user, data);
        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find((user: User) => user.email === email);
        return Promise.resolve(user);
    }

    async findById(id: string): Promise<User> {
        const user = this.users.find((user: User) => user.id === id);
        return Promise.resolve(user);
    }
}

export { UsersRepositoryInMemory };