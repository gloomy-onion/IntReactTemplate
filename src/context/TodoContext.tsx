import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type TodoItem = {
    itemLabel: string;
    isImportant: boolean;
    isDone: boolean;
    id: string | number;
};

export type Categories = 'all' | 'active' | 'done';

type TodoContextType = {
    items: TodoItem[];
    deleteTodo: (id: string | number) => void;
    toggleDone: (id: string | number) => void;
    toggleImportant: (id: string | number) => void;
    setSearchValue: (searchValue: string) => void;
    filteredItems: TodoItem[];
    searchValue: string;
    categories: Categories;
    setCategories: (categories: Categories) => void;
    done: number;
    todo: number;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<TodoItem[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [categories, setCategories] = useState<Categories>('all');

    const deleteTodo = (id: string | number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const toggleDone = (id: string | number) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, isDone: !item.isDone } : item)),
        );
    };

    const toggleImportant = (id: string | number) => {
        setItems((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    return { ...item, isImportant: !item.isImportant };
                }

                return item;
            }),
        );
    };

    const filteredItems = items.filter((item) =>
        item.itemLabel.toLowerCase().includes(searchValue.toLowerCase()),
    );

    const filteredCategoryResult =
        categories === 'all'
            ? filteredItems
            : categories === 'active'
            ? filteredItems.filter((item) => !item.isDone)
            : filteredItems.filter((item) => item.isDone);

    const done = items.filter((item) => item.isDone).length;
    const todo = items.filter((item) => !item.isDone).length;

    const value = useMemo(
        () => ({
            items,
            deleteTodo,
            toggleDone,
            toggleImportant,
            filteredItems: filteredCategoryResult,
            searchValue,
            categories,
            setCategories,
            todo,
            done,
            setSearchValue,
        }),
        [
            items,
            deleteTodo,
            toggleDone,
            toggleImportant,
            filteredCategoryResult,
            searchValue,
            categories,
            setCategories,
            todo,
            done,
            setSearchValue,
        ],
    );

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = (): TodoContextType => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoContext should be inside TodoProvider');
    }

    return context;
};
