import { Module } from '@nestjs/common';
import { AppController } from './controllers/student.controller';
import { AppService } from './services/student.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
