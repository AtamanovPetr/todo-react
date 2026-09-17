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

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(items));
  }, [items]);

  const nextId = useRef(Math.max(...items.map((t) => t.id), 0) + 1);

  function handleAdd(text: string) {
    setItems([...items, { text, id: nextId.current, completed: false }]);
    nextId.current = nextId.current + 1;
  }

  function handleDelete(id: number) {
    setItems(items.filter((todo) => todo.id !== id));
  }

  function handleToggle(id: number) {
    setItems(
      items.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function handleClear() {
    setItems([]);
  }

  const visibleItems = items.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return false;
  });

  const remaining = items.filter((todo) => !todo.completed).length;

  return (
    <div className="app">
      <h1 className="app-title">Список задач</h1>

      <TodoForm onAdd={handleAdd} />

      <TodoList
        items={visibleItems}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />

      <FilterButtons filter={filter} onChange={setFilter} />

      <p className="counter">Осталось: {remaining}</p>

      <button className="clear-btn" onClick={handleClear}>
        Очистить всё
      </button>
    </div>
  );
}

export default App;
