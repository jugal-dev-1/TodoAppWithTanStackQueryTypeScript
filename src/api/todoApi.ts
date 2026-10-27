import type { Todo } from '../types/todo';

// Our fake "database": a plain array living in memory.
let todos: Todo[] = [
  { id: crypto.randomUUID(), title: 'Learn TanStack Query', completed: true },
  { id: crypto.randomUUID(), title: 'Build a Todo app', completed: true },
  { id: crypto.randomUUID(), title: 'Hello World', completed: false },
];

// Set to true to test the error UI.
const SIMULATE_ERROR = false;

// Simulates network latency so we can see loading states.
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// GET /todos
export async function fetchTodos(): Promise<Todo[]> {
  await delay();
  if (SIMULATE_ERROR) throw new Error('Failed to load todos from the server.');
  return [...todos]; // return a copy, like a real API would return fresh data
}

// POST /todos
export async function addTodo(title: string): Promise<Todo> {
  await delay();
  const newTodo: Todo = { id: crypto.randomUUID(), title, completed: false };
  todos = [newTodo, ...todos];
  return newTodo;
}

// PATCH /todos/:id
export async function toggleTodo(id: string): Promise<void> {
  await delay();
  todos = todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
}

// DELETE /todos/:id
export async function deleteTodo(id: string): Promise<void> {
  await delay();
  todos = todos.filter((t) => t.id !== id);
}