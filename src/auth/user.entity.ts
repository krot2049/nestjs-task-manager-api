// шаблон для таблиц в базе данных

import {Column, Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { Task } from '../tasks/task.entity';

@Entity('user') // связываем класс с таблицей user в бд
export class User {
    @PrimaryGeneratedColumn()
    id: number; // первичный ключ который генерируется автоматически

    @Column({unique: true})
    username: string;

    @Column() // колонка для хешированного пороля
    password: string;

    @OneToMany(() => Task, task => task.user, { eager: true })
    tasks: Task[];
}