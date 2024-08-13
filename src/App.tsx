import { MainPage } from './pages/MainPage';
import { TodoProvider } from './context/TodoContext';

function App() {

    return (
        <TodoProvider>
            <MainPage />
        </TodoProvider>
    );
}

export default App;
