import type { Todo } from "../types";

export interface TodoItemProps {
  item: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ item, onToggle, onDelete }: TodoItemProps) {
  return (
    <li
      className={item.completed ? "todo-item completed" : "todo-item"}
      onClick={() => onToggle(item.id)}
    >
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
