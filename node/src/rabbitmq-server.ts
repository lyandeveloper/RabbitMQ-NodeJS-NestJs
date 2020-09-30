import { Connection, Channel, connect } from 'amqplib';

export default class RabbitMQServer {
  private conn: Connection;
  private channel: Channel;

  constructor(private uri: string) {}

  async start(): Promise<void> {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  async publishQueue(queue: string, message: string) {
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }
}
