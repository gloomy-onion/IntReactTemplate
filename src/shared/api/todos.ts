import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { commentsRequests, todosRequests } from './base';
import { TodoItem } from '../types/todo';
import { CommentType } from '../types/comment';

interface FetchDataFactoryOptions<T> {
    request: () => Promise<T[]>;
    createItem: (item: Omit<T, 'id'>) => Promise<T>;
    initialData?: T[];
}

export const createDataModel = <T>({
    request,
    createItem,
    initialData = [],
}: FetchDataFactoryOptions<T>) => {
    const fetchGate = createGate();
    const fetchItems = createEvent();
    const addItem = createEvent<Omit<T, 'id'>>();

    const fetchItemsFx = createEffect(async () => request());

    const addItemFx = createEffect(async (newItem: Omit<T, 'id'>) => createItem(newItem));

    const $items = createStore<T[]>(initialData)
        .on(fetchItemsFx.doneData, (_, items) => items)
        .on(addItemFx.doneData, (prev, newItem) => [...prev, newItem]);

    sample({
        clock: fetchGate.open,
        target: fetchItems,
    });

    sample({
        clock: fetchItems,
        target: fetchItemsFx,
    });

    sample({
        clock: fetchItemsFx.doneData,
        target: $items,
    });

    sample({
        clock: addItem,
        target: addItemFx,
    });

    return {
        fetchGate,
        addItem,
        $items,
    };
};

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

export type DataModel<T> = ReturnType<typeof createDataModel>;
