import {IRentalsRepository} from "@modules/rentals/repositories/IRentalsRepository";
import {Rental} from "@modules/rentals/infra/typeorm/entities/Rental";
import {ICreateRentalDTO} from "@modules/rentals/dtos/ICreateRentalDTO";

export class RentalsRepositoryInMemory implements IRentalsRepository{
    private rentals: Rental[] = [];

    async findOpenRentalByCar(carId: string): Promise<Rental> {
        return this.rentals.find(
            (item:Rental) => item.car_id === carId && !item.end_date
        );
    }

    async findOpenRentalByUser(userId: string): Promise<Rental> {
        return this.rentals.find(
            (item:Rental) => item.user_id === userId && !item.end_date
        );
    }

    async create({user_id, car_id, expected_return_date}: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();
        Object.assign(rental, {
            user_id,
            car_id,
            expected_return_date,
            start_date: new Date(),
            created_at: new Date(),
            updated_at: new Date(),
        });
        this.rentals.push(rental);
        return rental;
    }
}
