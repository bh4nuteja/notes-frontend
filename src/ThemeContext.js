import React, { createContext, useContext, useState, useEffect } from 'react';
import { light, dark } from './theme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const toggle = () => setIsDark(prev => !prev);
  const theme = isDark ? dark : light;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);