// логика сервиса аутенфикации

import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository} from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs"; // для хеширования паролей
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    // инжекция, доступ к таблице user
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    // метод, регистрация нового пользователя
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        // безопасность, хеширование пароля
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // создаем объект (строку) для сохранения в бд
        const user = this.userRepository.create({
            username,
            password: hashedPassword,
        });

        try {
            // сохраняем в базе (используя entity шаблон)
            await this.userRepository.save(user);
        } catch (error) {
            // обработка ошибки если username уже занят
            if (error.code === '23505') {
                throw new ConflictException('Имя пользователя уже занято');
            }else{
                // ловим любые другие неожиданные ошибки сервера
                throw new InternalServerErrorException();
            }
        }
    }

    // метод, вход в систему
    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string}> {
        const { username, password } = authCredentialsDto;

        // найти пользователя по имени
        const user = await this.userRepository.findOneBy({ username });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return { accessToken: 'PLACEHOLDER_TOKEN'}
            }else{
                throw new UnauthorizedException('Неверные учетные данные');
            }
        }else{
            throw new UnauthorizedException('Неверные учетные данные');
        }
    }
}