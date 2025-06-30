import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Todo } from "../types/todo";
import { todoService } from "../services/todoService";

// Todo 관련 상태와 로직을 관리하는 커스텀 훅
export function useTodo() {
  const { data: session } = useSession();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // 투두 목록 조회
  const getTodoList = async () => {
    setIsLoading(true);
    try {
      const data = await todoService.getTodoList();
      setTodos(data);
    } finally {
      setIsLoading(false);
    }
  };

  // 세션이 있을 때 투두 목록 조회
  useEffect(() => {
    if (session) {
      getTodoList();
    }
  }, [session]);

  // 투두 추가
  const handleAdd = async () => {
    if (input.trim()) {
      // 낙관적 UI 업데이트
      setTodos((prev: Todo[]) => [
        ...prev,
        { id: 0, title: input.trim(), completed: false, userId: 0 },
      ]);
      setInput("");

      // API 호출 및 목록 갱신
      await todoService.addTodo(input.trim());
      getTodoList();
    }
  };

  // 투두 삭제
  const handleDelete = async (id: number) => {
    // 낙관적 UI 업데이트
    setTodos((prev: Todo[]) => prev.filter((todo) => todo.id !== id));

    // API 호출
    await todoService.deleteTodo(id);
  };

  // 투두 완료 상태 토글
  const handleToggle = async (id: number, completed: boolean) => {
    // 낙관적 UI 업데이트
    setTodos((prev: Todo[]) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    // API 호출
    await todoService.toggleTodo(id, completed);
  };

  return {
    todos,
    input,
    setInput,
    isLoading,
    handleAdd,
    handleDelete,
    handleToggle,
  };
}
