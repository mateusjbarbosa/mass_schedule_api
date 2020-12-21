import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import User from '../models/user.model';

@Injectable()
export default class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async createUser(user: User): Promise<User> {
    return this.userModel.create(user);
  }

  async readUser(id: number): Promise<User> {
    return this.userModel.findOne({ where: { id: id } });
  }

  async readAllUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async updateUser(id: number, user: User): Promise<[number, User[]]> {
    return this.userModel.update(user, { where: { id: id } });
  }

  async deleteUser(id: number) {
    const user = await this.readUser(id);

    const result: any = user.destroy();

    console.log(result);
  }
}
