import React, { useState } from 'react';

interface FeedbackFormProps {
  onSubmit: (data: { rating: number; comment: string }) => void;
}

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (comment.trim().length < 10) {
      setError('Comment must be at least 10 characters long');
      return;
    }

    setError('');
    setSubmitted(true);
    onSubmit({ rating, comment });
  };

  if (submitted) {
    return (
      <div className="p-4 bg-emerald-50 text-emerald-800 rounded border border-emerald-200" data-testid="success-container">
        <h3 className="font-bold text-lg">Thank you for your feedback!</h3>
        <p className="text-sm">We appreciate your support.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-sm border border-slate-200 max-w-md">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Submit Feedback</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-rose-50 text-rose-800 text-sm rounded border border-rose-200" role="alert">
          {error}
        </div>
      )}

      {/* Rating Selection */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition-all ${
                rating === star
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
              aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            >
              {star}
            </button>
          ))}
        </div>
      </div>

      {/* Comment Field */}
      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-semibold text-slate-700 mb-2">Comment</label>
        <textarea
          id="comment"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us what you think (minimum 10 characters)..."
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={rating === 0}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm shadow-sm"
      >
        Submit Feedback
      </button>
    </form>
  );
}
