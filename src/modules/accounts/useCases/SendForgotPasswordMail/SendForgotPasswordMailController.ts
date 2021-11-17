import {Request, Response} from "express";
import {container} from "tsyringe";
import {
    SendForgotPasswordMailUseCase
} from "@modules/accounts/useCases/SendForgotPasswordMail/SendForgotPasswordMailUseCase";

export class SendForgotPasswordMailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const useCase = container.resolve(SendForgotPasswordMailUseCase);
        const {email} = request.body;

        await useCase.execute(email);

        return response.status(200).json();
    }
}
