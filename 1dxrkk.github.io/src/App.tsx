import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Forums } from "./pages";

import "./css/app.css";

export const Theme = {
  light: "light",
  dark: "dark",
} as const;

export type Theme = (typeof Theme)[keyof typeof Theme];

export default function App() {
  const [theme, setTheme] = useState<Theme>(Theme.dark);
  const appRef = useRef<HTMLDivElement | null>(null);

  const toggleTheme = () => {
    setTheme((prev) => (prev === Theme.light ? Theme.dark : Theme.light));
  };

  /* moving background glow effect */
  useEffect(() => {
    const app = appRef.current;
    if (!app) return;

    const handleMove = (e: PointerEvent) => {
      const rect = app.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // same behavior as your original button version
      app.style.setProperty("--x", `${x}px`);
      app.style.setProperty("--y", `${y}px`);
    };

    app.addEventListener("pointermove", handleMove);
    return () => app.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <div className="app" data-theme={theme} ref={appRef}>
      <BrowserRouter>
        <div className="main">
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/forums" element={<Forums />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
