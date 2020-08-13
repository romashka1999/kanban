import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { User } from '../users/user.entity';

export enum TaskStatus {
    READY = 'READY',
    IN_PROGRESS = 'IN_PROGRESS',
    TESTING = 'TESTING',
    DONE = 'DONE',
}


@Entity('tasks')
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        unique: true,
        length: 255,
    })
    title: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    description: string;


    @Column({
        type: 'varchar',
        nullable: false,
        default: TaskStatus.READY
    })
    status: TaskStatus;

    @ManyToOne(type => User, user => user.tasks)
    user: User;
}
