import prismaClient from "../../../../db/prisma/client.prisma";
import { UpdateUsersProfile } from "./usersProfile.type";

const updateUserProfile = (updateUsersProfile: UpdateUsersProfile) => {
  const { userId, nickname, oneLiner } = updateUsersProfile;

  const user = prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) throw new Error("There is no User");
  if (!oneLiner.trim()) throw new Error("There is no oneLiner");

  try {
    const profile = prismaClient.userProfile.upsert({
      where: { userId },
      update: { nickname, oneLiner },
      create: { userId, nickname, oneLiner },
    });
    return profile;
  } catch (e) {
    throw new Error("duplicate Nickname");
  }
};

const getUserProfile = (userId: string) => {
  const profile = prismaClient.userProfile.findUnique({
    where: { userId },
    include: {
      user: {
        // include: { writtenPosts: true, followers: true, following: true },
        include: {
          writtenPosts: true,
          _count: { select: { followers: true, following: true } },
        },
      },
    },
  });
  return profile;
};

const profileService = {
  updateUserProfile,
  getUserProfile,
};
export default profileService;
