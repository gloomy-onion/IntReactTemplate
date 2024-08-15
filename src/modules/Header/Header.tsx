import React from 'react';
import { Typography } from 'antd';
import styles from './Header.module.scss';
import { useTodoContext } from '../../context/TodoContext';

export const Header = () => {

    const { getTodoCount, getDoneCount } = useTodoContext();
    const todo = getTodoCount();
    const done = getDoneCount();

    return (
        <div className={styles.headerContainer}>
            <Typography.Title>Todo List</Typography.Title>
                <Typography.Title className={styles.taskCount} level={2}>{todo} more to do, {done} done</Typography.Title>
            </div>
    );
};