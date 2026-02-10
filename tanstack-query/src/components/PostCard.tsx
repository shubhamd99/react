import { type Post } from "../api/posts";
import { cn } from "../utils/cn";

interface PostCardProps {
  post: Post;
  className?: string;
  actions?: React.ReactNode;
  highlight?: boolean;
}

export function PostCard({
  post,
  className,
  actions,
  highlight,
}: PostCardProps) {
  return (
    <div
      className={cn(
        "bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md hover:border-blue-100 group",
        highlight && "border-blue-200 bg-blue-50/30",
        className,
      )}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
              #{post.id}
            </span>
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-2 leading-tight capitalize group-hover:text-blue-700 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {post.body}
          </p>
        </div>
        {actions && <div className="flex-shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
