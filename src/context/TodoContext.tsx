import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type TodoItem = {
    itemLabel: string;
    isImportant: boolean;
    isDone: boolean;
    id: string;
};

export type Categories = 'all' | 'active' | 'done';

type TodoContextType = {
    items: TodoItem[];
    addTodo: (newTodo: Omit<TodoItem, 'id'>) => void;
    deleteTodo: (id: string) => void;
    toggleDone: (id: string) => void;
    toggleImportant: (id: string) => void;
    setSearchValue: (value: string) => void;
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
    const [idCounter, setIdCounter] = useState<number>(1);
    const [searchValue, setSearchValue] = useState<string>('');
    const [categories, setCategories] = useState<Categories>('all');

    const addTodo = (newTodo: Omit<TodoItem, 'id'>) => {
        const todoWithId: TodoItem = { ...newTodo, id: idCounter.toString() };
        setItems((prev) => [...prev, todoWithId]);
        setIdCounter(idCounter + 1);
    };

    const deleteTodo = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const toggleDone = (id: string) => {
        setItems((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    return { ...item, isDone: !item.isDone };
                }

                return item;
            }),
        );
    };

    const toggleImportant = (id: string) => {
        setItems((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    return { ...item, isImportant: !item.isImportant };
                }

                return item;
            }),
        );
    };

    const filteredItems = items.filter(
        (item) =>
            item.itemLabel && item.itemLabel.toLowerCase().includes(searchValue.toLowerCase()),
    );

    const filteredCategoryResult =
        categories === 'all'
            ? filteredItems
            : categories === 'active'
            ? filteredItems.filter((item) => !item.isDone)
            : filteredItems.filter((item) => item.isDone);

    const done = items.filter((item) => item.isDone).length;
    const todo = items.length - done;

    const value = useMemo(
        () => ({
            items,
            addTodo,
            deleteTodo,
            toggleDone,
            toggleImportant,
            setSearchValue,
            filteredItems: filteredCategoryResult,
            searchValue,
            categories,
            setCategories,
            todo,
            done,
        }),
        [
            items,
            addTodo,
            deleteTodo,
            toggleDone,
            toggleImportant,
            setSearchValue,
            filteredCategoryResult,
            searchValue,
            categories,
            setCategories,
            todo,
            done,
        ],
    );

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = (): TodoContextType => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoContext должен быть внутри TodoProvider');
    }

    return context;
};
