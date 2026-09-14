import { useState, useRef, useEffect } from "react";
import "./App.css";
import type { Todo, Filter } from "./types";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import FilterButtons from "./components/FilterButtons";
function App() {
  const [items, setItems] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState<Filter>("all");
  const nextId = useRef(Math.max(...items.map((t) => t.id), 0) + 1);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(items));
  }, [items]);

  const remaining = items.filter((item) => item.completed !== true).length;

  function handleToggle(id: number) {
    setItems(
      items.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }

  function handleDelete(id: number) {
    setItems(items.filter((t) => t.id !== id));
  }

  function handleAdd(text: string) {
    if (text.trim().length === 0) {
      return;
    }
    setItems([...items, { text: text, id: nextId.current, completed: false }]);
    nextId.current = nextId.current + 1;
  }
  const visibleItems = items.filter((item) => {
    if (filter === "active") return !item.completed;
    if (filter === "completed") return item.completed;
    return true;
  });
  return (
    <div className="app">
      <h1 className="app-title">Список задач</h1>

      <TodoForm onAdd={handleAdd} />

      <TodoList
        onDelete={handleDelete}
        onToggle={handleToggle}
        items={visibleItems}
      />

      <FilterButtons onChange={setFilter} filter={filter} />

      <p className="counter">Осталось: {remaining}</p>

      <button className="clear-btn" onClick={() => setItems([])}>
        Очистить всё
      </button>
    </div>
  );
}

export default App;
