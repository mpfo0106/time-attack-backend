import { Router } from "express";
import userOnly from "../../../../guards/userOnly.guard";
import followsService from "../follows/follows.service";
import profileService from "./usersProfile.service";

const profileController = Router();

/**
 * Profile Update
 */
profileController.put("/", userOnly, async (req, res, next) => {
  try {
    const { nickname, oneLiner } = req.body;
    const userId = req.user!.id;
    const profile = await profileService.updateUserProfile({
      userId,
      nickname,
      oneLiner,
    });

    res.json(profile);
  } catch (e) {
    next(e);
  }
});

/**
 * 프로필 조회
 */
profileController.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const profile = await profileService.getUserProfile(userId);

    res.json(profile);
  } catch (e) {
    next(e);
  }
});

/**
 * 팔로잉 조회
 */
profileController.get("/:userId/followings", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const followings = await followsService.getUserFollowings(userId);

    res.json(followings);
  } catch (e) {
    next(e);
  }
});

/**
 * 팔로워 조회
 */
profileController.get("/:userId/follwers", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const follwers = await followsService.getUserFollwers(userId);

    res.json(follwers);
  } catch (e) {
    next(e);
  }
});

export default profileController;
