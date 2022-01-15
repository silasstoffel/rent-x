import {Request, Response} from "express";
import {container} from "tsyringe";

import {ListRentalsByUserUseCase} from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserUseCase";

export class ListRentalsByUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const useCase = container.resolve(ListRentalsByUserUseCase);
        const {id} = request.user;
        const result = await useCase.execute(id);

        return response.status(200).json(result);
    }
}
