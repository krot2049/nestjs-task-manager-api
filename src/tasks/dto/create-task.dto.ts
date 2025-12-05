import { IsNotEmpty } from 'class-validator';

export class CreateTasksDto {
    @IsNotEmpty({ message: 'Поле "title" не должно быть пустым' })
    title: string;

    @IsNotEmpty({ message: 'Поле "description" не должно быть пустым' })
    description: string;
}