import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

import {CreateRentalUseCase} from "@modules/rentals/useCases/createRental/CreateRentalUseCase";
import {IRentalsRepository} from "@modules/rentals/repositories/IRentalsRepository";
import {RentalsRepositoryInMemory} from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import {AppError} from "@shared/errors/AppError";
import {DayjsDateProvider} from "@shared/container/providers/date/implementations/DayjsDateProvider";

let useCase: CreateRentalUseCase;
let repository: IRentalsRepository;
const dateProvider = new DayjsDateProvider();

describe('CreateRentalUseCase', () => {
    const dateAdd24Hours = dayjs().add(1, 'day').toDate();
    beforeEach(() => {
        repository = new RentalsRepositoryInMemory();
        useCase = new CreateRentalUseCase(repository, dateProvider);
    });

    it('Should be able to create a new rental', async () => {
        const rental = await useCase.execute({
            user_id: '1234',
            car_id: '5678',
            expected_return_date: dateAdd24Hours
        });

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });

    it('Should not be able to create a new rental if there is another open to the same user', async () => {
        const dto = {
            user_id: '1234',
            car_id: '5678',
            expected_return_date: dateAdd24Hours
        };
        await expect(async () => {
            await useCase.execute(dto);
            await useCase.execute(dto);
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to create a new rental if there is another open to the same car', async () => {
        const dto = {
            user_id: '1234',
            car_id: '5678',
            expected_return_date: dateAdd24Hours
        };
        await expect(async () => {
            await useCase.execute(dto);
            dto.user_id = '4321';
            await useCase.execute(dto);
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to create a new rental  with invalid return time', async () => {
        const dto = {
            user_id: '1234',
            car_id: '5678',
            expected_return_date: dayjs().add(12, 'hours').toDate()
        };
        await expect(async () => {
            await useCase.execute(dto);
        }).rejects
            .toEqual(new AppError('Invalid return time!'));
    });

});
