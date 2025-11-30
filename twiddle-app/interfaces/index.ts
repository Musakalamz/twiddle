export interface CreateUserParams {
  userId: string;
  email: string;
  username: string;
  name: string;
  image: string;
}

export interface updateUserParams {
  userId: string;
  email?: string;
  username?: string;
  name?: string;
  bio?: string;
  image?: string;
  path?: string;
}

export interface createGroupParams {
  id: string;
  name: string;
  username: string;
  image: string;
  createdById: string;
}

export interface TweetParams {
  text: string;
  author: string;
  path: string;
  retweetOf?: string;
  groupId: string | null;
}

export interface RetweetParams {
  userId: string;
  tweetId: string;
  path: string;
  groupId: string | null;
}

export interface TweetCardProps {
  id: string;
  currentUserId: string;
  DB_userID: string;
  owner?: boolean;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  group: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    _id?: string;
    author: {
      id: string;
      image: string;
    };
  }[];
  retweetOf?: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    group: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    };
  } | null;
  isComment?: boolean;
  likes: number;
  liked: boolean;
}

export interface TweetsTabProps {
  currentUserId: string;
  accountId: string;
  accountType: string;
  user: {
    id: string;
  };
}

export interface TweetsTabResult {
  name: string;
  image: string;
  id: string;
  tweets: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    group: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        id: string;
        image: string;
      };
    }[];
    retweetOf?: {
      _id: string;
      text: string;
      parentId: string | null;
      author: {
        name: string;
        image: string;
        id: string;
      };
      group: {
        id: string;
        name: string;
        image: string;
      } | null;
      createdAt: string;
      children: {
        author: {
          id: string;
          image: string;
        };
      };
    } | null;
    likes: number;
  }[];
}

export interface RepliesTabProps {
  currentUserId: string;
  accountId: string;
  user: {
    id: string;
  };
}

export interface RepliesTabResult {
  name: string;
  image: string;
  id: string;
  replies: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    group: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        id: string;
        image: string;
      };
    }[];
    likes: number;
  }[];
}

export interface CommentProps {
  tweetId: string;
  currentUserImg: string;
  currentUserId: string;
}

export interface PostTweetProps {
  userId: string;
}

export interface AccountInfoProps {
  user: {
    id: string;
    bio: string;
  };
}

export interface ProfileHeaderProps {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: "User" | "Group";
}

export interface SearchBarProps {
  routeType: string;
}

export interface RetweetButtonProps {
  tweetId: string;
  userId: string;
  groupId: string | null;
  retweeted: boolean;
}

export interface TweetLikeButtonProps {
  tweetId: string;
  currentUserId: string;
  likes: number;
  liked: boolean;
}

export interface ShareTweetButtonProps {
  tweetPath: string;
}

export interface PaginationProps {
  pageNumber: number;
  isNext: boolean;
  path: string;
}

export interface DeleteTweetButtonProps {
  userId: string;
  tweetId: string;
}

export interface GroupCardProps {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  members: {
    image: string;
  }[];
}

export interface UserCardProps {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
}
