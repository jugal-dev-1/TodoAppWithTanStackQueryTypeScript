import { useState, type SyntheticEvent } from 'react';
import { useAddTodo } from '../hooks/useTodos';

export default function AddTodoForm() {
  const [title, setTitle] = useState('');
  const { mutate, isPending } = useAddTodo();

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault(); // stops the page from reloading
    const text = title.trim();
    if (!text) return;

    // only clear the input once the todo is really added
    mutate(text, { onSuccess: () => setTitle('') });
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs doing?"
        disabled={isPending}
        className="min-w-0 flex-1 border border-black bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-brand"
      />
      <button
        type="submit"
        disabled={isPending || !title.trim()}
        className="border border-black bg-brand px-5 py-3 font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? 'Adding…' : 'Add task'}
      </button>
    </form>
  );
}