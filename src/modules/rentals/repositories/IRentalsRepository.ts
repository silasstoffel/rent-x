import {Rental} from "@modules/rentals/infra/typeorm/entities/Rental";
import {ICreateRentalDTO} from "@modules/rentals/dtos/ICreateRentalDTO";

export interface IRentalsRepository {
    findOpenRentalByCar(carId: string): Promise<Rental>;

    findOpenRentalByUser(userId: string): Promise<Rental>;

    create({user_id, car_id, expected_return_date}: ICreateRentalDTO): Promise<Rental>;

    findById(id: string): Promise<Rental>;
}
