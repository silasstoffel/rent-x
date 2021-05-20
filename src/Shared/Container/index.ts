import { container } from "tsyringe";

import { IUsersRepository } from "../../Modules/Accounts/Repositories/IUsersRepository";
import { ICategoriesRepositories } from "../../Modules/Cars/Repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../Modules/Cars/Repositories/Implementations/CategoriesRepository";
import { SpecificationsRepository } from "../../Modules/Cars/Repositories/Implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "../../Modules/Cars/Repositories/ISpecificationsRepository";
import { UsersRepository } from "../../Modules/Accounts/Repositories/Implementations/UsersRepository";

container.registerSingleton<ICategoriesRepositories>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
