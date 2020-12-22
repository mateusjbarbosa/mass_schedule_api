import { HttpStatus, NotFoundException } from '@nestjs/common';

export default class CustomNotFoundException {
  public static createNotFoundException(entity: any, id: number) {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: `${entity} ${id} not found`,
    });
  }
}
