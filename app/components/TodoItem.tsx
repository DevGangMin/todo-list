"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, toggleTodo } from "../api/todos";
import { Todo } from "../types/index";

export default function TodoItem({ todo }: { todo: Todo }) {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  };

  const { mutate: remove } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: invalidate,
  });

  const { mutate: toggle } = useMutation({
    mutationFn: toggleTodo,
    onSuccess: invalidate,
  });

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => toggle(todo)}
      />
      <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
        {todo.title}
      </span>
      <button onClick={() => remove(todo.id)}>삭제</button>
    </li>
  );
}