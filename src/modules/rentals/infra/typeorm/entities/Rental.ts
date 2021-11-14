import {v4 as uuidV4} from "uuid";
import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, ManyToOne,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";

import {Car} from "@modules/cars/infra/typeorm/entities/Car";

@Entity('rentals')
export class Rental {
    @PrimaryColumn()
    id?: string;

    @Column()
    car_id: string;

    @ManyToOne(() => Car)
    @JoinColumn({name: 'car_id'})
    car: Car

    @Column()
    user_id: string;

    @Column({default: new Date()})
    start_date: Date;

    @Column()
    end_date?: Date;

    @Column()
    expected_return_date?: Date;

    @Column()
    total: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}
