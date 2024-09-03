import { TodoItem } from '../types/todo';
import { apiInstance, TODOS_URL } from './base';

const getTodos = () => apiInstance.get<TodoItem[]>(TODOS_URL);
const postTodo = (newTodo: Omit<TodoItem, 'id'>) => apiInstance.post<TodoItem>(TODOS_URL, newTodo);

export const todosRequests = {
    getTodos,
    postTodo,
};
