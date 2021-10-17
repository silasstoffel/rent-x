import {ListCarsUseCase} from "@modules/cars/useCases/ListCars/ListCarsUseCase";
import {CarsRepositoryInMemory} from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import {ICreateCarDTO} from "@modules/cars/dtos/ICreateCarDTO";

describe('List Car: Use Case', () => {

    let useCase: ListCarsUseCase;
    let repository: CarsRepositoryInMemory;

    beforeEach(() => {
        repository = new CarsRepositoryInMemory();
        useCase = new ListCarsUseCase(repository);
    });

    it('Should be able to list all available cars', async () => {
        const data: ICreateCarDTO = {
            name: 'Car 1',
            category_id: '123456',
            daily_rate: 120.99,
            description: 'Description test',
            fine_amount: 0,
            license_plate: 'XXX-111',
            brand: 'Brand'
        }
        const car = await repository.create(data);
        const cars = await useCase.execute({});

        expect(cars).toEqual([car]);
    });

    it('Should be able to list all available cars by name', async () => {
        const name = 'Car 1';
        let data: ICreateCarDTO = {
            name,
            category_id: '123456',
            daily_rate: 120.99,
            description: 'Description test',
            fine_amount: 0,
            license_plate: 'XXX-111',
            brand: 'Brand'
        }
        const car = await repository.create(data);
        const cars = await useCase.execute({name});

        expect(cars).toEqual([car]);
    });

});
