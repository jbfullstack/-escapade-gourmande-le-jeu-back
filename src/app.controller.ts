import { Controller, Get, Ip } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/turn-the-wheel')
  async turnTheWheel(@Ip() ip): Promise<number> {
    return await this.appService.turnTheWheel(ip);
  }
}
