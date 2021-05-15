import { container } from "tsyringe";

import { ICategoriesRepositories } from "../../Modules/Cars/Repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../Modules/Cars/Repositories/Implementations/CategoriesRepository";
import { SpecificationsRepository } from '../../Modules/Cars/Repositories/Implementations/SpecificationsRepository';
import { ISpecificationsRepository } from '../../Modules/Cars/Repositories/ISpecificationsRepository';

container.registerSingleton<ICategoriesRepositories>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);
