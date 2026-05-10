import { useTheme } from '../../context/ThemeContext';

/*
  Botón para alternar entre modo claro y oscuro
*/

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? ' Light' : 'Dark'}
    </button>
  );
}
