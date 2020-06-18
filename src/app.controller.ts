import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CsvBody } from './interface/csvInterface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getStartPageText(): string {
    return this.appService.sayHello()
  }
  @Get("/getLists")
  getUserData(): Promise<{}> {
    return this.appService.getUserData();
  }

  @Post("/saveInformation")
  saveUserData(@Body() userDetail: CsvBody): Promise<{}> {
    return this.appService.saveUserData(userDetail);
  }
}
