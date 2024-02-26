import { Router } from "express";
import userOnly from "../../guards/userOnly.guard";

import tweetsService from "./tweets.service";
import {
  CreateTweetData,
  DeleteTweetData,
  UpdateTweetData,
} from "./tweets.type";

const tweetsController = Router();

/**
 * 전체글 조회
 */
tweetsController.get("/", async (_, res, next) => {
  try {
    const tweets = await tweetsService.getTweets();

    res.json(tweets);
  } catch (e) {
    next(e);
  }
});
/**
 * 트윗 생성
 */

tweetsController.post("/", userOnly, async (req, res, next) => {
  try {
    const { content } = req.body;
    const authorId = req.user!.id;
    const createTweetData: CreateTweetData = {
      content,
      authorId,
    };
    const tweet = await tweetsService.createTweet(createTweetData);

    res.json(tweet);
  } catch (e) {
    next(e);
  }
});

/**
 * 트윗 수정
 */
tweetsController.patch("/:tweetId", userOnly, async (req, res, next) => {
  try {
    const { content } = req.body;
    const authorId = req.user!.id;
    const tweetId = Number(req.params.tweetId);
    const updateTweetData: UpdateTweetData = {
      content,
      authorId,
      tweetId,
    };
    const tweet = await tweetsService.updateTweet(updateTweetData);

    res.json(tweet);
  } catch (e) {
    next(e);
  }
});

/**
 * 트윗 삭제
 */
tweetsController.delete("/:tweetId", userOnly, async (req, res, next) => {
  try {
    const authorId = req.user!.id;
    const tweetId = Number(req.params.tweetId);
    const deleteTweetData: DeleteTweetData = {
      authorId,
      tweetId,
    };
    const tweet = await tweetsService.deleteTweet(deleteTweetData);

    res.json(tweet);
  } catch (e) {
    next(e);
  }
});

export default tweetsController;
