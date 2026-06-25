"use client";

import { useState } from "react";
import { useDeleteTodoMutation, useToggleTodoMutation, useUpdateTodoMutation } from "@/app/hooks/mutation";
import { Todo } from "../types/index";

export default function TodoItem({ todo }: { todo: Todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const { mutate: remove } = useDeleteTodoMutation();
  const { mutate: toggle } = useToggleTodoMutation();
  const { mutate: update } = useUpdateTodoMutation();

  const enterEditMode = () => {
    setEditTitle(todo.title);
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== todo.title) {
      update({ id: todo.id, title: trimmed });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => toggle(todo)}
      />
      {isEditing ? (
        <input
          autoFocus
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
          onBlur={handleSave}
        />
      ) : (
        <span
          style={{ textDecoration: todo.done ? "line-through" : "none" }}
          onDoubleClick={enterEditMode}
        >
          {todo.title}
        </span>
      )}
      <button onClick={() => remove(todo.id)}>삭제</button>
    </li>
  );
}