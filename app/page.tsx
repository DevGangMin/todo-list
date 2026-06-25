import AddForm from "./components/AddForm";
import TodoList from "./components/TodoList";

export default function Home() {
  return (
    <main>
      <h1>할 일 목록</h1>
      <TodoList />
      <AddForm />
    </main>
  );
}