import { TodoItem } from '../types/todo';
import { apiInstance, TODOS_URL } from './base';

const getTodos = (start: number = 0, limit: number = 10) =>
    apiInstance.get<TodoItem[]>(TODOS_URL, {
        params: {
            _start: start,
            _limit: limit,
        },
    });
const postTodo = (newTodo: Omit<TodoItem, 'id'>) => apiInstance.post<TodoItem>(TODOS_URL, newTodo);

export const todosRequests = {
    getTodos,
    postTodo,
};
