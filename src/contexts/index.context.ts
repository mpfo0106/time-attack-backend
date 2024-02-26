import { Router } from "express";
import accountRouter from "./accounts/index.accounts";
import followsController from "./accounts/users/follows/follows.controller";
import bookmarksController from "./tweets/bookmarks/bookmarks.controller";
import tweetsRouter from "./tweets/index.tweets";

const router = Router();

router.use("/tweets", tweetsRouter);
router.use("/accounts/users", accountRouter);
router.use("/", followsController);
router.use("/", bookmarksController);

export default router;
