import type { Todo } from "../types";
import TodoItem from "./TodoItem";

export interface TodoListProps {
  items: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoList({ items, onToggle, onDelete }: TodoListProps) {
  return (
    <ul className="todo-list">
      {items.map((todo) => (
        <TodoItem
          key={todo.id}
          item={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
