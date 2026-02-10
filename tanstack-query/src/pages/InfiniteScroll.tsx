import { useEffect, Fragment } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getInfinitePosts, type Post } from "../api/posts";
import { Loader2, AlertCircle } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { PostCard } from "../components/PostCard";
import { PostSkeleton } from "../components/PostSkeleton";

export function InfiniteScroll() {
  const { ref, inView } = useInView();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", "infinite"],
    queryFn: ({ pageParam }) =>
      getInfinitePosts({ pageParam: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 pb-6 border-b border-gray-200/60">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
          Infinite Scroll
        </h2>
        <p className="text-lg text-slate-600">
          This example uses{" "}
          <code className="text-violet-600 font-bold">useInfiniteQuery</code>{" "}
          and{" "}
          <code className="text-violet-600 font-bold">
            IntersectionObserver
          </code>{" "}
          to automatically load more data as you scroll down.
        </p>
      </div>

      {status === "pending" ? (
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      ) : status === "error" ? (
        <div className="text-red-500 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" /> {(error as Error).message}
        </div>
      ) : (
        <div className="space-y-6">
          {data.pages.map((group, i) => (
            <Fragment key={i}>
              {group.data.map((post: Post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </Fragment>
          ))}

          <div ref={ref} className="flex justify-center py-8">
            {isFetchingNextPage ? (
              <div className="flex flex-col items-center gap-2 text-violet-600">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="font-medium">Loading more posts...</span>
              </div>
            ) : hasNextPage ? (
              <span className="text-slate-400 text-sm font-medium">
                Scroll for more
              </span>
            ) : (
              <div className="px-4 py-2 bg-slate-100 text-slate-500 rounded-full text-sm font-medium">
                You've reached the end
              </div>
            )}
          </div>
        </div>
      )}

      {/* Background fetching indicator */}
      <div className="fixed bottom-6 right-6 z-50">
        {isFetching && !isFetchingNextPage ? (
          <div className="bg-violet-600 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg shadow-violet-500/30 flex items-center gap-2 animate-in slide-in-from-bottom-5">
            <Loader2 className="w-4 h-4 animate-spin" /> Updating...
          </div>
        ) : null}
      </div>
    </div>
  );
}
