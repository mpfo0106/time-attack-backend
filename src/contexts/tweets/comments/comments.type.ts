export type CreateCommentData = {
  content: string;
  authorId: string;
  tweetId: number;
};

export type UpdateCommentData = {
  content: string;
  authorId: string;
  tweetId: number;
  commentId: number;
};

export type DeleteCommentData = {
  authorId: string;
  tweetId: number;
  commentId: number;
};
