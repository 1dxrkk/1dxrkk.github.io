export interface Reply {
  id: string;
  text: string;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  liked: boolean;
  disliked: boolean;
  favorite: boolean;
  replies: Reply[];
}

