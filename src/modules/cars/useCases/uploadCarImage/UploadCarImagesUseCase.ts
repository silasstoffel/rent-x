import { inject, injectable } from "tsyringe";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { IStorageProvider } from "@shared/container/providers/storage/IStorageProvider";

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
export class UploadCarImagesUseCase {
    constructor(
        @inject("CarsImagesRepository")
        private repository: ICarsImagesRepository,
        @inject("StorageProvider")
        private storage: IStorageProvider
    ) {}

    async execute({ car_id, images_name }: IRequest): Promise<void> {
        images_name.map(async (image: string) => {
            await this.repository.create(car_id, image);
            await this.storage.save(image, 'cars');
        });
    }
}
