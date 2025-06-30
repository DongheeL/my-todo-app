import { Todo } from "../types/todo";

export default function TodoListItem({
  todo,
  handleToggle,
  handleDelete,
}: {
  todo: Todo;
  handleToggle: (id: number, completed: boolean) => void;
  handleDelete: (id: number) => void;
}) {
  return (
    <li
      key={todo.id}
      className="flex justify-between items-center bg-white rounded-lg shadow p-3 group hover:bg-purple-50 transition"
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleToggle(todo.id, !todo.completed)}
          className="w-5 h-5 accent-purple-500 rounded focus:ring-2 focus:ring-purple-300 hover:cursor-pointer transition"
        />
        <span
          className={
            (todo.completed ? "line-through text-gray-400" : "text-gray-800") +
            " text-lg font-medium transition"
          }
        >
          {todo.title}
        </span>
      </div>
      <button
        className="text-red-400 hover:text-red-600 font-semibold opacity-0 group-hover:opacity-100 hover:cursor-pointer transition"
        onClick={() => handleDelete(todo.id)}
        title="삭제"
      >
        ✕
      </button>
    </li>
  );
}
