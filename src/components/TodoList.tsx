import { useTodos } from '../hooks/useTodos';
import TodoItem from './TodoItem';
import TodoStats from './TodoStats';

export default function TodoList() {
  const { data, isPending, isError, error, refetch, isFetching } = useTodos();

  // 1) LOADING: isPending = no data yet (first load only).
  if (isPending) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-slate-500">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
        <p className="text-sm">Loading your tasks…</p>
      </div>
    );
  }

  // 2) ERROR: the queryFn threw an error.
  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-sm font-medium text-red-600">{error.message}</p>
        <button
          onClick={() => refetch()}
          className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    );
  }

  // 3) EMPTY: request worked but there is nothing to show.
  if (data.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-slate-200 py-12 text-center">
        <p className="text-3xl">🎉</p>
        <p className="mt-2 text-sm font-medium text-slate-600">No tasks yet</p>
        <p className="text-xs text-slate-400">Add your first task above to get started.</p>
      </div>
    );
  }

  // 4) SUCCESS: show the list.
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <TodoStats todos={data} />
        {/* isFetching is true during background refetches (after invalidation) */}
        {isFetching && <span className="text-xs text-slate-400">Syncing…</span>}
      </div>
      <ul className="space-y-2">
        {data.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}