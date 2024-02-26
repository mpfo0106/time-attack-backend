export type CreateTweetData = {
  content: string;
  authorId: string;
};

export type UpdateTweetData = {
  content: string;
  authorId: string;
  tweetId: number;
};

export type DeleteTweetData = {
  authorId: string;
  tweetId: number;
};
