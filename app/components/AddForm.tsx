"use client";

import { useState } from "react";
import { useAddTodoMutation } from "@/app/hooks/mutation";

export default function AddForm() {
  const [title, setTitle] = useState("");
  const { mutate } = useAddTodoMutation();

  const handleAdd = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    mutate(trimmed);
    setTitle("");
  };

  return (
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
  );
}