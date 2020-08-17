import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn, OneToMany } from 'typeorm';

import { User } from '../users/user.entity';
import { Sprint } from '../sprints/sprint.entity';

@Entity()
export class Team extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        unique: true,
        length: 255,
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    comment: string;

    @ManyToMany((type) => User, { onDelete: 'CASCADE' })
    @JoinTable()
    users: User[];

    @OneToOne((type) => User, { nullable: false })
    @JoinColumn()
    author: User;

    @OneToMany((type) => Sprint, (sprint) => sprint.team)
    sprints: Sprint[];
}
