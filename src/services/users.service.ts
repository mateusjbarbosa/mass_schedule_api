import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import User from '../repository/user.repository';
@Injectable()
export default class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  async readUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async readAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async updateUser(id: number, user: User): Promise<any> {
    const updatedUsers = await this.userRepository.update(user, {
      where: { id: id },
    });

    if (updatedUsers[0] === 1) {
      return {
        id: id,
        ...user,
      };
    }
  }

  async deleteUser(id: number) {
    const user = await this.readUserById(id);

    const result: any = user.destroy();

    console.log(result);
  }
}
