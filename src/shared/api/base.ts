import axios from 'axios';
import { TodoItem } from 'shared/types/todo';

export const apiInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

export const BASE_URL = '/todos';

const getTodos = () => apiInstance.get<TodoItem[]>(BASE_URL);
const postTodo = (newTodo: Omit<TodoItem, 'id'>) => apiInstance.post<TodoItem>(BASE_URL, newTodo);

export const todosRequests = {
    getTodos,
    postTodo,
};
