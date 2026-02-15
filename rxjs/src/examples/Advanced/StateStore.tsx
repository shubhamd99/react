import React, { useEffect, useState } from "react";
import { BehaviorSubject, map, distinctUntilChanged } from "rxjs";
import { Plus, Minus, RotateCcw } from "lucide-react";

// 1. Initial State
interface AppState {
  count: number;
  user: { name: string; role: string } | null;
  settings: { theme: "light" | "dark" };
}

const initialState: AppState = {
  count: 0,
  user: { name: "RxJS Learner", role: "Student" },
  settings: { theme: "dark" },
};

// 2. The Store
class Store {
  private state$ = new BehaviorSubject<AppState>(initialState);

  // Selector
  select<K extends keyof AppState>(key: K) {
    return this.state$.asObservable().pipe(
      map((state) => state[key]),
      distinctUntilChanged(),
    );
  }

  // Update
  update(patch: Partial<AppState>) {
    this.state$.next({ ...this.state$.value, ...patch });
  }

  reset() {
    this.state$.next(initialState);
  }
}

const store = new Store();

const StateStore: React.FC = () => {
  const [count, setCount] = useState(initialState.count);
  const [user, setUser] = useState(initialState.user);

  useEffect(() => {
    const countSub = store.select("count").subscribe(setCount);
    const userSub = store.select("user").subscribe(setUser);

    return () => {
      countSub.unsubscribe();
      userSub.unsubscribe();
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-xl font-bold mb-2">Enterprise State Pattern</h3>
        <p className="text-slate-400 mb-6">
          This pattern mimics Redux or Pinia using RxJS. It uses{" "}
          <code>distinctUntilChanged</code> to ensure components only re-render
          when their specific slice of state actually changes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 flex flex-col items-center">
            <h4 className="text-sm font-bold text-slate-500 uppercase mb-4">
              Store Counter
            </h4>
            <div className="text-5xl font-black text-cyan-400 mb-6">
              {count}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => store.update({ count: count - 1 })}
                className="btn bg-slate-800 p-2 hover:bg-slate-700"
              >
                <Minus size={20} />
              </button>
              <button
                onClick={() => store.update({ count: count + 1 })}
                className="btn bg-slate-800 p-2 hover:bg-slate-700"
              >
                <Plus size={20} />
              </button>
              <button
                onClick={() => store.reset()}
                className="btn bg-slate-800 p-2 hover:bg-slate-700"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>

          <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800">
            <h4 className="text-sm font-bold text-slate-500 uppercase mb-4">
              User Metadata
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-500">Name</span>
                <span className="font-semibold text-fuchsia-400">
                  {user?.name}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-500">Role</span>
                <span className="font-semibold text-fuchsia-400">
                  {user?.role}
                </span>
              </div>
              <button
                onClick={() =>
                  store.update({
                    user: { name: "Advanced User", role: "Architect" },
                  })
                }
                className="w-full btn btn-primary justify-center text-xs"
              >
                Promote User
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Selector Logic
        </h4>
        <pre className="text-sm">
          {`select(key) {
  return this.state$.pipe(
    map(state => state[key]),
    distinctUntilChanged() // ONLY emit if value changed
  );
}`}
        </pre>
      </div>
    </div>
  );
};

export default StateStore;
