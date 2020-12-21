import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import User from '../models/user.model';
import UsersService from '../services/users.service';

@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return this.usersService.createUser(user);
  }

  @Get(':id')
  async readUser(@Param() { id }): Promise<User> {
    return this.usersService.readUser(id);
  }

  @Get()
  async readAllUsers(): Promise<User[]> {
    return this.usersService.readAllUsers();
  }

  @Patch(':id')
  async updateUser(
    @Param() { id },
    @Body() user: User,
  ): Promise<[number, User[]]> {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param() { id }) {
    return this.usersService.deleteUser(id);
  }
}
