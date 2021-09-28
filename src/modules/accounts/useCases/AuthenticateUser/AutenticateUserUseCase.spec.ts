import { AppError } from "../../../../Erros/AppError";
import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

describe("AutenticateUserUseCase", () => {
    let autenticateUserUseCase: AuthenticateUserUseCase;
    let createaUserUseCase: CreateUserUseCase;
    let usersRepository: IUsersRepository;

    const createUser = async (
        driver_license: string = null,
        email: string = null,
        name: string = null,
        password: string = null
    ) => {
        const data: ICreateUserDto = {
            driver_license: driver_license ? driver_license : "001122",
            email: email ? email : "batman@dc.com",
            name: name ? name : "Batman",
            password: password ? password : "1234",
        };
        await createaUserUseCase.execute(data);
        return data;
    };

    beforeEach(() => {
        usersRepository = new UsersRepositoryInMemory();
        createaUserUseCase = new CreateUserUseCase(usersRepository);
        autenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    });

    it("Should be able to authenticate an user", async () => {
        const user = await createUser();
        const result = await autenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("Should be not able to authenticate an nonexistent user", () => {
        expect(async () => {
            await autenticateUserUseCase.execute({
                email: "batman-fake@dc.com",
                password: "bat-man",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be not able to authenticate with incorret password", () => {
        expect(async () => {
            const user = await createUser();
            await autenticateUserUseCase.execute({
                email: user.email,
                password: `${user.password}-invalid`,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
