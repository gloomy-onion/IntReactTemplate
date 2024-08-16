import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type TodoItem = {
    itemLabel: string;
    isImportant: boolean;
    isDone: boolean;
    onToggleDone: (id: string) => void;
    onToggleImportant: (id: string) => void;
    onDelete: (itemId: string) => void;
    id: string;
};

export type Categories = 'all' | 'active' | 'done';

type TodoContextType = {
    items: TodoItem[];
    addTodo: (newTodo: Omit<TodoItem, 'id'>) => void;
    deleteTodo: (id: string) => void;
    toggleDone: (id: string) => void;
    toggleImportant: (id: string) => void;
    searchTodo: (searchValue: string) => void;
    filteredItems: TodoItem[];
    searchValue: string;
    categories: Categories;
    setCategories: (categories: Categories) => void;
    getDoneCount: () => number;
    getTodoCount: () => number;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<TodoItem[]>([]);
    const [idCounter, setIdCounter] = useState<number>(1);
    const [searchValue, setSearchValue] = useState<string>('');
    const [categories, setCategories] = useState<Categories>('all');

    const addTodo = (newTodo: Omit<TodoItem, 'id'>) => {
        const todoWithId: TodoItem = { ...newTodo, id: idCounter.toString() };
        setItems([...items, todoWithId]);
        setIdCounter(idCounter + 1);
    };

    const deleteTodo = (id: string) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const toggleDone = (id: string) => {
        setItems(items.map((item) => (item.id === id ? { ...item, isDone: !item.isDone } : item)));
    };

    const toggleImportant = (id: string) => {
        setItems(
            items.map((item) =>
                (item.id === id ? { ...item, isImportant: !item.isImportant } : item),
            ),
        );
    };

    const searchTodo = (searchValue: string) => {
        setSearchValue(searchValue);
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

    const getDoneCount = () => items.filter((item) => item.isDone).length;
    const getTodoCount = () => items.filter((item) => !item.isDone).length;

    const value = useMemo(
        () => ({
            items,
            addTodo,
            deleteTodo,
            toggleDone,
            toggleImportant,
            searchTodo,
            filteredItems: filteredCategoryResult,
            searchValue,
            categories,
            setCategories,
            getTodoCount,
            getDoneCount,
        }),
        [
            items,
            addTodo,
            deleteTodo,
            toggleDone,
            toggleImportant,
            searchTodo,
            filteredCategoryResult,
            searchValue,
            categories,
            setCategories,
            getTodoCount,
            getDoneCount,
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
