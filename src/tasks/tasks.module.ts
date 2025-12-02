import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService} from './tasks.service';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Module ({
    imports: [
        TypeOrmModule.forFeature([Task]),
    ],
    controllers: [TasksController],
    providers: [
        TasksService,
        TaskRepository,
    ],
})
export class TasksModule {}