import { createEffect, createStore } from 'effector';
import { apiInstance } from './base';

type TodoItem = {
    isImportant?: boolean;
    id: string | number;
    title: string;
    userId: string | number;
    completed: boolean;
};

const BASE_URL = '/todos';

export const fetchTodosFx = createEffect(async () => {
    const response = await apiInstance.get<TodoItem[]>(BASE_URL);

    return response.data;
});

export const addTodoFx = createEffect(async (newTodo: Omit<TodoItem, 'id'>) => {
    const response = await apiInstance.post<TodoItem>(BASE_URL, newTodo);

    return response.data;
});

export const $todos = createStore<TodoItem[]>([])
    .on(fetchTodosFx.doneData, (_, todos) => todos)
    .on(addTodoFx.doneData, (prev, newTodo) => [...prev, newTodo]);
