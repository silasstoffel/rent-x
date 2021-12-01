import {container} from "tsyringe";

import {IDateProvider} from "@shared/container/providers/date/IDateProvider";
import {DayjsDateProvider} from "@shared/container/providers/date/implementations/DayjsDateProvider";
import {EtherealMailProvider} from "@shared/container/providers/mail/implementations/EtherealMailProvider";
import {IMailProvider} from "@shared/container/providers/mail/IMailProvider";
import {IStorageProvider} from "@shared/container/providers/storage/IStorageProvider";
import {LocalStorageProvider} from "@shared/container/providers/storage/implementations/LocalStorageProvider";

container.registerSingleton<IDateProvider>("DayjsDateProvider", DayjsDateProvider);
container.registerInstance<IMailProvider>("EtherealMailProvider", new EtherealMailProvider());
container.registerInstance<IStorageProvider>("StorageProvider", new LocalStorageProvider());
