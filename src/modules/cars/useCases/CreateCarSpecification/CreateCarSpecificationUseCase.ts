import {ICarsRepository} from "@modules/cars/repositories/ICarsRepository";
import {AppError} from "@shared/errors/AppError";
import {injectable, inject} from "tsyringe";
import {ISpecificationsRepository} from "@modules/cars/repositories/ISpecificationsRepository";
import {Car} from "@modules/cars/infra/typeorm/entities/Car";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
        @inject('SpecificationsRepository')
        private specificationRepository: ISpecificationsRepository
    ) {
    }
    async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
        const car = await this.carsRepository.findById(car_id);
        if (!car) {
            throw new AppError("Car doesn't exists!");
        }

        car.specifications = await this.specificationRepository.findByIds(specifications_id);
        await this.carsRepository.create(car);
        return car;
    }
}
