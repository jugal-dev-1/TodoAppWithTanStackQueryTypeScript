import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';

export default function App() {
  return (
    // Full-page gradient background, card centered
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-4">
      <div className="w-full max-w-lg space-y-6 rounded-3xl border border-white/60 bg-white/70 p-8 shadow-xl shadow-indigo-100 backdrop-blur">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">My Tasks</h1>
          <p className="text-sm text-slate-500">Stay organized, one task at a time.</p>
        </header>

        <AddTodoForm />
        <TodoList />
      </div>
    </main>
  );
}