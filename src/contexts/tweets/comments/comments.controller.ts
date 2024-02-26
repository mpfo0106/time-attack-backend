import { Router } from "express";
import userOnly from "../../../guards/userOnly.guard";

import commentsService from "./comments.service";
import {
  CreateCommentData,
  DeleteCommentData,
  UpdateCommentData,
} from "./comments.type";

const commentsController = Router();

/**
 * 댓글 생성
 */

commentsController.post(
  "/:tweetId/comments",
  userOnly,
  async (req, res, next) => {
    try {
      const { content } = req.body;
      const authorId = req.user!.id;
      const tweetId = Number(req.params.tweetId);
      const createCommentData: CreateCommentData = {
        content,
        authorId,
        tweetId,
      };
      const tweet = await commentsService.createComment(createCommentData);

      res.json(tweet);
    } catch (e) {
      next(e);
    }
  }
);

/**
 * 댓글 수정
 */
commentsController.patch(
  "/:tweetId/comments/:commentId",
  userOnly,
  async (req, res, next) => {
    try {
      const { content } = req.body;
      const authorId = req.user!.id;
      const tweetId = Number(req.params.tweetId);
      const commentId = Number(req.params.commentId);
      const updateCommentData: UpdateCommentData = {
        content,
        authorId,
        tweetId,
        commentId,
      };
      const tweet = await commentsService.updateComment(updateCommentData);

      res.json(tweet);
    } catch (e) {
      next(e);
    }
  }
);

/**
 * 댓글 삭제
 */
commentsController.delete(
  "/:tweetId/comments/:commentId",
  userOnly,
  async (req, res, next) => {
    try {
      const authorId = req.user!.id;
      const tweetId = Number(req.params.tweetId);
      const commentId = Number(req.params.commentId);
      const deleteCommentData: DeleteCommentData = {
        authorId,
        tweetId,
        commentId,
      };
      const tweet = await commentsService.deleteComment(deleteCommentData);

      res.json(tweet);
    } catch (e) {
      next(e);
    }
  }
);

export default commentsController;
