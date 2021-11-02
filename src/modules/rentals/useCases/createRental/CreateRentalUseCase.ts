import {inject, injectable} from "tsyringe";

import {AppError} from "@shared/errors/AppError";
import {IRentalsRepository} from "../../repositories/IRentalsRepository";
import {Rental} from "@modules/rentals/infra/typeorm/entities/Rental";
import {IDateProvider} from "@shared/container/providers/date/IDateProvider";
import {DayjsDateProvider} from "@shared/container/providers/date/implementations/DayjsDateProvider";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
export class CreateRentalUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider
    ) {
    }

    async execute({user_id, car_id, expected_return_date}: IRequest): Promise<Rental> {
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);
        if (carUnavailable) {
            throw new AppError('Car is unavailable!');
        }
        const rentalOpen4User = await this.rentalsRepository.findOpenRentalByUser(user_id);
        if (rentalOpen4User) {
            throw new AppError("There's a rental in progress for user!");
        }

        const compare = this.dateProvider.compareInHours(
            this.dateProvider.now(),
            expected_return_date,
        );

        if (compare < 24) {
            throw new AppError("Invalid return time!");
        }

        return await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        });
    }
}
