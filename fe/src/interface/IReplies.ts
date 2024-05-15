export type IReply = {
  id: number;
  user: {
    profile_picture: string;
    full_name: string;
    username: string;
  };
  created_at: string;
  content: string;
  image?: string;
  likes_count: number;
  replies_count: number;
};

export interface IReplies {
  data: IReply[];
}

export type IReplyPost = {
  content: string;
  image: string | null | File;
  thread_id: number;
};
