import type { Todo } from '../types/todo';

export default function TodoStats({ todos }: { todos: Todo[] }) {
  const completed = todos.filter((t) => t.completed).length;
  const pending = todos.length - completed;

  return (
    <div className="flex gap-2">
      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
        {pending} pending
      </span>
      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
        {completed} completed
      </span>
    </div>
  );
}