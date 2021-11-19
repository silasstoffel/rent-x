import {Request, Response} from "express";
import {container} from "tsyringe";
import {ResetPasswordUseCase} from "@modules/accounts/useCases/ResetPassword/ResetPasswordUseCase";

export class ResetPasswordController {
    async handle(request: Request, response: Response): Promise<Response> {
        const useCase = container.resolve(ResetPasswordUseCase);

        const {token} = request.query;
        const {password} = request.body;

        await useCase.execute(token as string, password);

        return response.status(200);
    }
}
