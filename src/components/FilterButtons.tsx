import type { Filter } from "../types";

export interface FilterButtonsProps {
  filter: Filter;
  onChange: (filter: Filter) => void;
}

export default function FilterButtons({
  filter,
  onChange,
}: FilterButtonsProps) {
  return (
    <div className="filters">
      <button
        className={filter === "all" ? "filter-btn active" : "filter-btn"}
        onClick={() => onChange("all")}
      >
        Все
      </button>
      <button
        className={filter === "active" ? "filter-btn active" : "filter-btn"}
        onClick={() => onChange("active")}
      >
        Активные
      </button>
      <button
        className={filter === "completed" ? "filter-btn active" : "filter-btn"}
        onClick={() => onChange("completed")}
      >
        Выполненные
      </button>
    </div>
  );
}
