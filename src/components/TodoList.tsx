import TodoItem from "./TodoItem";
import type { Todo } from "../types";
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
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}
