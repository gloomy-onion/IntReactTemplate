import React from 'react';
import { List } from 'antd';
import { useGate, useList, useUnit } from 'effector-react';
import { TodoItem } from '../Item';
import styles from './CommentList.module.scss';
import { useTodoContext } from '../../context/TodoContext';
import { Loading } from '../Loading';
import { commentModel } from '../../shared/api/commentModel';

export const CommentList = () => {
    const { deleteTodo, toggleDone, toggleImportant } = useTodoContext();
    const { $items, $status, fetchGate } = commentModel;
    const status = useUnit($status);

    const comments = useList($items, (item) => (
        <List.Item key={item.id}>
            <TodoItem
                itemLabel={item.name}
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

    return <List className={styles.todoList}>{comments}</List>;
};
