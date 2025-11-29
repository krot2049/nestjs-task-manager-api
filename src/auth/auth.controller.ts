import { Controller, Post, Body, ValidationPipe, HttpCode } from '@nestjs/common';
import { AuthCredentialsDto, } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('/auth') // определяем базовый маршрут
export class AuthController {
    constructor(private authService: AuthService) {} // инжектируем сервис
    @Post('/signup') // определяем метод post для маршрута
    @HttpCode(201) // устанавливаем http статус ответа 201 created
    async signup (
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto, // получаем и валидируем тело запроса
    ): Promise<void> {
        await this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    async signIn (
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    ): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto);
    }
}