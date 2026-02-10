import { useQuery } from "@tanstack/react-query";
import { getPosts, type Post } from "../api/posts";
import { PostCard } from "../components/PostCard";
import { PostSkeleton } from "../components/PostSkeleton";
import { AlertCircle } from "lucide-react";

export function BasicQuery() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", "basic"],
    queryFn: () => getPosts(),
  });

  if (isError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <span>Error: {(error as Error).message}</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 pb-6 border-b border-gray-200/60">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
          Basic Query Example
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl">
          This example demonstrates a simple <code>useQuery</code> hook.
          Navigate away and come back to to observe{" "}
          <span className="font-bold text-violet-600">instant caching</span> in
          action.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <PostSkeleton key={i} />)
          : data?.map((post: Post) => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}
