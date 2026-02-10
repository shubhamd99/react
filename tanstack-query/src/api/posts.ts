import { api } from "./axios";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  liked?: boolean;
}

export const getPosts = async (page = 1, limit = 10) => {
  const { data } = await api.get<Post[]>("/posts", {
    params: {
      _page: page,
      _limit: limit,
    },
  });
  return data;
};

export const getPost = async (id: number) => {
  const { data } = await api.get<Post>(`/posts/${id}`);
  return data;
};

export const getInfinitePosts = async ({
  pageParam = 1,
}: {
  pageParam?: number;
}) => {
  const { data } = await api.get<Post[]>("/posts", {
    params: { _page: pageParam, _limit: 10 },
  });
  return {
    data,
    nextCursor: data.length === 10 ? pageParam + 1 : undefined,
  };
};

export const createPost = async (newPost: Omit<Post, "id">) => {
  const { data } = await api.post<Post>("/posts", newPost);
  return data;
};

export const updatePost = async (post: Post) => {
  const { data } = await api.put<Post>(`/posts/${post.id}`, post);
  return data;
};

export const deletePost = async (id: number) => {
  await api.delete(`/posts/${id}`);
  return id;
};
