import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post()
  createUser(@Body() user): string {
    return `created user`;
  }

  @Get(':id')
  getUser(@Param() params): string {
    return `user ${params.id}`;
  }

  @Get()
  getAllUsers(): string {
    return 'all users';
  }

  @Patch(':id')
  updateUser(@Body() user): string {
    return `updated user`;
  }

  @Delete(':id')
  deleteUser(@Param() params): string {
    return `deleted user`;
  }
}
