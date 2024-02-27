import { Like, Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { randomInt } from "crypto";
import { Response } from "express";

export default new (class UserServices {
  private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User);
  async Register(data: any, res: Response): Promise<object | string> {
    try {
      const check_full_name = await this.UserRepository.exists({
        where: {
          full_name: data.full_name,
        },
      });
      if (check_full_name)
        return res.status(409).json({
          message: `message: username ${data.full_name} already exist`,
        });

      const checkEmail = await this.UserRepository.exists({
        where: {
          email: data.email,
        },
      });
      if (checkEmail)
        return res.status(409).json({
          message: `message: email ${data.email} already exist`,
        });

      const randomNumber = randomInt(1000, 9999);
      const generatedUsername = `${data.full_name.replace(/\s+/g, "_").toLowerCase()}${randomNumber}`;

      const hashPassword = await bcrypt.hash(data.password, 10);

      const obj = {
        ...data,
        username: generatedUsername,
        password: hashPassword,
      };

      const response = await this.UserRepository.save(obj);
      return {
        message: "Register success",
        data: response,
      };
    } catch (error) {
      return {
        message: "Register failed",
        error: error.message,
      };
    }
  }

  async Login(data: any, res: Response): Promise<object | string> {
    try {
      const checkUser = await this.UserRepository.findOne({
        where: [{ username: Like(`%${data.username}%`) }, { email: Like(`%${data.username}%`) }],
      });

      if (!checkUser) {
        throw new Error("Email / password is wrong!");
      }

      const comparePassword = await bcrypt.compare(data.password, checkUser.password);
      if (!comparePassword) {
        return res.status(400).json({
          message: "Email / password is wrong!",
        });
      }

      const obj = {
        id: checkUser.id,
        username: checkUser.username,
      };

      const token = jwt.sign(obj, "secret", { expiresIn: "1h" });

      return {
        message: "Login success",
        token: token,
        user: {
          id: checkUser.id,
          username: checkUser.username,
          full_name: checkUser.full_name,
          email: checkUser.email,
        },
      };
    } catch (error) {
      console.error("Error occurred during login:", error);

      return {
        message: "Login failed",
        error: error.message,
      };
    }
  }

  async Update(data: any, res: Response): Promise<object | string> {
    try {
      const check_full_name = await this.UserRepository.exists({
        where: {
          full_name: data.full_name,
        },
      });
      if (check_full_name)
        return res.status(409).json({
          message: `message: username ${data.full_name} already exist`,
        });

      const checkEmail = await this.UserRepository.exists({
        where: {
          email: data.email,
        },
      });
      if (checkEmail)
        return res.status(409).json({
          message: `message: email ${data.email} already exist`,
        });

      const response = await this.UserRepository.save(data);
      return {
        message: "Register success",
        data: response,
      };
    } catch (error) {
      return {
        message: "Register failed",
        error: error.message,
      };
    }
  }

  async getAll(): Promise<object | string> {
    try {
      const response = await this.UserRepository.find();

      return {
        message: "Get all user success",
        data: response,
      };
    } catch (error) {
      return {
        message: "Get all user failed",
        error: error.message,
      };
    }
  }

  async getOne(id: number): Promise<object | string> {
    try {
      const response = await this.UserRepository.findOneBy({ id });

      return {
        message: "Get one user success",
        data: response,
      };
    } catch (error) {
      return {
        message: "Get one user failed",
        error: error.message,
      };
    }
  }

  async check(loginSession: any): Promise<any> {
    try {
      const user = await this.UserRepository.findOne({
        where: {
          id: loginSession,
        },
      });

      return {
        message: "Token is valid!",
        user: {
          id: user.id,
          full_name: user.full_name,
          username: user.username,
          email: user.email,
          photo_profile: user.photo_profile,
          photo_background: user.photo_background,
        },
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
})();
