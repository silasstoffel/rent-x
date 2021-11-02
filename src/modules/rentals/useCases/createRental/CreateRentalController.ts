import {Request, Response} from "express";
import {container} from "tsyringe";
import {CreateRentalUseCase} from "@modules/rentals/useCases/createRental/CreateRentalUseCase";

export class CreateRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const useCase = container.resolve(CreateRentalUseCase);
        const {expected_return_date, car_id} = request.body;
        const {id} = request.user;

        const rental = await useCase.execute({
            user_id: id,
            car_id,
            expected_return_date
        });

        return response.status(201).json(rental);
    }
}
