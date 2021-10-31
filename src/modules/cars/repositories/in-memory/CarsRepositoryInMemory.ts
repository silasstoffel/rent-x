import {ICreateCarDTO} from "@modules/cars/dtos/ICreateCarDTO";
import {Car} from "@modules/cars/infra/typeorm/entities/Car";
import {ICarsRepository} from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    private cars: Car[] = [];

    async create(data: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        Object.assign(car, data);
        this.cars.push(car);
        return car;
    }

    async findByLicencePlate(licencePlate: string): Promise<Car> {
        return this.cars.find((c) => c.license_plate === licencePlate);
    }

    async findAvailable(name?: string, brand?: string, categoryId?: string): Promise<Car[]> {
        return this.cars.filter((car: Car) => {
            if (
                car.available
                || (
                    (brand && car.brand === brand)
                    || (categoryId && car.category_id === categoryId)
                    || (name && car.name === name)
                )
            ) {
                return car;
            }
            return null
        });
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find((c) => c.id === id);
    }
}

export {CarsRepositoryInMemory};
