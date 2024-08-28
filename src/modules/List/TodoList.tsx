import React from 'react';
import { List } from 'antd';
import { useGate, useList } from 'effector-react';
import { TodoItem } from '../Item';
import styles from './TodoList.module.scss';
import { useTodoContext } from '../../context/TodoContext';
import { $todos, fetchTodoGate } from '../../shared/api/todos';

export const TodoList = () => {
    const { deleteTodo, toggleDone, toggleImportant } = useTodoContext();

    useGate(fetchTodoGate);

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
