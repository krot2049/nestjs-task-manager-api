import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

    @Column()
    status: TaskStatus;
}