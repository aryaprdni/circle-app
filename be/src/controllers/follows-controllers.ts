import { Request, Response } from "express";
import FollowsService from "../services/follows-services";

export default new (class FollowsController {
  async create(req: Request, res: Response) {
    try {
        const userId = res.locals.loginSession.id;
        const response = await FollowsService.create(req.body, userId);
        return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const followingUserId = parseInt(req.params.followingUserId)
      const userId = res.locals.loginSession;
      
      if (isNaN(followingUserId)) {
        return res.status(400).json({
          message: "Invalid ID provided",
          error: "Invalid input for type number",
        });
      }
      const response = await FollowsService.delete(followingUserId, userId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

    async find(req: Request, res: Response) {
    try {
      const userId = res.locals.loginSession.id;
      const limit = (req.query.limit ?? 0) as number;
      const type = (req.query.type ?? "") as string;

      const response = await FollowsService.find(userId, type, limit);
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
})();
