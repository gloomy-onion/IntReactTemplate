import axios from 'axios';
import { TodoItem } from 'shared/types/todo';
import { CommentType } from '../types/comment';

export const apiInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

export const TODOS_URL = '/todos';

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

export const COMMENTS_URL = '/posts/1/comments';

const getComments = () => apiInstance.get<CommentType[]>(COMMENTS_URL);
const postComments = (newComment: CommentType) =>
    apiInstance.post<CommentType>(COMMENTS_URL, newComment);

export const commentsRequests = {
    getComments,
    postComments,
};
