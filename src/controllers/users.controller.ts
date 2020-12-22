import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import CustomNotFoundException from 'src/exceptions/core/custom_not_found.exception';
import CustomBadRequestException from 'src/exceptions/core/custom_bad_request.exception';
import SequelizeExceptions from 'src/exceptions/sequelize.exception';

import User from 'src/repository/user.repository';
import UsersService from 'src/services/users.service';

@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async createUser(@Body() user: User): Promise<User> {
    try {
      const createdUser = await this.usersService.createUser(user);

      return createdUser;
    } catch (e: any) {
      SequelizeExceptions.createSequelizeException(e);
    }
  }

  @Get(':id')
  public async readUserById(@Param() { id }): Promise<User> {
    const readedUser = await this.usersService.readUserById(id);

    if (!readedUser) {
      CustomNotFoundException.createNotFoundException(User.name, id);
    }

    return readedUser;
  }

  @Get()
  public async readAllUsers(): Promise<User[]> {
    return this.usersService.readAllUsers();
  }

  @Patch(':id')
  public async updateUser(@Param() { id }, @Body() user: User): Promise<any> {
    const updatingUser = await this.usersService.readUserById(id);

    if (!updatingUser) {
      CustomNotFoundException.createNotFoundException(User.name, id);
    }

    if (Object.keys(user).length === 0) {
      CustomBadRequestException.createEmptyBodyException();
    }

    try {
      const updatedUser = await this.usersService.updateUser(id, user);

      return updatedUser;
    } catch (e: any) {
      SequelizeExceptions.createSequelizeException(e);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteUser(@Param() { id }): Promise<void> {
    const deletingUser = await this.usersService.readUserById(id);

    if (!deletingUser) {
      CustomNotFoundException.createNotFoundException(User.name, id);
    }

    this.usersService.deleteUser(deletingUser);
  }
}
