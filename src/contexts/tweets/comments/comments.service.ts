import prismaClient from "../../../db/prisma/client.prisma";
import {
  CreateCommentData,
  DeleteCommentData,
  UpdateCommentData,
} from "./comments.type";

const createComment = async (createCommentData: CreateCommentData) => {
  const { content, authorId, tweetId } = createCommentData;

  if (!content) throw new Error("No content");

  const tweet = await prismaClient.post.findUnique({
    where: {
      id: tweetId,
    },
  });

  if (!tweet) throw new Error("There is No Tweet");

  const comment = await prismaClient.comment.create({
    data: {
      content,
      postId: tweetId,
      authorId,
    },
  });

  return comment;
};

const updateComment = async (updateCommentData: UpdateCommentData) => {
  const { content, authorId, tweetId, commentId } = updateCommentData;

  if (!content) throw new Error("No content");
  if (!tweetId) throw new Error("No TweetId");

  const comment = await prismaClient.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) throw new Error("There is No comment");
  if (comment.authorId !== authorId) throw new Error("Not correct User");

  const updatedComment = await prismaClient.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content,
    },
  });

  return updatedComment;
};

const deleteComment = async (deleteCommentData: DeleteCommentData) => {
  const { authorId, tweetId, commentId } = deleteCommentData;

  if (!tweetId) throw new Error("No TweetId");

  const comment = await prismaClient.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) throw new Error("There is No comment");
  if (comment.authorId !== authorId) throw new Error("Not correct User");

  const deletedComment = await prismaClient.comment.delete({
    where: {
      id: commentId,
    },
  });

  return deletedComment;
};

const commentsService = {
  createComment,
  updateComment,
  deleteComment,
};

export default commentsService;
