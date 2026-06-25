"use client";

import { useTodosQuery } from "@/app/hooks/queries";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { data: todos, isPending, isError, error } = useTodosQuery();

  if (isPending) return <div>로딩중...</div>;
  if (isError) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다."}
      </div>
    );
  }
  if (todos.length === 0) return <p>할 일이 없습니다.</p>;

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}