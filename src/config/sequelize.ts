import { SequelizeModule } from '@nestjs/sequelize';

import User from 'src/repository/user.repository';

export default class Sequelize {
  public static createInstance() {
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

  public static createTables() {
    return SequelizeModule.forFeature([User]);
  }
}
