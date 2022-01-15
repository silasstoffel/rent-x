import {ICarsImagesRepository} from "@modules/cars/repositories/ICarsImagesRepository";
import {CarImage} from "@modules/cars/infra/typeorm/entities/CarImage";
import {Repository, getRepository} from "typeorm";

export class CarsImagesRepository implements ICarsImagesRepository {
    private repository: Repository<CarImage>;

    constructor() {
        this.repository = getRepository(CarImage);
    }

    async create(carId: string, imageName: string): Promise<CarImage> {
        const carImage = this.repository.create({
            car_id: carId,
            image_name: imageName
        });

        return this.repository.save(carImage);
    }
}
