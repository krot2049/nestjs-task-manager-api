import { DataSource, Repository} from "typeorm";
import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';

@Injectable()
    // насследуемся от Repository<Task>, получае готовые методы
export class TaskRepository extends Repository<Task> {
    // внедряем DataSource, чтобы TypeORM мог создать менеджер сущностей
    constructor(dataSource: DataSource) {
        // вызываем родительский конструкт для корректной иницилизации репозитория
        super(Task, dataSource.createEntityManager());
    }

    // тут будет логика работы с бд
}

