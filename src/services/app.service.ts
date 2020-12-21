import { Injectable } from '@nestjs/common';

@Injectable()
export default class AppService {
  getHello(): string {
    return 'Welcome to Mass Schedule API!';
  }
}
