import { NavLink, useParams } from "react-router-dom";
import type { Todo } from "../types";

export interface TaskDetailProps {
  items: Todo[];
}
export default function TaskDetail({ items }: TaskDetailProps) {
  const { id } = useParams();
  const item = items.find((todo) => todo.id === +id);
  return item ? (
    <div className="task-detail">
      <div className="task-text">{item.text}</div>
      <span
        className={`task-status ${item.completed ? "task-status--done" : "task-status--active"}`}
      >
        {item.completed ? "Выполнена" : "Активна"}
      </span>
      <div>
        <NavLink to="/" className="back-link">
          ← Назад
        </NavLink>
      </div>
    </div>
  ) : (
    <div className="task-detail">
      <div className="not-found">Задача не найдена</div>
      <div style={{ textAlign: "center" }}>
        <NavLink to="/" className="back-link">
          ← Назад
        </NavLink>
      </div>
    </div>
  );
}
