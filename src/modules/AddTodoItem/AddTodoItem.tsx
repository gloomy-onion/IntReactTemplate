import React, { useState } from 'react';
import { Button, Input } from 'antd';
import styles from './AddTodoItem.module.scss';
import { useTodoContext } from '../../context/TodoContext';
import { getButtonType } from '../../shared/lib/utils/themeUtils';
import { useThemeContext } from '../../context/ThemeContext';

export const AddTodoItem = () => {
    const { addTodo } = useTodoContext();
    const [newTask, setNewTask] = useState('');

    const { currentTheme } = useThemeContext();

    const buttonType = getButtonType(currentTheme);

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
        <form className={styles.addTodoItemContainer}>
            <Input size="large" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
            <Button type={buttonType} size="large" onClick={handleAddTodo}>
                Add
            </Button>
        </form>
    );
};
