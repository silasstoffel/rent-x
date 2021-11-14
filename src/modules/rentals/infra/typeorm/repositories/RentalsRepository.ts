import {IRentalsRepository} from "@modules/rentals/repositories/IRentalsRepository";
import {ICreateRentalDTO} from "@modules/rentals/dtos/ICreateRentalDTO";
import {Rental} from "@modules/rentals/infra/typeorm/entities/Rental";
import {getRepository, Repository} from "typeorm";

export class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async create({user_id, car_id, expected_return_date, id, end_date, total}: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({user_id, car_id, expected_return_date, id, end_date, total});
        return await this.repository.save(rental);
    }

    async findOpenRentalByCar(carId: string): Promise<Rental> {
        return await this.repository.findOne({
            where: {
                car_id: carId,
                end_date: null
            }
        });
    }

    async findOpenRentalByUser(userId: string): Promise<Rental> {
        return await this.repository.findOne({
            where: {
                user_id: userId,
                end_date: null
            }
        });
    }

    async findById(id: string): Promise<Rental> {
        return this.repository.findOne({id});
    }

}
