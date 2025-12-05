import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { Task, TaskStatus } from './task.entity';
import { CreateTasksDto } from './dto/create-task.dto';
import { GetTasksFilterDto} from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
    constructor(
        private taskRepository: TaskRepository
    ) {}

    // логика crud, метод для создания новой задачи
    async createTask(createTasksDto: CreateTasksDto): Promise<Task> {
        const { title, description } = createTasksDto;
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

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.taskRepository.createQueryBuilder('task');

        // фильтрация по статусу
        if (status) {
            query.andWhere('task.status = :status', { status: String(status) });
        }

        // фильтрация по поиску
        if (search) {
            query.andWhere(
                '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                {search: `%${search}%`}
            );
        }

        return await query.getMany();
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