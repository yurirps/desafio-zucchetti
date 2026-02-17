import { useContext } from 'react';
import { ThemeContext } from '../theme/themeContext';


export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeContextProvider');
  }
  return context;
}