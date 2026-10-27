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
      className={`flex items-center gap-3 border border-black px-4 py-3 ${
        todo.completed ? 'bg-tint' : 'bg-white'
      } ${busy ? 'opacity-60' : ''}`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        disabled={busy}
        onChange={() => toggle.mutate(todo.id)}
        className="h-5 w-5 shrink-0 cursor-pointer accent-brand"
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
            className="min-w-0 flex-1 border border-black bg-white px-3 py-1.5 outline-none focus:ring-2 focus:ring-brand"
          />
          <button
            onClick={handleSave}
            disabled={busy || !newTitle.trim()}
            className="border border-black bg-brand px-3 py-1 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {edit.isPending ? 'Saving…' : 'Save'}
          </button>
          <button
            onClick={handleCancel}
            disabled={busy}
            className="border border-black bg-white px-3 py-1 text-sm"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span
            className={`min-w-0 flex-1 break-words ${
              todo.completed ? 'text-black/60 line-through' : ''
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
            className="border border-black bg-white px-2 py-0.5 text-sm hover:bg-tint disabled:cursor-not-allowed"
          >
            Edit
          </button>
          <button
            onClick={() => remove.mutate(todo.id)}
            disabled={busy}
           className="border border-black bg-tint px-2 py-0.5 text-sm font-medium text-brand hover:bg-brand hover:text-white disabled:cursor-not-allowed"
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}