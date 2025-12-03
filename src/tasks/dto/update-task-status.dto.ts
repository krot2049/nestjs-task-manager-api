import { IsIn } from 'class-validator';
import { TaskStatus} from "../task.entity";

export class UpdateTaskStatusDto {
    // IsIn проверяет что переданное значение находится
    // среди допустимых значений TaskStatus
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus;
}