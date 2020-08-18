import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, OneToOne, JoinColumn, OneToMany, RelationId } from 'typeorm';

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

    @ManyToMany((type) => User, { onDelete: 'CASCADE'})
    users: User[];

    @OneToOne((type) => User, { nullable: false })
    @JoinColumn()
    admin: User;

    @RelationId((team: Team) => team.admin)
    adminId: number;

    @OneToMany((type) => Sprint, (sprint) => sprint.team)
    sprints: Sprint[];
}
