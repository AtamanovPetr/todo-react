import { useState } from "react";

export interface TodoFormProps {
  onAdd: (text: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState<string>("");

  function handleClick() {
    if (text.trim().length === 0) {
      setText("");
      return;
    }
    onAdd(text);
    setText("");
  }

  return (
    <div className="input-row">
      <input
        className="todo-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Что нужно сделать?"
      />
      <button className="add-btn" onClick={handleClick}>
        Добавить
      </button>
    </div>
  );
}
