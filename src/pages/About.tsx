import type { ThemeType } from "../theme.context";

export interface AboutProps {
  theme: ThemeType;
}

export default function About({ theme }: AboutProps) {
  return (
    <div className={theme === "light" ? "app" : "app dark"}>
      <h1 className="app-title">О проекте</h1>

      <section className="about-section">
        <h2 className="about-heading">Что это</h2>
        <p className="about-text">
          Это учебный To-Do на React и TypeScript. Проект создан, чтобы
          закрепить компонентный подход, хуки и работу с состоянием. Каждая
          задача хранится в localStorage, поэтому список сохраняется между
          перезагрузками страницы.
        </p>
      </section>

      <section className="about-section">
        <h2 className="about-heading">Что внутри</h2>
        <ul className="about-list">
          <li>React + TypeScript через Vite</li>
          <li>useState, useReducer, useEffect, useRef, useContext</li>
          <li>React Router для навигации между страницами</li>
          <li>localStorage для хранения задач</li>
          <li>Переключатель светлой и тёмной темы через Context</li>
        </ul>
      </section>

      <section className="about-section">
        <h2 className="about-heading">Зачем</h2>
        <p className="about-text">
          Цель — не просто написать код, а понять, зачем нужен каждый хук и как
          данные текут между компонентами. Проект развивается по этапам: от
          чистого JS до полноценного SPA с роутингом и API.
        </p>
      </section>
    </div>
  );
}
