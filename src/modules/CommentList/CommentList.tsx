import React from 'react';
import { List } from 'antd';
import { useGate, useList } from 'effector-react';
import { TodoItem } from '../Item';
import styles from './CommentList.module.scss';
import { useTodoContext } from '../../context/TodoContext';
import { commentModel } from '../../shared/api/todos';

export const CommentList = () => {
    const { deleteTodo, toggleDone, toggleImportant } = useTodoContext();
    const comments = useList(commentModel.$items, (item) => (
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

    useGate(commentModel.fetchGate);

    return <List className={styles.todoList}>{comments}</List>;
};
