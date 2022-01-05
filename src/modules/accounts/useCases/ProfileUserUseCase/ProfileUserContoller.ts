import { Response, Response } from "express";
import { container } from "tsyringe";

import { ProfileUserUseCase } from "./ProfileUserUseCase";

export class ProfileUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const useCase = container.resolve(ProfileUserUseCase);
        const { id } = request.user;
        const user = await useCase.execute(id);

        return response.json(user);
    }
}
