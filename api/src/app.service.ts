import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { output: 'Hello World!' };
  }
}
