import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import RabbitMQServer from './rabbitmq-server';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('nest')
  async nest(@Req() request: Request) {
    const server = new RabbitMQServer('amqp://localhost:5672');
    await server.start();
    await server.publishQueue('express', JSON.stringify(request.body));
    await server.publishExchange(
      'amq.direct',
      'rota2',
      JSON.stringify(request.body),
    );

    return request.body;
  }
}
