import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TodoProvider } from './context/TodoContext';
import { ThemeProvider } from './context/ThemeContext';
import { LocalizationProvider } from './context/LocalizationContext';
import { FormPage, MainPage } from './pages';

export const App = () => (
    <ThemeProvider>
        <LocalizationProvider>
            <TodoProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/form" element={<FormPage />} />
                    </Routes>
                </BrowserRouter>
            </TodoProvider>
        </LocalizationProvider>
    </ThemeProvider>
);
