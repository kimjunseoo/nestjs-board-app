import { TypeOrmModuleOptions } from "@nestjs/typeorm";


export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '57365736kjH!p',
    database: 'board-app',
    entities: [__dirname + '/../**/*.entitiy.{js,ts}'],
    synchronize: true
}