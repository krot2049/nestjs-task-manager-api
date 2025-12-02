import { Controller, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // эндпоинт для создания новой задачи
    @Post()
    async createTask(
        // body извлекает тело запроса
        @Body() body: { title: string, description: string },
    ): Promise<Task> {

        return this.tasksService.createTask(body);
    }
}