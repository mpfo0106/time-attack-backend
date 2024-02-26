import prismaClient from "../../../../db/prisma/client.prisma";

const getUserFollowings = (userId: string) => {
  if (!userId) throw new Error("No userId");
  const following = prismaClient.user.findUnique({
    where: { id: userId },
    select: { following: true },
  });
  //   const profile = following.profile;

  //   return { ...following, profile };
  return following;
};

const getUserFollwers = (userId: string) => {
  if (!userId) throw new Error("No userId");
  const followers = prismaClient.user.findUnique({
    where: { id: userId },
    include: { profile: true, followers: true },
  });

  return followers;
};

const following = async (followerId: string, userId: string) => {
  if (followerId === userId) throw new Error("can't follow  myself");

  const isFollowing = await prismaClient.follows.findUnique({
    where: { followerId_followingId: { followerId, followingId: userId } },
  });

  if (isFollowing) {
    throw new Error("User has already been followed");
  } else {
    await prismaClient.follows.create({
      data: { followerId, followingId: userId },
    });
    return true;
  }
};

const unfollow = async (followerId: string, userId: string) => {
  if (followerId === userId) throw new Error("can't  unFollow myself");

  const isFollowing = await prismaClient.follows.findUnique({
    where: { followerId_followingId: { followerId, followingId: userId } },
  });

  if (isFollowing) {
    await prismaClient.follows.delete({
      where: { followerId_followingId: { followerId, followingId: userId } },
    });
    return true;
  } else {
    throw new Error("User has already been unfollowed");
  }
};

const followsService = {
  getUserFollowings,
  getUserFollwers,
  following,
  unFollow: unfollow,
  //   unFollowFollowing,
};

export default followsService;
