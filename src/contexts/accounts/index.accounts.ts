import { Router } from "express";
import usersController from "./users/users.controller";
import profileController from "./users/usersProfile/usersProfile.controllet";

const accountRouter = Router();

accountRouter.use("/", usersController);
accountRouter.use("/", profileController);

export default accountRouter;
