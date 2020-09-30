import { Router, Request, Response } from 'express';
import RabbitMQServer from '../rabbitmq-server';

const router = Router();

router.post('/express', async (req: Request, res: Response) => {
  const server = new RabbitMQServer('amqp://localhost:5672');
  await server.start();

  res.send(req.body);
});

export default router;
