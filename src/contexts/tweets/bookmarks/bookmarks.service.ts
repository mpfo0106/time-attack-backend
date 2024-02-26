import prismaClient from "../../../db/prisma/client.prisma";

const getBookmarks = async (authorId: string) => {
  const user = await prismaClient.user.findUnique({
    where: { id: authorId },
    select: { bookMarks: { select: { post: true } } },
  });

  if (!user) throw new Error("No User");

  const bookmarks = user.bookMarks.map((bookmark) => bookmark.post);

  return bookmarks;
};

const updateBookmark = async (authorId: string, tweetId: number) => {
  if (!tweetId) throw new Error("No TweetId");

  const post = await prismaClient.post.findUnique({
    where: { id: tweetId },
  });

  if (!post) throw new Error("There is No post");

  const bookmark = await prismaClient.bookMark.upsert({
    where: {
      userId_postId: { userId: authorId, postId: tweetId },
    },
    update: {},
    create: {
      userId: authorId,
      postId: tweetId,
    },
  });
  return bookmark;
};

const deleteBookmark = async (authorId: string, tweetId: number) => {
  if (!tweetId) throw new Error("No TweetId");

  const post = await prismaClient.post.findUnique({
    where: { id: tweetId },
  });

  if (!post) throw new Error("There is No post");

  const bookmark = await prismaClient.bookMark.delete({
    where: {
      userId_postId: { userId: authorId, postId: tweetId },
    },
  });

  return bookmark;
};

const bookmarksService = {
  getBookmarks,
  updateBookmark,
  deleteBookmark,
};
export default bookmarksService;
