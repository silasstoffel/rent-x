import {inject, injectable} from "tsyringe";
import {IRentalsRepository} from "@modules/rentals/repositories/IRentalsRepository";
import {ICarsRepository} from "@modules/cars/repositories/ICarsRepository";
import {AppError} from "@shared/errors/AppError";
import {IDateProvider} from "@shared/container/providers/date/IDateProvider";
import {Rental} from "@modules/rentals/infra/typeorm/entities/Rental";
import {ICreateRentalDTO} from "@modules/rentals/dtos/ICreateRentalDTO";

interface IRequest {
    id: string,
    user_id: string
}

@injectable()
export class DevolutionRentalUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,
    ) {
    }

    async execute({id, user_id}: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id);
        if (!rental) {
            throw new AppError("Rental doesn't exists!");
        }

        const car = await this.carsRepository.findById(rental.car_id);

        let daily = this.dateProvider.compareInDays(
            rental.start_date, this.dateProvider.now()
        );

        if (daily <= 0) {
            daily = 1;
        }

        const delay = this.dateProvider.compareInDays(
            this.dateProvider.now(), rental.expected_return_date
        );

        let total = 0;
        if (delay > 0 && car.fine_amount) {
            total = delay * car.fine_amount
        }
        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.now();
        rental.total = total;

        await this.rentalsRepository.create(rental as ICreateRentalDTO);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental;
    }
}
