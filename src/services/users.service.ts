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

  public async updateUser(id: number, user: User): Promise<User> {
    const updatedUsers = await this.userRepository.update(user, {
      where: { id: id },
      returning: true,
    });

    /** The update sequelize method return a array, the position 0 is
     * the affected rows, while position 1 is other array with the
     * updated objects. How every updates have a id, every requests
     * will have one object only. */
    return updatedUsers[1][0];
  }

  public async deleteUser(user: User): Promise<void> {
    return await user.destroy();
  }
}
