import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/student.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
