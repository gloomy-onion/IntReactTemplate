import { TodoItem } from '../types/todo';
import { todosRequests } from './todos';
import { createDataModel } from './fetchDataFactory';

export const todoModel = createDataModel<TodoItem>({
    request: async () => {
        const response = await todosRequests.getTodos();

        return response.data;
    },
    createItem: async (newTodo) => {
        const response = await todosRequests.postTodo(newTodo);

        return response.data;
    },
});
