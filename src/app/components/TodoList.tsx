"use client";

import { useState } from "react";
import { useTodo } from "../hooks/useTodo";
import TodoListItem from "./TodoListItem";
import TodoLoading from "./TodoLoading";
import { useAuth } from "../hooks/useAuth";
import Loading from "./Loading";

export default function TodoList() {
  const { status } = useAuth();
  const {
    todos,
    input,
    setInput,
    isLoading,
    handleAdd,
    handleDelete,
    handleToggle,
  } = useTodo();

  // 항상 UI는 렌더링하고, 로딩 중에는 일부 기능만 비활성화
  const isPageLoading = status === "loading";

  return (
    <>
      <div className="flex gap-2 w-full items-stretch">
        <input
          className={`flex-1 min-w-0 border-2 ${
            isPageLoading
              ? "border-gray-100 bg-gray-50"
              : "border-purple-200 focus:border-purple-400"
          } rounded-lg px-3 py-2 shadow-sm outline-none transition`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"할 일을 입력하세요"}
          disabled={isPageLoading}
          onKeyDown={(e) => {
            if (!isPageLoading && e.key === "Enter") handleAdd();
          }}
        />
        <button
          className={`px-5 py-2 min-w-[56px] max-w-[40%] w-auto whitespace-nowrap flex-shrink-0 ${
            isPageLoading
              ? "bg-gray-300 text-gray-500"
              : "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:scale-105 active:scale-95 hover:cursor-pointer"
          } font-bold rounded-lg shadow transition`}
          onClick={handleAdd}
          disabled={isPageLoading}
        >
          추가
        </button>
      </div>
      <ul className="w-full mt-4 flex flex-col gap-2">
        {isPageLoading ? (
          <TodoLoading />
        ) : isLoading ? (
          <TodoLoading />
        ) : todos.length === 0 ? (
          <li className="text-gray-400 text-center py-6">할 일이 없습니다.</li>
        ) : (
          todos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
            />
          ))
        )}
      </ul>
    </>
  );
}
