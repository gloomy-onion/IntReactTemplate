import React from 'react';
import { Checkbox, Typography } from 'antd';
import styles from './TodoItem.module.scss';
import { DeleteTwoTone, FireTwoTone } from '@ant-design/icons';

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

    return (
        <div className={styles.todoItemContainer}>
            <Checkbox
                checked={isDone}
                onChange={() => onToggleDone(id)}
            />
            <Typography.Text className={isDone ? styles.todoItemDone : ''} style={{ fontSize: 20, cursor: 'pointer' }}
                             onClick={() => onToggleDone(id)}>{itemLabel}</Typography.Text>
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
