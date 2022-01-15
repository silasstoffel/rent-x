import {Request, Response} from "express";
import {container} from "tsyringe";
import {
    CreateCarSpecificationUseCase
} from "@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationUseCase";

export class CreateCarSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {specifications_id} = request.body;
        const {id} = request.params;

        const useCase = container.resolve(CreateCarSpecificationUseCase);
        const car = await useCase.execute({
            car_id: id,
            specifications_id
        });

        return response.json(car);
    }
}
