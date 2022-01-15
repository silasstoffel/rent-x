import {v4 as uuidV4} from "uuid";
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {User} from "@modules/accounts/infra/typeorm/entities/User";

@Entity("users_token")
export class UserTokens {
    @PrimaryColumn()
    id?: string;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column()
    refresh_token: string;

    @Column()
    expires_date: Date;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}
