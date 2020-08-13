import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';

import { User } from '../users/user.entity';



@Entity('sprints')
export class Sprint extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    startDate: Date;

    // @Column({
    //     type: 'timestamp',
    //     default: () => 'DATE_ADD("CURRENT_TIMESTAMP", INTERVAL 10 DAY);'
    // })
    // ednDate: Date;

    @OneToOne(type => User)
    @JoinColumn()
    author: User;
}
