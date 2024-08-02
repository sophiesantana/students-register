import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { StudentsModule } from './students/students.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DatabaseModule, StudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
