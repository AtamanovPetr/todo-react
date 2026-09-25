import { useState, useEffect, useReducer } from "react";
import "./App.css";
import type { Todo, Filter, Action } from "./types";
import type { ThemeType } from "./theme.context";
import { ThemeContext } from "./theme.context";
import Home from "./pages/Home";
import { NavLink, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Stats from "./pages/Stats";
import TaskDetail from "./pages/TaskDetail";
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
  const [theme, setTheme] = useState<ThemeType>("light");
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
    <ThemeContext.Provider value={theme}>
      <nav className="main-nav">
        <NavLink to="/">Задачи</NavLink>
        <NavLink to="/about">О проекте</NavLink>
        <NavLink to="/stats">Статистика</NavLink>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              onAdd={handleAdd}
              onDelete={handleDelete}
              onClear={handleClear}
              onToggle={handleToggle}
              items={visibleItems}
              filter={filter}
              remaining={remaining}
              theme={theme}
              setFilter={setFilter}
              setTheme={setTheme}
            ></Home>
          }
        />
        <Route path="/about" element={<About theme={theme} />} />
        <Route path="/stats" element={<Stats items={items} />}></Route>
        <Route path="/task/:id" element={<TaskDetail items={items} />}></Route>
      </Routes>
    </ThemeContext.Provider>
  );
}

export default App;
