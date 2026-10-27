import type { Todo } from '../types/todo';
import { useDeleteTodo, useToggleTodo } from '../hooks/useTodos';

export default function TodoItem({ todo }: { todo: Todo }) {
  const toggle = useToggleTodo();
  const remove = useDeleteTodo();

  // isPending is true while the mutation is running; we use it to
  // dim the row and block double clicks.
  const busy = toggle.isPending || remove.isPending;

  return (
    <li
      className={`flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md ${
        busy ? 'opacity-60' : ''
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        disabled={busy}
        onChange={() => toggle.mutate(todo.id)}
        className="h-5 w-5 cursor-pointer accent-indigo-600"
      />

      <span
        className={`flex-1 text-sm ${
          todo.completed ? 'text-slate-400 line-through' : 'text-slate-700'
        }`}
      >
        {todo.title}
      </span>

      <button
        onClick={() => remove.mutate(todo.id)}
        disabled={busy}
        aria-label="Delete task"
        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </button>
    </li>
  );
}