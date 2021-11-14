import {Request, Response} from "express";
import {container} from "tsyringe";
import {DevolutionRentalUseCase} from "@modules/rentals/useCases/devolutionRental/DevolutionRentalUseCase";

export class DevolutionRentalController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const {id: user_id} = request.params;

        const useCase = container.resolve(DevolutionRentalUseCase);
        const rental = await useCase.execute({id, user_id});

        return response.status(200).json(rental);
    }

}
