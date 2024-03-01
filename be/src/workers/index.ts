import { AppDataSource } from "../data-source";
import cloudinary from "../libs/cloudinary";
import * as amqp from "amqplib";
import "dotenv/config";
import ThreadWorker from "./ThreadWorker";

export default new (class WorkerHub {
  constructor() {
    AppDataSource.initialize()
      .then(async () => {
        cloudinary.config();

        const connection = await amqp.connect(process.env.URL_CONNECT);
        // ThreadWorker
        ThreadWorker.create(process.env.QUEUE_NAME, connection);
      })
      .catch();
  }
})();
