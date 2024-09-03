import { CommentType } from '../types/comment';
import { commentsRequests } from './comments';
import { createDataModel } from './fetchDataFactory';

export const commentModel = createDataModel<CommentType>({
    request: async () => {
        const response = await commentsRequests.getComments();

        return response.data;
    },
    createItem: async (newComment) => {
        const response = await commentsRequests.postComments(newComment);

        return response.data;
    },
});
