import { CommentType } from '../types/comment';
import { apiInstance, COMMENTS_URL } from './base';

const getComments = () => apiInstance.get<CommentType[]>(COMMENTS_URL);
const postComments = (newComment: Omit<CommentType, 'id'>) =>
    apiInstance.post<CommentType>(COMMENTS_URL, newComment);

export const commentsRequests = {
    getComments,
    postComments,
};
