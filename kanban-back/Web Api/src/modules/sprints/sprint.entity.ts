import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, OneToMany, ManyToOne, RelationId } from 'typeorm';

import { User } from '../users/user.entity';
import { Task } from '../tasks/task.entity';
import { Team } from '../teams/team.entity';

@Entity('sprints')
export class Sprint extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    startDate: Date;

    // @Column({
    //     type: 'timestamp',
    //     default: () => 'DATE_ADD("CURRENT_TIMESTAMP", INTERVAL 10 DAY);'
    // })
    // ednDate: Date;

    @OneToOne((type) => User)
    @JoinColumn()
    author: User;

    @OneToMany((type) => Task, (task) => task.sprint)
    createdTasks: Task[];

    @ManyToOne((type) => Team, (team) => team.sprints)
    team: Team;

    @RelationId((sprint: Sprint) => sprint.team)
    teamId: number;
}
