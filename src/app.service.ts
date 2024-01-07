import { Injectable } from '@nestjs/common';
import { UsersMemoryStorage } from './users-memory.storage/users-memory.storage';

@Injectable()
export class AppService {
  MAX_RNG_VALUE: number = 4;

  constructor(private readonly userMemoryStorage: UsersMemoryStorage) {}

  getHello(): string {
    return `L'escapade gourmande - le jeu (backend server) `;
  }

  async turnTheWheel(ip: string): Promise<number> {
    if (await this.userMemoryStorage.validate(ip)) {
      const randomNumber = Math.floor(Math.random() * this.MAX_RNG_VALUE);
      return randomNumber;
    } else {
      return -1;
    }
    // const randomNumber = Math.floor(Math.random() * this.MAX_RNG_VALUE);
    // return randomNumber;
  }
}
