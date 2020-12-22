import {
  BadRequestException,
  ConflictException,
  HttpStatus,
} from '@nestjs/common';

export default class SequelizeExceptions {
  public static createSequelizeException(e: any) {
    const messages: Array<string> = [];

    switch (e.name) {
      case 'SequelizeUniqueConstraintError':
        e.errors.forEach((error: any) => {
          messages.push(`${error.path} must be unique`);
        });

        throw new ConflictException({
          statusCode: HttpStatus.CONFLICT,
          message: messages,
        });

      case 'SequelizeValidationError':
        e.errors.forEach((error: any) => {
          messages.push(`${error.message}`);
        });

        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: messages,
        });

      default:
        throw new ConflictException({
          statusCode: HttpStatus.CONFLICT,
          message: e,
        });
    }
  }
}
