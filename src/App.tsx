import { MainPage } from './pages/MainPage';
import { TodoProvider } from './context/TodoContext';
import { ThemeProvider } from './context/ThemeContext';

export const App = () => (
    <ThemeProvider>
        <TodoProvider>
            <MainPage />
        </TodoProvider>
    </ThemeProvider>
);
