import FilterButtons from "../components/FilterButtons";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { type ThemeType } from "../theme.context";
import type { Filter, Todo } from "../types";

export interface HomeProps {
  items: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onAdd: (text: string) => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  remaining: number;
  onClear: () => void;
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}
export default function Home({
  items,
  onToggle,
  onDelete,
  onAdd,
  filter,
  setFilter,
  remaining,
  onClear,
  theme,
  setTheme,
}: HomeProps) {
  return (
    <div className={theme === "light" ? "app" : "app dark"}>
      <button
        className="theme-btn"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? "🌙 Тёмная" : "☀️ Светлая"}
      </button>

      <h1 className="app-title">Список задач</h1>

      <TodoForm onAdd={onAdd} />
      <TodoList items={items} onToggle={onToggle} onDelete={onDelete} />
      <FilterButtons filter={filter} onChange={setFilter} />

      <p className="counter">Осталось: {remaining}</p>
      <button className="clear-btn" onClick={onClear}>
        Очистить всё
      </button>
    </div>
  );
}
