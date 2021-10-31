import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async findAvailable(name?: string, brand?: string, categoryId?: string): Promise<Car[]> {
        const queryBuilder = await this.repository
        .createQueryBuilder('c')
        .where('available = :available', { available: true });

        if (name)
            queryBuilder.andWhere('name = :name', { name });

        if (brand)
            queryBuilder.andWhere('brand = :brand', { brand });

        if (categoryId)
            queryBuilder.andWhere('category_id = :categoryId', { category_id: categoryId });

        const cars = await queryBuilder.getMany();
        return cars;
    }

    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
        });
        await this.repository.save(car);
        return car;
    }

    async findByLicencePlate(licencePlate: string): Promise<Car> {
        const car = await this.repository.findOne({
            license_plate: licencePlate,
        });

        return car;
    }
}

export { CarsRepository };
