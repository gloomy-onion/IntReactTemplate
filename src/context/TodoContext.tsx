import { createContext, ReactNode, useContext, useState } from 'react';

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

    const addTodo = (newTodo: Omit<TodoItem, 'id'>) => {
        const todoWithId: TodoItem = { ...newTodo, id: Date.now().toString() };
        setItems((prev) => [...prev, todoWithId]);
    };

    const deleteTodo = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const toggleDone = (id: string) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, isDone: !item.isDone } : item)),);
    };

    const toggleImportant = (id: string) => {
        setItems((prev) =>
            prev.map((item) =>
                (item.id === id ? { ...item, isImportant: !item.isImportant } : item),),);
    };
    //тут линтер сам себе противоречит и чудит

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

    return (
        <TodoContext.Provider
            value={{
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
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export const useTodoContext = (): TodoContextType => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoContext должен быть внутри TodoProvider');
    }

    return context;
};
