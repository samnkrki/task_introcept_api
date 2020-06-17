import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CsvBody } from './interface/csvInterface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getUserData() {
    return this.appService.getUserData();
  }

  @Post()
  saveUserData(@Body() userDetail: CsvBody) {
    console.log(userDetail)
    return this.appService.saveUserData(userDetail);
  }
}
