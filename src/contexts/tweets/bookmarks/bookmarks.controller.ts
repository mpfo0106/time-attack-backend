import { Router } from "express";
import userOnly from "../../../guards/userOnly.guard";
import bookmarksService from "./bookmarks.service";

const bookmarksController = Router();

/**
 *  내 북마크 조회
 */
bookmarksController.get("/bookmarks", userOnly, async (req, res, next) => {
  try {
    const userId = req.user!.id;

    const bookmarks = await bookmarksService.getBookmarks(userId);

    res.json(bookmarks);
  } catch (e) {
    next(e);
  }
});

/**
 * 북마크 저장
 */
bookmarksController.put(
  "/tweets/:tweetId/bookmarks",
  userOnly,
  async (req, res, next) => {
    try {
      const tweetId = Number(req.params.tweetId);
      const authorId = req.user!.id;

      const bookmark = await bookmarksService.updateBookmark(authorId, tweetId);

      res.json(bookmark);
    } catch (e) {
      next(e);
    }
  }
);

/**
 * 북마크 취소
 */
bookmarksController.delete(
  "/tweets/:tweetId/bookmarks",
  userOnly,
  async (req, res, next) => {
    try {
      const authorId = req.user!.id;
      const tweetId = Number(req.params.tweetId);

      const bookmark = await bookmarksService.deleteBookmark(authorId, tweetId);

      res.json(bookmark);
    } catch (e) {
      next(e);
    }
  }
);

export default bookmarksController;
