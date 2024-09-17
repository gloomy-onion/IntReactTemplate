import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { status } from 'patronum';
import { withAbortController } from './abortController';

type FetchDataFactoryOptions<T> = {
    request: (offset: number, limit: number) => Promise<T[]>;
    createItem: (item: Omit<T, 'id'>) => Promise<T>;
    initialData?: T[];
};

export const createDataModel = <T>({
    request,
    createItem,
    initialData = [],
}: FetchDataFactoryOptions<T>) => {
    const fetchGate = createGate();

    const fetchItems = createEvent();
    const incStart = createEvent();
    const fetchMoreItems = createEvent();
    const addItem = createEvent<Omit<T, 'id'>>();

    const fetchItemsFx = createEffect(() => request(0, 10));
    const fetchMoreItemsFx = createEffect((start: number) => request(start, 10));
    const addItemFx = createEffect<Omit<T, 'id'>, T, Error>(async (newItem: Omit<T, 'id'>) => {
        const data = await createItem(newItem);

        return data;
    });

    const $start = createStore(0);
    const $items = createStore<T[]>(initialData);
    const $status = status({ effect: fetchItemsFx });

    sample({
        clock: fetchGate.open,
        target: fetchItems,
    });

    sample({
        clock: fetchItems,
        target: fetchItemsFx,
    });

    sample({
        clock: fetchMoreItems,
        source: $start,
        target: fetchMoreItemsFx,
    });

    sample({
        clock: incStart,
        source: $start,
        fn: (source) => source + 10,
        target: $start,
    });

    sample({
        clock: fetchItemsFx.doneData,
        fn: (newItems) => newItems,
        target: $items,
    });

    sample({
        clock: addItem,
        target: addItemFx,
    });

    sample({
        clock: addItemFx.doneData,
        source: $items,
        fn: (prevItems, newItem) => [...prevItems, newItem as T],
        target: $items,
    });

    sample({
        clock: fetchMoreItemsFx.doneData,
        source: $items,
        fn: (source, clock) => [...source, ...clock],
        target: [$items, incStart],
    });

    return {
        $status,
        fetchGate,
        addItem,
        $items,
        fetchMoreItems,
    };
};
