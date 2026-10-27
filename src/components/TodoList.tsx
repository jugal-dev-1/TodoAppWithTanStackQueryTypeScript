import { useTodos } from '../hooks/useTodos';
import TodoItem from './TodoItem';
import TodoCount from './TodoStats';

export default function TodoList() {
  const { data, isPending, isError, error, refetch, isFetching } = useTodos();

  // isPending only means "no data yet", so this shows on the first load
  if (isPending) {
    return (
      <div className="space-y-2">
        <div className="h-14 animate-pulse border border-black bg-white" />
        <div className="h-14 animate-pulse border border-black bg-white" />
        <div className="h-14 animate-pulse border border-black bg-white" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="border border-black bg-white p-5">
        <p className="font-semibold">Could not load your tasks</p>
        <p className="mt-1 text-sm">{error.message}</p>
        <button
          onClick={() => refetch()}
          className="mt-4 border border-black bg-brand px-4 py-2 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="border border-dashed border-black bg-white p-8 text-center">
        <p className="font-semibold">Nothing to do</p>
        <p className="mt-1 text-sm">Type a task above and press Add task.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <TodoCount todos={data} />
        {/* isFetching is true while the list reloads in the background */}
        {isFetching && <span className="text-sm">Syncing…</span>}
      </div>
      <ul className="space-y-2">
        {data.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}