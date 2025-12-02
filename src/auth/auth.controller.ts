import { Controller, Post, Body, ValidationPipe, HttpCode } from '@nestjs/common';
import { AuthCredentialsDto, } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('/signup')
    @HttpCode(201)
    async signup (
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
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