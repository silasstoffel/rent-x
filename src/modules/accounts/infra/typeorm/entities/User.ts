import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { Expose } from "class-transformer";

@Entity("users")
class User {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    driver_license: string;

    @Column()
    is_admin: boolean;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    avatar: string;

    @Expose({
        name: "avatar_url",
    })
    avatar_url(): string {
        switch (process.env.STORAGE_DRIVER) {
            case "local":
                return `${process.env.APP_URL}/avatar/${this.avatar}`;
            case "s3":
                return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
            default:
                return null;
        }
    }

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            //this.is_admin = false;
        }
    }
}

export { User };
