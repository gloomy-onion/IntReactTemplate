import axios from 'axios';
import { TodoItem } from 'shared/types/todo';
import { CommentType } from '../types/comment';

export const apiInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

export const TODOS_URL = '/todos';



export const COMMENTS_URL = '/posts/1/comments';

