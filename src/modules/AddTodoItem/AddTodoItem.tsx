import React, { useState } from 'react';
import { Button, Input } from 'antd';
import styles from './AddTodoItem.module.scss';
import { useTodoContext } from '../../context/TodoContext';
import { getButtonType } from '../../shared/lib/utils/themeUtils';
import { useThemeContext } from '../../context/ThemeContext';
import { useLocalizationContext } from '../../context/LocalizationContext';

export const AddTodoItem = () => {
    const [newTask, setNewTask] = useState('');

    const { addTodo } = useTodoContext();
    const { currentTheme } = useThemeContext();
    const { translate } = useLocalizationContext();

    const buttonType = getButtonType(currentTheme);

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
            <Button type={buttonType} size="large" onClick={handleAddTodo}>
                {translate('addTask')}
            </Button>
        </form>
    );
};
