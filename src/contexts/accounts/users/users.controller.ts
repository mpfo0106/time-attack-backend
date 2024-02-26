import { Router } from "express";
import usersService from "./users.service";
import profileService from "./usersProfile/usersProfile.service";

const usersController = Router();

/**
 * SignUp
 */

usersController.post("/sign-up", async (req, res, next) => {
  try {
    const { email, password, nickname, oneLiner } = req.body;
    const user = await usersService.signUp({
      email,
      password,
    });

    const profile = await profileService.updateUserProfile({
      userId: user.id,
      nickname,
      oneLiner,
    });

    res.json(user.accessToken);
  } catch (e) {
    next(e);
  }
});

/**
 * LogIn
 */
usersController.post<
  "/log-in",
  never,
  { accessToken: string },
  { email: string; password: string }
>("/log-in", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const accessToken = await usersService.logIn({ email, password });

    res.json({ accessToken });
  } catch (e) {
    next(e);
  }
});

export default usersController;
