import { IsOptional, IsEnum, IsNotEmpty } from "class-validator";
import {TaskStatus} from "../task.entity";

export class GetTasksFilterDto {
    @IsOptional()
    @IsEnum(TaskStatus, { each: true })
    status?: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search?: string;
}