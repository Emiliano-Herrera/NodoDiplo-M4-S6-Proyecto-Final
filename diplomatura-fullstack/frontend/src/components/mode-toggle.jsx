// src/components/mode-toggle.jsx
import React, { useState } from "react";  // ← Agrega esta línea
import { Button } from "./ui/button";

export function ModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
    setIsDark(!isDark);
  };

  return (
    <Button variant="outline" size="sm" onClick={toggleTheme}>
      {isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
    </Button>
  );
}