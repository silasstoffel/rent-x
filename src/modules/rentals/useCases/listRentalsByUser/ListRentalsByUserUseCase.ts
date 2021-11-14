import {inject, injectable} from "tsyringe";
import {IRentalsRepository} from "@modules/rentals/repositories/IRentalsRepository";
import {Rental} from "@modules/rentals/infra/typeorm/entities/Rental";

@injectable()
export class ListRentalsByUserUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalRepository: IRentalsRepository
    ) {
    }
    async execute(userId: string): Promise<Rental[]> {
        return await this.rentalRepository.findByUser(userId);
    }
}
