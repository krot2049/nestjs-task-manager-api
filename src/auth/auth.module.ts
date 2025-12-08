import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),

        JwtModule.register({
            secret: 'topSecret51',
            signOptions: {
                expiresIn: '24h',
            },
        }),

        TypeOrmModule.forFeature([User])
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [PassportModule, JwtModule, JwtStrategy],
})
export class AuthModule {}