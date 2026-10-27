import type { Todo } from '../types/todo';

export default function TodoStats({ todos }: { todos: Todo[] }) {
  const completed = todos.filter((t) => t.completed).length;
  const pending = todos.length - completed;

  return (
    <div className="flex gap-2 text-sm font-medium">
      <span className="border border-black bg-white px-2 py-0.5">{pending} left</span>
      <span className="border border-black bg-brand px-2 py-0.5 text-white">{completed} done</span>
    </div>
  );
}