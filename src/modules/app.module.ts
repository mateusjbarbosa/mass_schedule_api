import { Module } from '@nestjs/common';

import Sequelize from '../config/sequelize';

import { controllers } from 'src/controllers';
import { services } from 'src/services';

@Module({
  imports: [Sequelize.createInstance(), Sequelize.createTables()],
  controllers: controllers,
  providers: services,
})
export class AppModule {}
