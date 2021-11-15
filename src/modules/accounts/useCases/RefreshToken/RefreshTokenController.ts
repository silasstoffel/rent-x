import {Request, Response} from "express";
import {container} from "tsyringe";
import {RefreshTokenUseCase} from "@modules/accounts/useCases/RefreshToken/RefreshTokenUseCase";

export class RefreshTokenController {
    async handle(request: Request, response: Response): Promise<Response> {

        const token = (request.body.token || request.headers['x-access-token'] || request.query.token) as string;

        const useCase = container.resolve(RefreshTokenUseCase);
        const refreshToken = await useCase.execute(token);

        return response.status(200).json(refreshToken);
    }
}
