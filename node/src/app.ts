import express from 'express';
import UserRoutes from './Routes/user.routes';
import RabbitRoutes from './Routes/rabbitmq.routes';
import RabbitMQServer from './rabbitmq-server';

class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.consumer();
  }

  private middlewares(): void {
    this.server.use(express.json());
  }

  private routes(): void {
    this.server.use(UserRoutes);
    this.server.use(RabbitRoutes);
  }

  private async consumer() {
    const server = new RabbitMQServer('amqp://localhost:5672');
    await server.start();
    await server.consume('express', (message) =>
      console.log(message.content.toString())
    );
  }
}

export default new App().server;
