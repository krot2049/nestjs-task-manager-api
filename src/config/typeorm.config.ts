import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5433,
    username: 'postgres',
    password: 'new_temp_pass',
    database: 'postgres',
    entities: [User],
    synchronize: true,
};