import { Router } from "express";
import commentsController from "./comments/comments.controller";
import tweetsController from "./tweets.controller";

const tweetsRouter = Router();

tweetsRouter.use("/", tweetsController);
tweetsRouter.use("/", commentsController);

export default tweetsRouter;
