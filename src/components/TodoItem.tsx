import { useContext } from "react";
import type { Todo } from "../types";
import { ThemeContext } from "../theme.context";
import { Link } from "react-router-dom";

export interface TodoItemProps {
  item: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ item, onToggle, onDelete }: TodoItemProps) {
  const theme = useContext(ThemeContext);
  return (
    <li
      className={`todo-item ${item.completed ? "completed" : ""} ${theme === "dark" ? "dark" : ""}`}
      onClick={() => onToggle(item.id)}
    >
      <Link to={`/task/${item.id}`} onClick={(e) => e.stopPropagation()}>
        Открыть
      </Link>
      <span className="todo-text">{item.text}</span>
      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(item.id);
        }}
      >
        ×
      </button>
    </li>
  );
}
