import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { validatePassword } from 'src/utils/password.helper';
import { Task } from '../tasks/task.entity';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        unique: true,
        length: 255,
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    password: string;

    @Column({
        type: 'varchar',
        nullable: false,
        select: true,
    })
    salt: string;


    @OneToMany(type => Task, task => task.user)
    tasks: Task[]

    async validatePassword(password: string): Promise<boolean> {
        return await validatePassword(password, this);
    }
}
