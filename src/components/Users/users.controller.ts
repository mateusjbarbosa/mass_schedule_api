import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import User from './user.model';

import UsersService from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() user: User): User {
    return this.usersService.createUser(user);
  }

  @Get(':id')
  readUser(@Param() { id }): string {
    return this.usersService.readUser(id);
  }

  @Get()
  readAllUsers(): string {
    return this.usersService.readAllUsers();
  }

  @Patch(':id')
  updateUser(@Body() user: User): User {
    return this.usersService.updateUser(user);
  }

  @Delete(':id')
  deleteUser(@Param() { id }): string {
    return this.usersService.deleteUser(id);
  }
}
