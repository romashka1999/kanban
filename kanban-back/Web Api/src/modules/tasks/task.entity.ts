import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

import { User } from '../users/user.entity';
import { Sprint } from '../sprints/sprint.entity';

export enum TaskStatus {
    READY = 'READY',
    IN_PROGRESS = 'IN_PROGRESS',
    TESTING = 'TESTING',
    DONE = 'DONE',
}

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    title: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    description: string;

    @Column({
        type: 'enum',
        enum: [TaskStatus.READY, TaskStatus.IN_PROGRESS, TaskStatus.DONE, TaskStatus.TESTING],
        default: TaskStatus.READY
    })
    status: TaskStatus;

    @Column({
        type: 'bool',
        default: false,
    })
    archived: boolean;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @VersionColumn()
    version: number;

    @ManyToOne((type) => User, (user) => user.createdTasks)
    author: User;

    @RelationId((task: Task) => task.author)
    authorId: number;

    @ManyToOne((type) => User, (user) => user.tasksWhichYouAssignToOther)
    assigner: User;

    @RelationId((task: Task) => task.assigner)
    assignerId: number;

    @ManyToOne((type) => User, (user) => user.tasksWhichAreAssignedToYou)
    assignee: User;

    @RelationId((task: Task) => task.assignee)
    assigneeId: number;

    @ManyToOne((type) => Sprint, (sprint) => sprint.tasks, { nullable: false })
    sprint: Sprint;

    @RelationId((task: Task) => task.sprint)
    sprintId: number;
}
