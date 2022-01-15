import { container } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/date/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/date/implementations/DayjsDateProvider";
import { EtherealMailProvider } from "@shared/container/providers/mail/implementations/EtherealMailProvider";
import { SESMailProvider } from "@shared/container/providers/mail/implementations/SESMailProvider";
import { IMailProvider } from "@shared/container/providers/mail/IMailProvider";
import { IStorageProvider } from "@shared/container/providers/storage/IStorageProvider";
import { LocalStorageProvider } from "@shared/container/providers/storage/implementations/LocalStorageProvider";
import { S3StorageProvider } from "@shared/container/providers/storage/implementations/S3StorageProvider";

const { MAIL_PROVIDER, STORAGE_DRIVER } = process.env;

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
);

const mailProvider =
    MAIL_PROVIDER === "ses"
        ? new SESMailProvider()
        : new EtherealMailProvider();

container.registerInstance<IMailProvider>("MailProvider", mailProvider);

const storageDriver = STORAGE_DRIVER || "local";
const storage =
    storageDriver === "s3"
        ? new S3StorageProvider()
        : new LocalStorageProvider();

container.registerInstance<IStorageProvider>("StorageProvider", storage);
