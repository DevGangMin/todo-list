"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Todo {
  id: string;
  title: string;
  done: boolean;
}

const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch("http://localhost:4000/todos");
  if (!res.ok) {
    throw new Error("Todo List fetch failed");
  }
  return res.json();
};

const addTodos = async (title: string): Promise<Todo> => {
  const res = await fetch("http://localhost:4000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, done: false }),
  });
  if (!res.ok) {
    throw new Error("Todo List add failed");
  }
  return res.json();
};

const deleteTodos = async (id: string): Promise<void> => {
  const res = await fetch(`http://localhost:4000/todos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Todo List delete failed");
  }
};

const toggleTodos = async (todo: Todo): Promise<Todo> => {
  const res = await fetch(`http://localhost:4000/todos/${todo.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ done: !todo.done }),
  });
  if (!res.ok) {
    throw new Error("Todo List toggle failed");
  }
  return res.json();
};

export default function Home() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  const {
    data: todos,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const { mutate: addTodo } = useMutation({
    mutationFn: addTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: deleteTodo } = useMutation({
    mutationFn: deleteTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: toggleTodo } = useMutation({
    mutationFn: toggleTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAdd = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    addTodo(trimmed);
    setTitle("");
  };

  const handleDelete = (id: string) => {
    deleteTodo(id);
  };

  const handleToggle = (todo: Todo) => {
    toggleTodo(todo);
  };

  if (isPending) {
    return <div>로딩중학교...</div>;
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다."}</div>;
  }

  return (
    <main>
      <h1>Todo List</h1>

      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
          placeholder="할 일을 입력하세요"
        />
        <button onClick={handleAdd}>추가</button>
      </div>

      {todos.length === 0 ? (
        <p>할 일이 없습니다.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo)} />
              <span>{todo.title}</span>
              <br />
              <button onClick={() => handleDelete(todo.id)}>삭제</button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}