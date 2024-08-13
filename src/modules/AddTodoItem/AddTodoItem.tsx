import React, { useState } from 'react';
import { Button, Input } from 'antd';
import styles from './AddTodoItem.module.scss';
import { useTodo } from '../../context/TodoContext';

export const AddTodoItem = () => {
    const { addTodo } = useTodo();
    const [newTask, setNewTask] = useState('');

    const handleAddTodo = () => {
        if (newTask) {
            addTodo({
                itemLabel: newTask,
                isImportant: false,
                isDone: false,
                onToggleDone: () => {},
                onToggleImportant: () => {},
                onDelete: () => {},
            });
            setNewTask('');
        }
    };

    return (
        <div className={styles.addTodoItemContainer}>
            <Input
                size={'large'}
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <Button
                type={'primary'}
                size={'large'}
                onClick={handleAddTodo}
            >
                Add
            </Button>
        </div>
    );
};
