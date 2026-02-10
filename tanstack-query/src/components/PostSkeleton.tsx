import { cn } from "../utils/cn";

interface PostSkeletonProps {
  className?: string;
}

export function PostSkeleton({ className }: PostSkeletonProps) {
  return (
    <div
      className={cn(
        "bg-white p-6 rounded-xl border border-gray-100 shadow-sm animate-pulse",
        className,
      )}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-5 w-12 bg-gray-200 rounded-full" />
          </div>
          <div className="h-6 w-3/4 bg-gray-200 rounded-lg mb-3" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-100 rounded-lg" />
            <div className="h-4 w-5/6 bg-gray-100 rounded-lg" />
            <div className="h-4 w-4/6 bg-gray-100 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
