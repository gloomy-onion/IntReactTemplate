import { MainPage } from './pages/MainPage';
import { TodoProvider } from './context/TodoContext';
import { ThemeProvider } from './context/ThemeContext';
import { LocalizationProvider } from './context/LocalizationContext';

export const App = () => (
    <ThemeProvider>
        <LocalizationProvider>
            <TodoProvider>
                <MainPage />
            </TodoProvider>
        </LocalizationProvider>
    </ThemeProvider>
);
