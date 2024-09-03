import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { useUnit } from 'effector-react';
import styles from './AddTodoItem.module.scss';
import { getButtonType } from '../../shared/lib/utils/themeUtils';
import { useThemeContext } from '../../context/ThemeContext';
import { useLocalizationContext } from '../../context/LocalizationContext';
import { todoModel } from '../../shared/api/todoModel';

export const AddTodoItem = () => {
    const [newTask, setNewTask] = useState('');
    const addNewTodo = useUnit(todoModel.addItem);
    const { currentTheme } = useThemeContext();
    const { translate } = useLocalizationContext();

    const buttonType = getButtonType(currentTheme);

    const handleAddTodo = () => {
        if (newTask) {
            addNewTodo({
                title: newTask,
                isImportant: false,
                completed: false,
                userId: '',
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
