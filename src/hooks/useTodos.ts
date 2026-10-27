import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addTodo, deleteTodo, editTodo, fetchTodos, toggleTodo } from '../api/todoApi';

// Query key = the "name" of this cached data.
// Anything that uses ['todos'] shares the same cache, and invalidating
// this key tells TanStack Query "this data is stale, refetch it".
const TODOS_KEY = ['todos'] as const;

// ---------- QUERY (reading data) ----------
export function useTodos() {
  return useQuery({
    queryKey: TODOS_KEY,
    queryFn: fetchTodos, // the function that actually gets the data
  });
}

// ---------- MUTATIONS (changing data) ----------

export function useAddTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTodo,
    // After the change succeeds, mark the list as stale so it refetches.
    // This keeps the UI in sync with the "server" automatically.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TODOS_KEY }),
  });
}

export function useToggleTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TODOS_KEY }),
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TODOS_KEY }),
  });
}

export function useEditTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TODOS_KEY }),
  });
}