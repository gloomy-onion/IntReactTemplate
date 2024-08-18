import React from 'react';
import { Checkbox, Typography } from 'antd';
import { DeleteTwoTone, FireTwoTone } from '@ant-design/icons';
import cn from 'classnames';
import styles from './TodoItem.module.scss';

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
}: TodoItemProps) => (
    <div className={styles.todoItem}>
        <Checkbox checked={isDone} onChange={() => onToggleDone(id)} />
        <Typography.Text
            className={cn(styles.todoItemLabel, { [styles.todoItemDone]: isDone })}
            onClick={() => onToggleDone(id)}
        >
            {itemLabel}
        </Typography.Text>
        <div className={styles.todoItemButtons}>
            <FireTwoTone
                className={styles.todoItemImportant}
                twoToneColor={isImportant ? '#ffA500' : '#ccc'}
                onClick={() => onToggleImportant(id)}
            />
            <DeleteTwoTone className={styles.deleteButton} onClick={() => onDelete(id)} />
        </div>
    </div>
);
