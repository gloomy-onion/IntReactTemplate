import axios from 'axios';

export const apiInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

export const TODOS_URL = '/users/1/todos';

export const COMMENTS_URL = '/posts/1/comments';
