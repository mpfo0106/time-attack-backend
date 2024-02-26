import { Router } from "express";
import userOnly from "../../../../guards/userOnly.guard";
import followsService from "./follows.service";

const followsController = Router();
/**
 * 팔로우하기
 */
followsController.post(
  "/followings/:userId",
  userOnly,
  async (req, res, next) => {
    try {
      const followerId = req.user!.id;
      const userId = req.params.userId;

      const following = await followsService.following(followerId, userId);
      res.send(following);
    } catch (e) {
      next(e);
    }
  }
);

/**
 * 팔로우 취소
 */
followsController.delete(
  "/followings/:userId",
  userOnly,
  async (req, res, next) => {
    try {
      const followerId = req.user!.id;
      const userId = req.params.userId;

      const deleteFollowing = await followsService.unFollow(followerId, userId);

      res.send(deleteFollowing);
    } catch (e) {
      next(e);
    }
  }
);

/**
 * 나를 팔로우 하는 유저 팔로우 취소
 */
followsController.delete(
  "/followers/:userId",
  userOnly,
  async (req, res, next) => {
    try {
      const myId = req.user!.id;
      const userId = req.params.userId;

      const unFollowFollowing = await followsService.unFollow(myId, userId);

      res.send(unFollowFollowing);
    } catch (e) {
      next(e);
    }
  }
);

export default followsController;
