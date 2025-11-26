import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages";

import "./css/app.css";

export const Theme = {
  light: "light",
  dark: "dark",
} as const;

export type Theme = (typeof Theme)[keyof typeof Theme];

export default function App() {
  const [theme, setTheme] = useState<Theme>(Theme.dark);

  const toggleTheme = () => {
    setTheme((prev) => (prev === Theme.light ? Theme.dark : Theme.light));
  };

  return (
    <div className="app" data-theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
