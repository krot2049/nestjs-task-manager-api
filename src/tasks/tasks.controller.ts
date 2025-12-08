import {
    Controller,
    Post,
    Body,
    Param,
    ParseIntPipe,
    Get,
    Delete,
    HttpCode,
    Patch,
    Query,
    UseGuards
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { CreateTasksDto } from './dto/create-task.dto';
import { GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import { AuthGuard } from '@nestjs/passport';
import { GetUser} from "../auth/get-user.decorator";
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Delete('/:id')
    @HttpCode(204)
    async deleteTask(
        @Param('id', ParseIntPipe) taskId: number,
        @GetUser() user: User,
        ): Promise<void> {
            return this.tasksService.deleteTask(taskId, user);
        }

    // эндпоинт для создания новой задачи
    @Post()
    async createTask(
        // используем CreateTaskDto для валидации тела запроса
        @Body() createTaskDto: CreateTasksDto,
        @GetUser() user: User,
    ): Promise<Task> {
        // передаем DTO в сервис
        return this.tasksService.createTask(createTaskDto, user);
    }

    // эндпоинт для получения всех задач с возможностью валидации
    @Get()
    async getAllTasks(
        @Query() filterDto: GetTasksFilterDto,
        @GetUser() user: User,
    ): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto, user);
    }

    // эндпоинт для получание задачи по id
    @Get('/:id')
    async getTask(
        @Param('id', ParseIntPipe) taskId: number,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.tasksService.getTask(taskId, user);
    }

    // эндпоинт для обновления статуса задачи
    @Patch('/:id/status')
    async updateTaskStatus (
        // извлекаем id задачи из url
        @Param('id', ParseIntPipe) taskId: number,
        // извлекаем и валидируем новый статус из тела запроса
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
        @GetUser() user: User
    ): Promise<Task> {
        const { status } = updateTaskStatusDto;
        // вызываем метод сервиса для обновления
        return this.tasksService.updateTaskStatus(taskId, status, user);
    }
}