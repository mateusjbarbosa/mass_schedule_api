import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersController } from './components/Users/Users.controller';
import UsersService from './components/Users/users.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import User from './components/Users/user.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'mass_schedule_database',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([User]),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
