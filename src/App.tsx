import TodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <main className="min-h-screen bg-page px-5 py-12 text-black sm:py-16">
      <div className="mx-auto max-w-xl space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-brand">To do</h1>
        <TodoForm />
        <TodoList />
      </div>
    </main>
  );
}