import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, DeleteDateColumn, ManyToMany, JoinTable } from 'typeorm';

import { validatePassword } from 'src/utils/password.helper';
import { Task } from '../tasks/task.entity';
import { Team } from '../teams/team.entity';

@Entity()
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

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany((type) => Task, (task) => task.author)
    createdTasks: Task[];

    @OneToMany((type) => Task, (task) => task.assigner)
    tasksWhichYouAssignToOther: Task[];

    @OneToMany((type) => Task, (task) => task.assignee)
    tasksWhichAreAssignedToYou: Task[];

    @OneToOne((type) => Team, { nullable: false })
    team: Team;

    @ManyToMany((type) => Team, { onDelete: 'CASCADE'})
    @JoinTable()
    teams: Team[];

    async validatePassword(password: string): Promise<boolean> {
        return await validatePassword(password, this);
    }
}
