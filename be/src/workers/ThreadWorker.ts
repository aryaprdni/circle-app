import * as amqp from "amqplib";
import CloudinaryConfig from "../libs/cloudinary";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Threads } from "../entities/Threads";

export default new (class ThreadWorker {
  private readonly ThreadWorker: Repository<Threads> = AppDataSource.getRepository(Threads);
  async create(queueName: string, connection: amqp.Connection) {
    try {
      const channel = await connection.createChannel();

      await channel.assertQueue(queueName);

      await channel.consume(queueName, async (message) => {
        if (message !== null) {
          try {
            const data = JSON.parse(message.content.toString());
            console.log(data);
            const cloudinary = await CloudinaryConfig.destination(data.image);
            const obj = this.ThreadWorker.create({
              content: data.content,
              image: cloudinary,
              user: {
                id: data.user,
              },
            });

            await this.ThreadWorker.save(obj);
            console.log("Thread is created!");
            channel.ack(message);
          } catch (error) {
            throw error;
          }
        }
      });
    } catch (error) {
      console.log({ message: error });
      throw error;
    }
  }
})();
