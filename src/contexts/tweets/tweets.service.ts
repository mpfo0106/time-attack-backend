import prismaClient from "../../db/prisma/client.prisma";
import {
  CreateTweetData,
  DeleteTweetData,
  UpdateTweetData,
} from "./tweets.type";

const getTweets = async () => {
  const tweets = await prismaClient.post.findMany({
    include: { comments: true },
  });

  return tweets;
};

const createTweet = async (createTweetData: CreateTweetData) => {
  const { content, authorId } = createTweetData;

  if (!content) throw new Error("No content");

  const tweet = await prismaClient.post.create({
    data: {
      content,
      authorId,
    },
  });

  return tweet;
};

const updateTweet = async (updateTweetData: UpdateTweetData) => {
  const { content, authorId, tweetId } = updateTweetData;

  if (!content) throw new Error("No content");
  if (!tweetId) throw new Error("No TweetId");

  const post = await prismaClient.post.findUnique({
    where: { id: tweetId },
  });

  if (!post) throw new Error("There is No post");
  if (post.authorId !== authorId) throw new Error("Not correct User");

  const tweet = await prismaClient.post.update({
    where: {
      id: tweetId,
    },
    data: {
      content,
    },
  });
  return tweet;
};

const deleteTweet = async (deleteTweetData: DeleteTweetData) => {
  const { authorId, tweetId } = deleteTweetData;

  if (!tweetId) throw new Error("No TweetId");

  const post = await prismaClient.post.findUnique({
    where: { id: tweetId },
  });

  if (!post) throw new Error("There is No post");
  if (post.authorId !== authorId) throw new Error("Not correct User");

  const tweet = await prismaClient.post.delete({
    where: {
      id: tweetId,
    },
  });

  return tweet;
};

const tweetsService = {
  getTweets,
  createTweet,
  updateTweet,
  deleteTweet,
};
export default tweetsService;
