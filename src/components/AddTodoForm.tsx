import { useState, type SyntheticEvent  } from 'react';
import { useAddTodo } from '../hooks/useTodos';

export default function AddTodoForm() {
  const [title, setTitle] = useState('');
  const { mutate, isPending } = useAddTodo();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return; // ignore empty input

    // Clear the input only once the server confirms the add.
    mutate(trimmed, { onSuccess: () => setTitle('') });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        disabled={isPending}
        className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={isPending || !title.trim()}
        className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? 'Adding…' : 'Add Task'}
      </button>
    </form>
  );
}