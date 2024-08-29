import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { TodoItem } from '../types/todo';
import { todosRequests } from './base';

const fetchTodoGate = createGate();
const fetchTodos = createEvent();
const addTodo = createEvent<Omit<TodoItem, 'id'>>();

const fetchTodosFx = createEffect(async () => {
    const response = await todosRequests.getTodos();

    return response.data;
});

const addTodoFx = createEffect(async (newTodo: Omit<TodoItem, 'id'>) => {
    const response = await todosRequests.postTodo(newTodo);

    return response.data;
});

const $todos = createStore<TodoItem[]>([])
    .on(fetchTodosFx.doneData, (_, todos) => todos)
    .on(addTodoFx.doneData, (prev, newTodo) => [...prev, newTodo]);

sample({
    clock: fetchTodoGate.open,
    target: fetchTodos,
});

sample({
    clock: fetchTodos,
    target: fetchTodosFx,
});

sample({
    clock: fetchTodosFx.doneData,
    target: $todos,
});

sample({
    clock: addTodo,
    target: addTodoFx,
});

export const model = {
    fetchTodoGate,
    addTodo,
    $todos,
};
