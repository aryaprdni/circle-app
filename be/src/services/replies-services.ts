import { Replies } from "./../entities/Replies";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { redisClient } from "../libs/redis";

export default new (class RepliesService {
  private readonly RepliesRepository: Repository<Replies> = AppDataSource.getRepository(Replies);

  // async create(data: any): Promise<object | string> {
  //   try {
  //     const response = await this.RepliesRepository.save(data);

  //     return {
  //       message: "Create replies success",
  //       data: response,
  //     };
  //   } catch (error) {
  //     return {
  //       message: "Create replies failed",
  //       error: error.message,
  //     };
  //   }
  // }

  async update(id: number, data: Replies): Promise<object | string> {
    try {
      const response = await this.RepliesRepository.update(id, data);
      return {
        message: "Update threads success",
        data: response,
      };
    } catch (error) {
      return {
        message: "Update threads failed",
        error: error.message,
      };
    }
  }

  async delete(id: number): Promise<object | string> {
    try {
      const response = await this.RepliesRepository.delete(id);
      return {
        message: "Delete threads success",
        data: response,
      };
    } catch (error) {
      return {
        message: "Delete threads failed",
        error: error.message,
      };
    }
  }

  async getAll(reqQuery: any): Promise<any> {
    try {
<<<<<<< HEAD
      const threadId = parseInt(reqQuery.thread_id ?? "");
      if (isNaN(threadId)) {
        throw new Error("Thread ID is not a number");
      }

      const cacheKey = `replies?thread_id=${threadId}`;
      let data = await redisClient.get(cacheKey);

=======
      const threadId = parseInt(reqQuery.thread_id ?? 0);

      let data = await redisClient.get("replies");
>>>>>>> b5127b8b97cf4c801f56f21d4b5279ad2c2e7070
      if (!data) {
        const replies = await this.RepliesRepository.find({
          relations: ["user", "threads"],
          where: {
            threads: {
              id: threadId,
            },
          },
          order: {
            id: "DESC",
          },
          select: {
            user: {
              id: true,
              username: true,
              full_name: true,
            },
            threads: {
              id: true,
              content: true,
              image: true,
            },
<<<<<<< HEAD
            id: true,
            content: true,
            image: true,
          },
        });

        if (!replies || replies.length === 0) {
          throw new Error("Replies not found");
        }

        await redisClient.set(cacheKey, JSON.stringify(replies));
        data = JSON.stringify(replies);
      }

      const parsedData = JSON.parse(data);
      if (!parsedData) {
        throw new Error("Parsed data is empty");
      }

      return {
        message: "Get all replies",
        data: parsedData,
      };
    } catch (error) {
      console.error("Error in getAll:", error);
      throw new Error("Internal server error");
=======
          },
        });
        const stringDataDB = JSON.stringify(replies);
        data = stringDataDB;
        await redisClient.set("replies", stringDataDB);
      }
      console.log(data);
      return {
        message: "Get all replies",
        data: JSON.parse(data),
      };
    } catch (error) {
      throw new Error(error.message);
>>>>>>> b5127b8b97cf4c801f56f21d4b5279ad2c2e7070
    }
  }

  async getById(id: number): Promise<object | string> {
    try {
      const response = await this.RepliesRepository.findOne({
        where: {
          id: id,
        },
        relations: ["user", "threads"],
        select: {
          user: {
            full_name: true,
            username: true,
<<<<<<< HEAD
            profile_picture: true,
=======
            photo_profile: true,
>>>>>>> b5127b8b97cf4c801f56f21d4b5279ad2c2e7070
          },
          threads: {
            id: true,
            content: true,
            image: true,
          },
          id: true,
          content: true,
          image: true,
        },
      });
      return {
        message: "Get one threads success",
        data: response,
      };
    } catch (error) {
      return {
        message: "Get one threads failed",
        error: error.message,
      };
    }
  }
})();
