import {Controller, Post, Body, Param, ParseIntPipe, Get, Delete, HttpCode, Patch, Query} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { CreateTasksDto } from './dto/create-task.dto';
import { GetTasksFilterDto} from "./dto/get-tasks-filter.dto";

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Delete('/:id')
    @HttpCode(204)
    async deleteTask(
        @Param('id', ParseIntPipe) taskId: number,
        ): Promise<void> {
            return this.tasksService.deleteTask(taskId);
        }



    // эндпоинт для создания новой задачи
    @Post()
    async createTask(
        // используем CreateTaskDto для валидации тела запроса
        @Body() createTaskDto: CreateTasksDto,
    ): Promise<Task> {
        // передаем DTO в сервис
        return this.tasksService.createTask(createTaskDto);
    }

    // эндпоинт для получения всех задач с возможностью валидации
    @Get()
    async getAllTasks(
        @Query() filterDto: GetTasksFilterDto,
    ): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto);
    }

    // эндпоинт для получание задачи по id
    @Get('/:id')
    async getTask(
        @Param('id', ParseIntPipe) taskId: number,
    ): Promise<Task> {
        return this.tasksService.getTask(taskId);
    }

    // эндпоинт для обновления статуса задачи
    @Patch('/:id/status')
    async updateTaskStatus (
        // извлекаем id задачи из url
        @Param('id', ParseIntPipe) taskId: number,
        // извлекаем и валидируем новый статус из тела запроса
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    ): Promise<Task> {
        const { status } = updateTaskStatusDto;
        // вызываем метод сервиса для обновления
        return this.tasksService.updateTaskStatus(taskId, status);
    }
}