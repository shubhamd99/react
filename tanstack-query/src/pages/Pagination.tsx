import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getPosts, type Post } from "../api/posts";
import { PostCard } from "../components/PostCard";
import { PostSkeleton } from "../components/PostSkeleton";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, isPlaceholderData, isFetching } =
    useQuery({
      queryKey: ["posts", "pagination", page],
      queryFn: () => getPosts(page, 5), // Fetch 5 items per page
      placeholderData: keepPreviousData,
    });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 pb-6 border-b border-gray-200/60">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
          Pagination
        </h2>
        <p className="text-lg text-slate-600">
          Using{" "}
          <code className="text-violet-600 font-bold">keepPreviousData</code> to
          prevents layout thrashing. Notice how the list remains visible while
          the next page fetches.
        </p>
      </div>

      {isError ? (
        <div className="text-red-500 font-medium">
          Error: {(error as Error).message}
        </div>
      ) : (
        <div className="grid gap-4">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <PostSkeleton key={i} />)
            : data?.map((post: Post) => <PostCard key={post.id} post={post} />)}
        </div>
      )}

      <div className="sticky bottom-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 flex items-center justify-between z-10 max-w-3xl mx-auto ring-1 ring-slate-900/5">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Page
          </span>
          <span className="w-10 h-10 flex items-center justify-center bg-violet-50 text-violet-700 rounded-xl font-bold border border-violet-100 shadow-sm">
            {page}
          </span>
          {isFetching ? (
            <span className="text-violet-500 text-xs font-semibold animate-pulse flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" /> Updating...
            </span>
          ) : null}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <button
            onClick={() => {
              if (!isPlaceholderData && data?.length === 5) {
                setPage((old) => old + 1);
              }
            }}
            disabled={isPlaceholderData || (data?.length || 0) < 5}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl hover:shadow-lg hover:shadow-violet-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
