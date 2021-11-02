import {container} from "tsyringe";
import {IDateProvider} from "@shared/container/providers/date/IDateProvider";
import {DayjsDateProvider} from "@shared/container/providers/date/implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>("DayjsDateProvider", DayjsDateProvider);
