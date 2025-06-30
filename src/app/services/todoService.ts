import { Todo } from "../types/todo";

// Todo API 관련 함수들
export const todoService = {
  // Todo 목록 조회
  async getTodoList(): Promise<Todo[]> {
    const res = await fetch("/api/todo", { credentials: "include" });
    const data = await res.json();
    return data.todos;
  },

  // Todo 추가
  async addTodo(title: string): Promise<Todo> {
    const res = await fetch("/api/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title }),
    });
    const data = await res.json();
    return data.todo;
  },

  // Todo 삭제
  async deleteTodo(id: number): Promise<void> {
    await fetch(`/api/todo?id=${id}`, {
      method: "DELETE",
      credentials: "include",
    });
  },

  // Todo 완료 상태 토글
  async toggleTodo(id: number, completed: boolean): Promise<Todo> {
    const res = await fetch(`/api/todo`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id, completed }),
    });
    const data = await res.json();
    return data.todo;
  },
};
