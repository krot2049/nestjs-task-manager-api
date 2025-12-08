import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'topSecret51',
            signOptions: {
                expiresIn: '3600',
            },
        }),
        // подключаем репозиторий user чтобы authService мог работать с базой
        TypeOrmModule.forFeature([User])
    ],
    controllers: [AuthController],
    providers: [AuthService],
    // экспортируем эти модули чтобы защитник в других модулях мог их использовать
    exports: [PassportModule, JwtModule],
})
export class AuthModule {}