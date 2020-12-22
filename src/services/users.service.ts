import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import User from '../repository/user.repository';
@Injectable()
export default class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  public async createUser(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  public async readUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  public async readAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  public async updateUser(id: number, user: User): Promise<any> {
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

  public async deleteUser(id: number) {
    const user = await this.readUserById(id);

    const result: any = user.destroy();

    console.log(result);
  }
}
