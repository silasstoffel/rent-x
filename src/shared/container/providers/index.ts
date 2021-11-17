import {container} from "tsyringe";

import {IDateProvider} from "@shared/container/providers/date/IDateProvider";
import {DayjsDateProvider} from "@shared/container/providers/date/implementations/DayjsDateProvider";
import {EtherealMailProvider} from "@shared/container/providers/mail/implementations/EtherealMailProvider";
import {IMailProvider} from "@shared/container/providers/mail/IMailProvider";

container.registerSingleton<IDateProvider>("DayjsDateProvider", DayjsDateProvider);
container.registerInstance<IMailProvider>("EtherealMailProvider", new EtherealMailProvider());
