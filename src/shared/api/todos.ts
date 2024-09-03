import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { status } from 'patronum';
import { commentsRequests, todosRequests } from './base';
import { TodoItem } from '../types/todo';
import { CommentType } from '../types/comment';

interface FetchDataFactoryOptions<T> {
    request: (number: number, number1: number) => Promise<T[]>;
    createItem: (item: Omit<T, 'id'>) => Promise<T>;
    initialData?: T[];
}

export const createDataModel = <T>({
    request,
    createItem,
    initialData = [],
}: FetchDataFactoryOptions<T>) => {
    const fetchGate = createGate();
    const fetchItems = createEvent<void>();
    const fetchMoreItems = createEvent<void>();
    const addItem = createEvent<Omit<T, 'id'>>();
    const $start = createStore(0);

    const fetchItemsFx = createEffect(() => request(0, 10));
    const fetchMoreItemsFx = createEffect(() => {
        const start = $start.getState();

        return request(start, 10);
    });
    const $status = status({ effect: fetchItemsFx });

    const addItemFx = createEffect(async (newItem: Omit<T, 'id'>) => createItem(newItem));

    const $items = createStore<T[]>(initialData)
        .on(fetchItemsFx.doneData, (_, items) => items)
        .on(addItemFx.doneData, (prev, newItem) => [...prev, newItem]);

    $start.on(fetchMoreItemsFx.doneData, (_, newItems) => _ + 10);

    sample({
        clock: fetchGate.open,
        target: fetchItems,
    });

    sample({
        clock: fetchMoreItems,
        target: fetchMoreItemsFx,
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
        $status,
        fetchGate,
        addItem,
        $items,
        fetchMoreItems,
    };
};

export const todoModel = createDataModel<TodoItem>({
    request: async (start, limit) => {
        const response = await todosRequests.getTodos(start, limit);

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
