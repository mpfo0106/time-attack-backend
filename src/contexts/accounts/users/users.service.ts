import { User } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { nanoid } from "nanoid";
import validator from "validator";
import { JWT_SECRET_KEY } from "../../../config/env.config";
import prismaClient from "../../../db/prisma/client.prisma";
import { LogInData, SignUpData } from "./users.type";

const signUp = async (signUpData: SignUpData) => {
  const id = nanoid();
  const { email, password } = signUpData;
  if (!validator.isEmail(email))
    throw new Error("Email is not formatted correctly");
  if (password.trim().length < 8) throw new Error("password is too short");

  const encryptedPassword = await hash(password, 12);
  const user = await prismaClient.user.create({
    data: { id, email, encryptedPassword },
  });

  const accessToken = generateAccessToken(user);

  return { ...user, accessToken };
};

const logIn = async (logInData: LogInData) => {
  const { email, password } = logInData;
  const user = await prismaClient.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error("No User");

  const isCorrect = await compare(password, user.encryptedPassword);
  if (!isCorrect) throw new Error("Invalid Password");

  const accessToken = generateAccessToken(user);

  return accessToken;
};

const generateAccessToken = (user: User) => {
  const { email } = user;
  const accessToken = sign({ email }, JWT_SECRET_KEY, {
    subject: user.id,
    expiresIn: "2h",
  });

  return accessToken;
};

const usersService = {
  signUp,
  logIn,
};

export default usersService;
