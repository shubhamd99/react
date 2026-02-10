import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts, deletePost, type Post } from "../api/posts";
import { CreatePostForm } from "../components/CreatePostForm";
import { PostCard } from "../components/PostCard";
import { PostSkeleton } from "../components/PostSkeleton";
import { Loader2, Trash2, AlertCircle } from "lucide-react";
import { useToast } from "../components/Toast";

export function Mutations() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"], // Shared key with other components
    queryFn: () => getPosts(1, 10),
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      showToast("Post deleted successfully", "info");
    },
    onError: (err) => {
      showToast(`Failed to delete post: ${err.message}`, "error");
    },
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 pb-6 border-b border-gray-200/60">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
          Mutations
        </h2>
        <p className="text-lg text-slate-600">
          Create via form, Delete via list. The list auto-refreshes using{" "}
          <code>invalidateQueries</code>.
        </p>
      </div>

      <CreatePostForm />

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <div className="w-1 h-6 bg-violet-500 rounded-full" />
          Recent Posts
        </h3>

        {isLoading ? (
          <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <PostSkeleton key={i} />
            ))}
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
                actions={
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={deleteMutation.isPending}
                    className="p-2.5 text-slate-400 bg-slate-50 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all disabled:opacity-50 ring-1 ring-slate-200 hover:ring-red-100"
                    title="Delete Post"
                  >
                    {deleteMutation.isPending &&
                    deleteMutation.variables === post.id ? (
                      <Loader2 className="w-5 h-5 animate-spin text-red-600" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
