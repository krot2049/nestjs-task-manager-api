// шаблон для таблиц в базе данных

import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('user') // связываем класс с таблицей user в бд
export class User {
    @PrimaryGeneratedColumn()
    id: number; // первичный ключ который генерируется автоматически

    @Column({unique: true})
    username: string;

    @Column() // колонка для хешированного пороля
    password: string;

    // в будущем здесь будут связи с другими таблицами
}