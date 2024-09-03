import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { status } from 'patronum';

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

    const fetchItemsFx = createEffect(() => request());
    const $status = status({ effect: fetchItemsFx });

    const addItemFx = createEffect<Omit<T, 'id'>, T, Error>((newItem: Omit<T, 'id'>) =>
        createItem(newItem),
    );

    const $items = createStore<T[]>(initialData);

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
        fn: (prev, newItem) => [...prev, newItem],
        target: $items,
    });

    return {
        $status,
        fetchGate,
        addItem,
        $items,
    };
};
