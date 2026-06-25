"use client";

import { useState } from "react";
import { useTodosQuery } from "@/app/hooks/queries";
import TodoItem from "./TodoItem";

type Filter = "all" | "done" | "undone";

const FILTERS: { label: string; value: Filter }[] = [
  { label: "전체", value: "all" },
  { label: "완료", value: "done" },
  { label: "미완료", value: "undone" },
];

export default function TodoList() {
  const [filter, setFilter] = useState<Filter>("all");
  const { data: todos, isPending, isError, error } = useTodosQuery();

  if (isPending) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-red-700">
        {error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다."}
      </div>
    );
  }

  const filtered = todos.filter((todo) => {
    if (filter === "done") return todo.done;
    if (filter === "undone") return !todo.done;
    return true;
  });

  return (
    <div>
      <div className="mb-3 flex gap-2">
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
              filter === value
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-400">할 일이 없습니다.</p>
      ) : (
        <ul className="space-y-1">
          {filtered.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
}