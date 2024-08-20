import React from 'react';
import { Checkbox, Typography } from 'antd';
import { DeleteTwoTone, FireTwoTone } from '@ant-design/icons';
import cn from 'classnames';
import styles from './TodoItem.module.scss';
import { useThemeContext } from '../../context/ThemeContext';
import { getTextColor } from '../../shared/lib/utils/themeUtils';
import themeStyles from '../../shared/lib/styles/Theme.module.scss';

type TodoItemProps = {
    itemLabel: string;
    isImportant: boolean;
    isDone: boolean;
    onToggleDone: (id: string) => void;
    onToggleImportant: (id: string) => void;
    onDelete: (id: string) => void;
    id: string;
};

export const TodoItem = ({
    itemLabel,
    isImportant,
    isDone,
    onToggleDone,
    onToggleImportant,
    onDelete,
    id,
}: TodoItemProps) => {
    const { currentTheme } = useThemeContext();

    const typographyColor = getTextColor(currentTheme);

    return (
        <div className={styles.todoItem}>
            <Checkbox checked={isDone} onChange={() => onToggleDone(id)} />
            <Typography.Text
                className={cn(
                    {
                        [styles.todoItemDone]: isDone,
                    },
                    themeStyles[typographyColor],
                )}
                style={{ fontSize: 20, cursor: 'pointer' }}
                onClick={() => onToggleDone(id)}
            >
                {itemLabel}
            </Typography.Text>
            <div className={styles.todoItemButtons}>
                <FireTwoTone
                    twoToneColor={isImportant ? '#ffA500' : '#ccc'}
                    onClick={() => onToggleImportant(id)}
                    style={{ fontSize: 24 }}
                />
                <DeleteTwoTone
                    className={styles.deleteButton}
                    onClick={() => onDelete(id)}
                    style={{ fontSize: 24 }}
                />
            </div>
        </div>
    );
};
