import { MainPage } from './pages/MainPage';
import { TodoProvider } from './context/TodoContext';

export const App = () => (
    <TodoProvider>
        <MainPage />
    </TodoProvider>
);
