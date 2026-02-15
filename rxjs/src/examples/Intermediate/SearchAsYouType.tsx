import React, { useState, useEffect, useRef } from "react";
import { Subject, of } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  tap,
} from "rxjs/operators";
import { Search, Loader2, AlertCircle } from "lucide-react";

const SearchAsYouType: React.FC = () => {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchSubject$ = useRef(new Subject<string>());

  useEffect(() => {
    const subscription = searchSubject$.current
      .pipe(
        tap(() => {
          setLoading(true);
          setError(null);
        }),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query) => {
          if (!query.trim()) return of([]);

          // Mock API Call
          return of([
            "Result for " + query,
            "Similar to " + query,
            query + " extra",
          ]).pipe(
            // Simulate latency
            tap(() => console.log("Searching for:", query)),
            catchError(() => {
              setError("Search failed. Please try again.");
              return of([]);
            }),
          );
        }),
      )
      .subscribe((res) => {
        setResults(res);
        setLoading(false);
      });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-xl font-bold mb-2">Search with switchMap</h3>
        <p className="text-slate-400 mb-6">
          This example uses <code>debounceTime</code> to wait for the user to
          stop typing,
          <code>distinctUntilChanged</code> to avoid duplicate searches, and
          <code>switchMap</code> to cancel previous pending requests when a new
          search starts.
        </p>

        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-500" />
          </div>
          <input
            type="text"
            onChange={(e) => searchSubject$.current.next(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 bg-slate-900 border border-slate-700 rounded-xl leading-5 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 sm:text-sm"
            placeholder="Search for something (e.g. 'react', 'rxjs')..."
          />
          {loading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <Loader2 className="h-5 w-5 text-fuchsia-500 animate-spin" />
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 mb-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-3">
          {results.length > 0 ? (
            results.map((res, i) => (
              <div
                key={i}
                className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-fuchsia-500/50 transition-colors"
              >
                {res}
              </div>
            ))
          ) : !loading ? (
            <div className="text-center py-12 text-slate-600 italic">
              Type something to see RxJS in action...
            </div>
          ) : null}
        </div>
      </div>

      <div className="card">
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          The Magic Pipe
        </h4>
        <pre className="text-sm">
          {`searchSubject$.pipe(
  debounceTime(500),         // Wait for pause
  distinctUntilChanged(),   // Only if query changed
  switchMap(query => {      // Switch to new observable
    return fetchResults(query); // Automatically cancels previous!
  })
).subscribe(results => setResults(results));`}
        </pre>
      </div>
    </div>
  );
};

export default SearchAsYouType;
