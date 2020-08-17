import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, OneToMany, ManyToOne, RelationId } from 'typeorm';

import { User } from '../users/user.entity';
import { Task } from '../tasks/task.entity';
import { Team } from '../teams/team.entity';

@Entity()
export class Sprint extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'date',
        nullable: false,
    })
    startDate: Date;

    @Column({
        type: 'date',
        nullable: false,
    })
    endDate: Date;

    @OneToOne((type) => User, { nullable: false })
    @JoinColumn()
    author: User;

    @OneToMany((type) => Task, (task) => task.sprint)
    tasks: Task[];

    @ManyToOne((type) => Team, (team) => team.sprints, { nullable: false })
    team: Team;

    @RelationId((sprint: Sprint) => sprint.team)
    teamId: number;
}
