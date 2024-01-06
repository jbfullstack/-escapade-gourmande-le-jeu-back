import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersMemoryStorage } from './users-memory.storage/users-memory.storage';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UsersMemoryStorage],
})
export class AppModule {}
