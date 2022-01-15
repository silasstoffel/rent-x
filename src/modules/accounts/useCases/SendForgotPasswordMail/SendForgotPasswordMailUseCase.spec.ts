import {
    SendForgotPasswordMailUseCase
} from "@modules/accounts/useCases/SendForgotPasswordMail/SendForgotPasswordMailUseCase";
import {UsersRepositoryInMemory} from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import {UsersTokenRepositoryInMemory} from "@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import {DayjsDateProvider} from "@shared/container/providers/date/implementations/DayjsDateProvider";
import {MailProviderInMemory} from "@shared/container/providers/mail/in-memory/MailProviderInMemory";
import {IUsersRepository} from "@modules/accounts/repositories/IUsersRepository";
import {IMailProvider} from "@shared/container/providers/mail/IMailProvider";
import {AppError} from "@shared/errors/AppError";
import {IUsersTokensRepository} from "@modules/accounts/repositories/IUsersTokensRepository";

describe('SendForgotPasswordMailUseCase', () => {
    let useCase: SendForgotPasswordMailUseCase;
    let userRepository: IUsersRepository;
    let mailProvider: IMailProvider;
    let usersTokenRepository: IUsersTokensRepository;

    beforeEach(async () => {
        mailProvider = new MailProviderInMemory();
        userRepository = new UsersRepositoryInMemory();
        usersTokenRepository = new UsersTokenRepositoryInMemory();
        await userRepository.create({
            email: 'silasstofel@gmail.com',
            password: '54321',
            name: 'Silas',
            driver_license: 'ABC-123'
        });

        useCase = new SendForgotPasswordMailUseCase(
            userRepository,
            usersTokenRepository,
            new DayjsDateProvider(),
            mailProvider
        );
    })

    it("Should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");
        await useCase.execute('silasstofel@gmail.com');
        expect(sendMail).toHaveBeenCalled();
    });

    it("Should not be able to send a forgot password mail to user if user not exists", async () => {
        await expect(async () => {
            await useCase.execute('non-exists@gmail.com');
        }).rejects.toEqual(
            new AppError("Users doesn't exists.")
        );
    });

    it("Should be able to create an users token", async () => {
        const createToken = jest.spyOn(usersTokenRepository, "create");
        await useCase.execute('silasstofel@gmail.com');
        expect(createToken).toHaveBeenCalled();
    });

});
