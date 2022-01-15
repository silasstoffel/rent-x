import {ICarsRepository} from "@modules/cars/repositories/ICarsRepository";
import {CarsRepositoryInMemory} from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import {AppError} from "@shared/errors/AppError";
import {CreateCarSpecificationUseCase} from "./CreateCarSpecificationUseCase";
import {ISpecificationsRepository} from "@modules/cars/repositories/ISpecificationsRepository";
import {SpecificationsRepositoryInMemory} from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";

let useCase: CreateCarSpecificationUseCase;
let carRepository: ICarsRepository;
let specificationRepository: ISpecificationsRepository;

describe("CreateCarSpecificationUseCase", () => {
    beforeEach(() => {
        carRepository = new CarsRepositoryInMemory();
        specificationRepository = new SpecificationsRepositoryInMemory();
        useCase = new CreateCarSpecificationUseCase(carRepository, specificationRepository);
    });

    it("should not be able to add a new specification to a non-existent car", async () => {
        await expect(async () => {
            await useCase.execute({
                car_id: "102030",
                specifications_id: ["1", "1"],
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to add a new specification to the car", async () => {
        const car = await carRepository.create({
            name: "Argo Drive",
            description: "Motor 1.3 - Manual",
            daily_rate: 85.9,
            brand: "Fiat",
            category_id: "",
            license_plate: "PPW-9999",
            fine_amount: 60
        });

        const specification1 = await specificationRepository.create({
            description: "Description-E1",
            name: "E1"
        });

        const specification2 = await specificationRepository.create({
            description: "Description-E2",
            name: "E2"
        });

        const result = await useCase.execute({
            car_id: car.id,
            specifications_id: [specification1.id, specification2.id],
        });

        expect(result).toHaveProperty("specifications");
        expect(result.specifications.length).toBe(2);
    });
});
