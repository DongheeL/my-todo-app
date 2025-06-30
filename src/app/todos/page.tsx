import { Metadata } from "next";
import TodoList from "../components/TodoList";
import UserDisplay from "../components/UserDisplay";

export const metadata: Metadata = {
  title: "My Todo App - 할 일 목록",
  description: "나만의 할 일 목록을 관리하세요",
};

export default function TodoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center py-10 px-2">
      <div className="bg-white/90 shadow-2xl rounded-2xl p-8 w-full max-w-md flex-1 flex flex-col gap-6">
        <div className="flex items-center gap-2 self-end">
          <UserDisplay />
        </div>
        <h1 className="text-3xl font-extrabold text-center text-purple-700 drop-shadow mb-2">
          나의 To-Do 리스트
        </h1>
        <TodoList />
      </div>
    </div>
  );
}
