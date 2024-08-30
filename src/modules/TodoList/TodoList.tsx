import React from 'react';
import { List } from 'antd';
import { useGate, useList, useUnit } from 'effector-react';
import { TodoItem } from '../Item';
import styles from './TodoList.module.scss';
import { useTodoContext } from '../../context/TodoContext';
import { todoModel } from '../../shared/api/todos';
import { Loading } from '../Loading';

export const TodoList = () => {
    const { deleteTodo, toggleDone, toggleImportant } = useTodoContext();

    const { $items, $status, fetchGate } = todoModel;
    const status = useUnit($status);
    const todos = useList($items, (item) => (
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
    ));

    useGate(fetchGate);

    if (status === 'pending') {
        return <Loading />;
    }

    return <List className={styles.todoList}>{todos}</List>;
};
