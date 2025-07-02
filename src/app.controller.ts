import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import pkg from 'package.json';

@ApiTags('Index')
@Controller()
export class AppController {
  constructor() {}

  @Get()
  index() {
    return {
      envMode: process.env.UMS_POC_NODE_ENV,
      version: pkg.version,
    };
  }
}
