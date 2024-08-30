import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { useUnit } from 'effector-react';
import styles from './AddComment.module.scss';
import { getButtonType } from '../../shared/lib/utils/themeUtils';
import { useThemeContext } from '../../context/ThemeContext';
import { useLocalizationContext } from '../../context/LocalizationContext';
import { commentModel } from '../../shared/api/todos';

export const AddComment = () => {
    const [newTask, setNewTask] = useState('');
    const addNewTodo = useUnit(commentModel.addItem);
    const { currentTheme } = useThemeContext();
    const { translate } = useLocalizationContext();

    const buttonType = getButtonType(currentTheme);

    const handleAddTodo = () => {
        if (newTask) {
            addNewTodo({
                name: newTask,
                body: '',
                email: '',
                postId: '',
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
