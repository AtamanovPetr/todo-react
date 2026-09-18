import { useState, useEffect, useReducer } from "react";
import "./App.css";
import type { Todo, Filter, Action } from "./types";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import FilterButtons from "./components/FilterButtons";
function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          text: action.payload,
          id: Math.max(...state.map((t) => t.id), 0) + 1,
          completed: false,
        },
      ];
    case "delete":
      return state.filter((todo) => todo.id !== action.payload);
    case "toggle":
      return state.map((todo) => {
        return todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo;
      });
    case "clear":
      return [];
    default:
      return state;
  }
}
function App() {
  const [items, dispatch] = useReducer(reducer, undefined, () => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(items));
  }, [items]);

  const remaining = items.filter((todo) => !todo.completed).length;

  const visibleItems = items.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return false;
  });
  function handleAdd(text: string) {
    dispatch({ type: "add", payload: text });
  }
  function handleToggle(id: number) {
    dispatch({ type: "toggle", payload: id });
  }

  function handleDelete(id: number) {
    dispatch({ type: "delete", payload: id });
  }

  function handleClear() {
    dispatch({ type: "clear" });
  }

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
