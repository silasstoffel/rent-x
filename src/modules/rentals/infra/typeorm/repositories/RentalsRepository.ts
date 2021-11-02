import {IRentalsRepository} from "@modules/rentals/repositories/IRentalsRepository";
import {ICreateRentalDTO} from "@modules/rentals/dtos/ICreateRentalDTO";
import {Rental} from "@modules/rentals/infra/typeorm/entities/Rental";
import {getRepository, Repository} from "typeorm";

export class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async create({user_id, car_id, expected_return_date}: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({user_id, car_id, expected_return_date});
        return await this.repository.save(rental);
    }

    async findOpenRentalByCar(carId: string): Promise<Rental> {
        return this.repository.findOne({
            car_id: carId
        });
    }

    async findOpenRentalByUser(userId: string): Promise<Rental> {
        return this.repository.findOne({
            user_id: userId
        });
    }

}
