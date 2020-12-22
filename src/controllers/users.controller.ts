import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import User from '../repository/user.repository';
import UsersService from '../services/users.service';

@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return this.usersService.createUser(user);
  }

  @Get(':id')
  async readUserById(@Param() { id }): Promise<User> {
    return this.usersService.readUserById(id);
  }

  @Get()
  async readAllUsers(): Promise<User[]> {
    return this.usersService.readAllUsers();
  }

  @Patch(':id')
  async updateUser(@Param() { id }, @Body() user: User): Promise<any> {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param() { id }) {
    return this.usersService.deleteUser(id);
  }
}
