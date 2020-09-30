import express from 'express';
import UserRoutes from './Routes/user.routes';
import RabbitRoutes from './Routes/rabbitmq.routes';

class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.server.use(express.json());
  }

  private routes(): void {
    this.server.use(UserRoutes);
    this.server.use(RabbitRoutes);
  }
}

export default new App().server;
