import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class UsersMemoryStorage
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private redisClient: Redis;
  private fourHoursInMilliseconds = 4 * 60 * 60 * 1000;

  onApplicationBootstrap() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST, //'localhost', // NOTE: According to best practices, we should use the environment variables here instead.
      port: parseInt(process.env.REDIS_PORT, 10), // 6379
    });
  }

  onApplicationShutdown(signal?: string) {
    return this.redisClient.quit();
  }

  private async insert(userIp: string, eventDate: string): Promise<void> {
    await this.redisClient.set(this.getKey(userIp), eventDate);
  }

  async validate(userIp: string): Promise<boolean> {
    const currentDate = new Date();
    const storedEventDate = await this.redisClient.get(this.getKey(userIp));

    // store current event date
    await this.insert(userIp, currentDate.toISOString());

    if (storedEventDate == null) {
      return true;
    }

    const parsedStoredEventDate = new Date(storedEventDate);
    const timeDifferenceInMilliseconds = Math.abs(
      currentDate.getTime() - parsedStoredEventDate.getTime(),
    );

    if (timeDifferenceInMilliseconds >= this.fourHoursInMilliseconds) {
      return true;
    }

    return false;
  }

  private getKey(ip: string): string {
    return `user-${ip}`;
  }
}
