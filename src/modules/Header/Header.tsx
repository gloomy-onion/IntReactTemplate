import React from 'react';
import { Typography } from 'antd';
import styles from './Header.module.scss';
import { useTodoContext } from '../../context/TodoContext';

export const Header = () => {
    const { todo, done } = useTodoContext();

    return (
        <div className={styles.header}>
            <Typography.Title>Todo List</Typography.Title>
            <Typography.Title className={styles.taskCount} level={2}>
                {todo} more to do, {done} done
            </Typography.Title>
        </div>
    );
};
