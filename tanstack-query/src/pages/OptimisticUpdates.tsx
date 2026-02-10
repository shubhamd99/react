import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts, updatePost, type Post } from "../api/posts";
import { Loader2, Heart, AlertCircle } from "lucide-react";
import { cn } from "../utils/cn";
import { PostCard } from "../components/PostCard";

export function OptimisticUpdates() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", "optimistic"],
    queryFn: () => getPosts(1, 10),
  });

  const toggleLikeMutation = useMutation({
    mutationFn: (post: Post) => updatePost({ ...post, liked: !post.liked }),
    // When mutate is called:
    onMutate: async (newPost: Post) => {
      // 1. Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["posts", "optimistic"] });

      // 2. Snapshot the previous value
      const previousPosts = queryClient.getQueryData<Post[]>([
        "posts",
        "optimistic",
      ]);

      // 3. Optimistically update to the new value
      if (previousPosts) {
        queryClient.setQueryData<Post[]>(
          ["posts", "optimistic"],
          (old: Post[] | undefined) => {
            return old?.map((post) =>
              post.id === newPost.id ? { ...post, liked: !post.liked } : post,
            );
          },
        );
      }

      // 4. Return a context object with the snapshotted value
      return { previousPosts };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (
      _err: Error,
      _newPost: Post,
      context: { previousPosts: Post[] | undefined } | undefined,
    ) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(
          ["posts", "optimistic"],
          context.previousPosts,
        );
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "optimistic"] });
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 pb-6 border-b border-gray-200/60">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
          Optimistic Updates
        </h2>
        <p className="text-lg text-slate-600">
          Click the heart. The UI updates{" "}
          <span className="font-bold text-blue-600">instantly</span> before the
          server responds. This "local-first" feel effectively keeps the UI
          snappy even on slow networks.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        </div>
      ) : isError ? (
        <div className="text-red-500 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" /> {(error as Error).message}
        </div>
      ) : (
        <div className="grid gap-4">
          {data?.map((post: Post) => (
            <PostCard
              key={post.id}
              post={post}
              highlight={post.liked}
              actions={
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => toggleLikeMutation.mutate(post)}
                    className={cn(
                      "p-3 rounded-full transition-all duration-300 active:scale-90 hover:scale-110 shadow-sm",
                      post.liked
                        ? "text-red-500 bg-red-50 ring-2 ring-red-100 shadow-red-100"
                        : "text-gray-400 bg-gray-50 hover:bg-gray-100 ring-1 ring-gray-200",
                    )}
                    title={post.liked ? "Unlike" : "Like"}
                  >
                    <Heart
                      className={cn(
                        "w-6 h-6 transition-all duration-300",
                        post.liked && "fill-current scale-110",
                      )}
                    />
                  </button>
                  {post.liked && (
                    <span className="text-[10px] uppercase tracking-wider font-bold text-red-500 animate-in fade-in slide-in-from-bottom-1">
                      Optimistic
                    </span>
                  )}
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
