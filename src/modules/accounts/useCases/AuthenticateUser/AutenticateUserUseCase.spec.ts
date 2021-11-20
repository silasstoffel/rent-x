import {AppError} from "@shared/errors/AppError";
import {ICreateUserDto} from "@modules/accounts/dtos/ICreateUserDto";
import {UsersRepositoryInMemory} from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import {IUsersRepository} from "@modules/accounts/repositories/IUsersRepository";
import {CreateUserUseCase} from "../CreateUser/CreateUserUseCase";
import {AuthenticateUserUseCase} from "./AuthenticateUserUseCase";
import {UsersTokenRepositoryInMemory} from "@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import {DayjsDateProvider} from "@shared/container/providers/date/implementations/DayjsDateProvider";

describe("AuthenticateUserUseCase", () => {
    let autenticateUserUseCase: AuthenticateUserUseCase;
    let createaUserUseCase: CreateUserUseCase;
    let userRepository: IUsersRepository;

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
        const userRepository = new UsersRepositoryInMemory();
        createaUserUseCase = new CreateUserUseCase(
            userRepository
        );
        autenticateUserUseCase = new AuthenticateUserUseCase(
            userRepository,
            new UsersTokenRepositoryInMemory(),
            new DayjsDateProvider()
        );
    });

    it("Should be able to authenticate an user", async () => {
        const user = await createUser();
        const result = await autenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

        it("Should be not able to authenticate an nonexistent user",  () => {
            expect(async () => {
                await autenticateUserUseCase.execute({
                    email: "batman-fake@dc.com",
                    password: "bat-man",
                });
            }).rejects.toBeInstanceOf(AppError);
        });


        it("Should be not able to authenticate with incorrect password", () => {
            expect(async () => {
                const user = await createUser();
                await autenticateUserUseCase.execute({
                    email: user.email,
                    password: `${user.password}-invalid`,
                });
            }).rejects.toBeInstanceOf(AppError);
        });

});
