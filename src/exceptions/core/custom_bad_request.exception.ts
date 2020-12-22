import { HttpStatus, BadRequestException } from '@nestjs/common';

export default class CustomBadRequestException {
  public static createEmptyBodyException() {
    throw new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: `At least one field is required`,
    });
  }
}
