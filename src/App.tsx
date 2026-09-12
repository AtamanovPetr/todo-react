import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState<string>("");
  const [items, setItems] = useState<
    {
      id: number;
      text: string;
      completed: boolean;
    }[]
  >(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const nextId = useRef(Math.max(...items.map((t) => t.id), 0) + 1);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(items));
  }, [items]);

  const remaining = items.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <h1 className="app-title">Список задач</h1>

      <div className="input-row">
        <input
          className="todo-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Что нужно сделать?"
        />
        <button
          className="add-btn"
          onClick={() => {
            if (text.trim().length === 0) return;
            setItems([
              ...items,
              { text: text, id: nextId.current, completed: false },
            ]);
            setText("");
            nextId.current = nextId.current + 1;
          }}
        >
          Добавить
        </button>
      </div>

      <ul className="todo-list">
        {items.map((item) => (
          <li
            className={item.completed ? "todo-item completed" : "todo-item"}
            key={item.id}
            onClick={() =>
              setItems(
                items.map((todo) =>
                  todo.id === item.id
                    ? { ...todo, completed: !todo.completed }
                    : todo,
                ),
              )
            }
          >
            <span className="todo-text">{item.text}</span>
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                setItems(items.filter((todo) => todo.id !== item.id));
              }}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      <p className="counter">Осталось: {remaining}</p>

      <button className="clear-btn" onClick={() => setItems([])}>
        Очистить всё
      </button>
    </div>
  );
}

export default App;
