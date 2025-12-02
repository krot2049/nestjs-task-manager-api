import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { Task, TaskStatus } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        private taskRepository: TaskRepository
    ) {}

    // логика crud, метод для создания новой задачи
    async createTask(taskData: { title: string, description: string }): Promise<Task> {
        const { title, description } = taskData;
        const task = this.taskRepository.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });

        await this.taskRepository.save(task);

        return task;
    }
}