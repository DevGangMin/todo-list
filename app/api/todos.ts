import { Todo } from "@/app/types/index";

const BASE_URL = "http://localhost:4000/todos";

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Todo List fetch failed");
  return res.json();
};

export const addTodo = async (title: string): Promise<Todo> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, done: false }),
  });
  if (!res.ok) throw new Error("Todo List add failed");
  return res.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Todo List delete failed");
};

export const toggleTodo = async (todo: Todo): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/${todo.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ done: !todo.done }),
  });
  if (!res.ok) throw new Error("Todo List toggle failed");
  return res.json();
};