import React, { useState } from 'react';
import { Checkbox, Typography } from 'antd';
import { DeleteTwoTone, FireTwoTone } from '@ant-design/icons';
import cn from 'classnames';
import { createPortal } from 'react-dom';
import styles from './TodoItem.module.scss';
import { useThemeContext } from '../../context/ThemeContext';
import { getTextColor } from '../../shared/lib/utils/themeUtils';
import themeStyles from '../../shared/lib/styles/Theme.module.scss';
import { ConfirmDelete } from '../ConfirmDelete';
import { ImportantTooltip } from '../Tooltip';

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
    const [open, setOpen] = useState<boolean>(false);

    const showModal = () => setOpen(true);

    const handleCancel = () => setOpen(false);

    const handleDelete = () => {
        onDelete(id);
        setOpen(false);
    };

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
                    styles.todoItemText,
                )}
                onClick={() => onToggleDone(id)}
            >
                {itemLabel}
            </Typography.Text>
            <div className={styles.todoItemButtons}>
                <ImportantTooltip>
                    <FireTwoTone
                        twoToneColor={isImportant ? '#ffA500' : '#ccc'}
                        onClick={() => onToggleImportant(id)}
                        className={styles.todoIcons}
                    />
                </ImportantTooltip>
                <DeleteTwoTone
                    className={cn(styles.deleteButton, styles.todoIcons)}
                    onClick={showModal}
                />
                {open &&
                    createPortal(
                        <ConfirmDelete
                            open={open}
                            handleCancel={handleCancel}
                            handleOk={handleDelete}
                        />,
                        document.body,
                    )}
            </div>
        </div>
    );
};
