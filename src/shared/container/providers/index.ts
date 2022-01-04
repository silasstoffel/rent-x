import {container} from "tsyringe";

import {IDateProvider} from "@shared/container/providers/date/IDateProvider";
import {DayjsDateProvider} from "@shared/container/providers/date/implementations/DayjsDateProvider";
import {EtherealMailProvider} from "@shared/container/providers/mail/implementations/EtherealMailProvider";
import {IMailProvider} from "@shared/container/providers/mail/IMailProvider";
import {IStorageProvider} from "@shared/container/providers/storage/IStorageProvider";
import {LocalStorageProvider} from "@shared/container/providers/storage/implementations/LocalStorageProvider";
import {S3StorageProvider} from "@shared/container/providers/storage/implementations/S3StorageProvider";

container.registerSingleton<IDateProvider>("DayjsDateProvider", DayjsDateProvider);
container.registerInstance<IMailProvider>("EtherealMailProvider", new EtherealMailProvider());

const storageDriver = process.env.STORAGE_DRIVER || 'local';
const storage = storageDriver === 's3' ? new S3StorageProvider() : new LocalStorageProvider();
console.log(storage.constructor.name);
container.registerInstance<IStorageProvider>("StorageProvider", storage);
