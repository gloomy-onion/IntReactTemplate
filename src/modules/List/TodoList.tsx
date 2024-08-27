import React, { useEffect } from 'react';
import { List } from 'antd';
import { useList, useUnit } from 'effector-react';
import { TodoItem } from '../Item';
import styles from './TodoList.module.scss';
import { useTodoContext } from '../../context/TodoContext';
import { $todos, fetchTodosFx } from '../../shared/api/todos';

export const TodoList = () => {
    const { deleteTodo, toggleDone, toggleImportant } = useTodoContext();
    const fetchTodos = useUnit(fetchTodosFx);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return (
        <List className={styles.todoList}>
            {useList($todos, (item) => (
                <List.Item key={item.id}>
                    <TodoItem
                        itemLabel={item.title}
                        isImportant={item.isImportant}
                        isDone={item.completed}
                        onToggleDone={() => toggleDone(item.id)}
                        onToggleImportant={() => toggleImportant(item.id)}
                        onDelete={() => deleteTodo(item.id)}
                        id={item.id}
                    />
                </List.Item>
            ))}
        </List>
    );
};
