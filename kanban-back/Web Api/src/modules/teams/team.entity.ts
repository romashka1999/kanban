import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';

import { User } from '../users/user.entity';


@Entity('teams')
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

    @ManyToMany(type => User, {onDelete: 'CASCADE'})
    @JoinTable()
    users: User[];

    @OneToOne(type => User)
    @JoinColumn()
    author: User;
}
