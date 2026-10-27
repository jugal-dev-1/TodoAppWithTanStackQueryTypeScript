import { useState } from 'react';
import type { Todo } from '../types/todo';
import { useDeleteTodo, useEditTodo, useToggleTodo } from '../hooks/useTodos';

export default function TodoItem({ todo }: { todo: Todo }) {
  const toggle = useToggleTodo();
  const remove = useDeleteTodo();
  const edit = useEditTodo();

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const busy = toggle.isPending || remove.isPending || edit.isPending;

  function handleSave() {
    const text = newTitle.trim();
    if (!text) return;

    // same title as before, no need to call the server
    if (text === todo.title) {
      setIsEditing(false);
      return;
    }

    edit.mutate({ id: todo.id, title: text }, { onSuccess: () => setIsEditing(false) });
  }

  function handleCancel() {
    setNewTitle(todo.title);
    setIsEditing(false);
  }

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

      {isEditing ? (
        <>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
            disabled={busy}
            autoFocus
            className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
          <button
            onClick={handleSave}
            disabled={busy || !newTitle.trim()}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {edit.isPending ? 'Saving…' : 'Save'}
          </button>
          <button
            onClick={handleCancel}
            disabled={busy}
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span
            className={`flex-1 text-sm ${
              todo.completed ? 'text-slate-400 line-through' : 'text-slate-700'
            }`}
          >
            {todo.title}
          </span>

          <button
            onClick={() => {
              setNewTitle(todo.title);
              setIsEditing(true);
            }}
            disabled={busy}
            aria-label="Edit task"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </button>

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
        </>
      )}
    </li>
  );
}