import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { Task, TaskStatus } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    constructor(
        private taskRepository: TaskRepository
    ) {}

    // логика crud, метод для создания новой задачи
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.taskRepository.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });

        await this.taskRepository.save(task);

        return task;
    }

    // метод для обновления только статуса
    async updateTaskStatus(taskId: number, status: TaskStatus): Promise<Task> {

        // используем Query Builder для обновления только колонки status
        const result = await this.taskRepository.update(
            { id: taskId },
            { status }
        );

        // проверяем была ли запись обновлена
        if (result.affected === 0) {
            throw new NotFoundException(`Задача с ID "${taskId}" не найдена`);
        }

        // возвращаем полностью актуальный объект
        return this.getTask(taskId);
    }

    // метод для получения всех задач

    async getAllTasks(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    // метод для получения задачи по id

    async getTask(taskId: number): Promise<Task> {
        const found = await this.taskRepository.findOneBy({ id: taskId });

        if (!found) {
            throw new NotFoundException(`Задача с ID "${taskId}" не найдена`);
        }
        return found;
    }

    // метод для удаления задач по id

    async deleteTask(taskId: number): Promise<void> {
        // метод delete удаляет запись по условию (id)
        const result = await this.taskRepository.delete(taskId);

        // проверяем была ли удалена хотя бы одна строка

        if (result.affected === 0) {
            throw new NotFoundException(`Задача с ID "${taskId}" не найдена`)
        }
    }
}