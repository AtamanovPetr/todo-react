import type { Todo } from "../types";
export interface StatsProps {
  items: Todo[];
}
export default function Stats({ items }: StatsProps) {
  return (
    <div className="stats">
      <div className="stat-card stat-card--total">
        <h1>Всего</h1>
        <div className="stat-value">{items.length}</div>
      </div>
      <div className="stat-card stat-card--active">
        <h1>Активные</h1>
        <div className="stat-value">
          {items.reduce((acc, curr) => (!curr.completed ? acc + 1 : acc), 0)}
        </div>
      </div>
      <div className="stat-card stat-card--done">
        <h1>Выполненные</h1>
        <div className="stat-value">
          {items.reduce((acc, curr) => (curr.completed ? acc + 1 : acc), 0)}
        </div>
      </div>
    </div>
  );
}
