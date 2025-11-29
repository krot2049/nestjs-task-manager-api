// импортируем инструменты для проверки
import {IsString, MinLength, MaxLength, Matches,} from 'class-validator';

// класс контейнер для данных
export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8, { message: 'Пароль слишком короткий (минимум 8 символов)'})
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Пароль слишком слабый (нужны цифры, буквы разного регистра)',
    })
    password: string;
}