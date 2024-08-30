import axios from 'axios';
import { TodoItem } from 'shared/types/todo';
import { CommentType } from '../types/comment';

export const apiInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

export const TODOS_URL = '/users/1/todos';

const getTodos = () => apiInstance.get<TodoItem[]>(TODOS_URL);
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
