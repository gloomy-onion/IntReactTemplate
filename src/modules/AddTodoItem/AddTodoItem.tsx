import React, { useState } from 'react';
import { Button, Input } from 'antd';
import styles from './AddTodoItem.module.scss';
import { useTodoContext } from '../../context/TodoContext';

export const AddTodoItem = () => {
    const { addTodo } = useTodoContext();
    const [newTask, setNewTask] = useState('');

    const handleAddTodo = () => {
        if (newTask) {
            addTodo({
                itemLabel: newTask,
                isImportant: false,
                isDone: false,
            });
            setNewTask('');
        }
    };

    return (
        <form className={styles.addTodoItem}>
            <Input size="large" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
            <Button type="primary" size="large" onClick={handleAddTodo}>
                Add
            </Button>
        </form>
    );
};
