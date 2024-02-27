import * as express from "express";
import UserControllers from "../controllers/user-controllers";
import authMiddleware from "../middlewares/auth-middleware";
import uploadFile from "../middlewares/UploadFile";
import threadsControllers from "../controllers/threads-controllers";
import repliesControllers from "../controllers/replies-controllers";
import likesControllers from "../controllers/likes-controllers";
import followsControllers from "../controllers/follows-controllers";

const router = express.Router();

// User
router.post("/user/register", UserControllers.Register);
router.patch("/user/:id", authMiddleware.Auth, uploadFile("image"), UserControllers.Update);
router.post("/user/login", UserControllers.login);
router.get("/users", authMiddleware.Auth, UserControllers.getAll);
// router.get("/user/:id", authMiddleware.Auth, UserControllers.getOne);
router.get("/user/check", authMiddleware.Auth, UserControllers.check);

// Threads
router.post("/threads", authMiddleware.Auth, uploadFile("image"), threadsControllers.create);
router.patch("/threads/:id", authMiddleware.Auth, uploadFile("image"), threadsControllers.update);
router.delete("/threads/:id", authMiddleware.Auth, threadsControllers.delete);
router.get("/threads", authMiddleware.Auth, threadsControllers.getAll);
router.get("/threads/:id", authMiddleware.Auth, threadsControllers.getById);

// Replies
router.post("/replies", authMiddleware.Auth, uploadFile("image"), repliesControllers.create);
router.patch("/replies/:id", authMiddleware.Auth, uploadFile("image"), repliesControllers.update);
router.delete("/replies/:id", authMiddleware.Auth, repliesControllers.delete);
router.get("/replies", authMiddleware.Auth, repliesControllers.getAll);
router.get("/replies/:id", authMiddleware.Auth, repliesControllers.getById);

// Likes
router.post("/like", authMiddleware.Auth, likesControllers.create);
router.delete("/like/:threadId", authMiddleware.Auth, likesControllers.delete);
router.get("/like", authMiddleware.Auth, likesControllers.getAll);
router.get("/like/:id", authMiddleware.Auth, likesControllers.getById);

// Follows
router.post("/follows", authMiddleware.Auth, followsControllers.create);
router.get("/follows", authMiddleware.Auth, followsControllers.find);
router.delete("/follows/:followingUserId", authMiddleware.Auth, followsControllers.delete);
// router.get("/follows/:id", authMiddleware.Auth, followsControllers.getById);

export default router;
