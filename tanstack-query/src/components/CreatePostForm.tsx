import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/posts";
import { Loader2, Plus, Send } from "lucide-react";
import { useToast } from "./Toast";

export function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      setTitle("");
      setBody("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      showToast("Post created successfully!", "success");
    },
    onError: (err) => {
      showToast(`Error: ${err.message}`, "error");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;
    mutate({ userId: 1, title, body });
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-10 transition-shadow hover:shadow-md ring-1 ring-slate-900/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500" />
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-violet-50 rounded-xl text-violet-600 ring-1 ring-violet-100">
          <Plus className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Create New Post</h3>
          <p className="text-sm text-slate-500">
            Share your thoughts with the world
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-slate-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900"
            placeholder="What's on your mind?"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="body"
            className="block text-sm font-semibold text-slate-700"
          >
            Content
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all placeholder:text-slate-400 resize-none font-medium text-slate-900"
            placeholder="Share deeper details..."
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isPending || !title || !body}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-violet-500/30 focus:ring-4 focus:ring-violet-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all flex items-center justify-center gap-2 transform active:scale-[0.98]"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            {isPending ? "Publishing..." : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
