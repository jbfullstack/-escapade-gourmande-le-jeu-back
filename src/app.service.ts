import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  MAX_RNG_VALUE: number = 4;

  getHello(): string {
    return 'Hello World!';
  }

  turnTheWheel(): number {
    const randomNumber = Math.floor(Math.random() * this.MAX_RNG_VALUE);
    return randomNumber;
  }
}
