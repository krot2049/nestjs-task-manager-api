import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../auth/user.entity';

export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

// определяем строгие, типобезопасные статусы для задач
@Entity('task')
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.OPEN,
    })
    status: TaskStatus;

    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.tasks, { eager: false })
    user: User;
}