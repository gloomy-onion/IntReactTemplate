import { TodoItem } from '../types/todo';
import { apiInstance, TODOS_URL } from './base';
import { WithAbortController } from '../types/withAbortController';
import { withAbortController } from './abortController';

const getTodos = (start: number = 0, limit: number = 10) =>
    apiInstance.get<TodoItem[]>(TODOS_URL, {
        params: {
            _start: start,
            _limit: limit,
        },
    });

const postTodo = ({ signal, ...params }: WithAbortController<TodoItem>) => {
    return apiInstance.post<TodoItem>(TODOS_URL, { params }, { signal });
};

export const todosRequests = {
    getTodos,
    postTodo: withAbortController(postTodo),
};
