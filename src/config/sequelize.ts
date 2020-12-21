import { SequelizeModule } from '@nestjs/sequelize';

import User from 'src/models/user.model';

export default class Sequelize {
  static createInstance() {
    return SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'mass_schedule_database',
      autoLoadModels: true,
      synchronize: true,
    });
  }

  static createTables() {
    return SequelizeModule.forFeature([User]);
  }
}
