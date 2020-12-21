import { Injectable } from '@nestjs/common';

import User from './user.model';

@Injectable()
export default class UsersService {
  createUser(user: User): User {
    return user;
  }

  readUser(id: number): string {
    return `user ${id}`;
  }

  readAllUsers(): string {
    return 'all users';
  }

  updateUser(user: User): User {
    return user;
  }

  deleteUser(id: number): string {
    return `deleted user ${id}`;
  }
}
