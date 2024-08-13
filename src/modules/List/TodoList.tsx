import React from 'react';
import { List } from 'antd';
import { TodoItem } from '../Item';
import styles from './TodoList.module.scss';
import { useTodo } from '../../context/TodoContext';

export const TodoList = () => {
    const {items, deleteTodo, toggleDone, toggleImportant, filteredItems, searchValue} = useTodo();

    const resultItems = !filteredItems.length && !searchValue ? items : filteredItems;

    return (
        <List
            className={styles.listContainer}
            dataSource={resultItems}
            renderItem={(item) => (
                <List.Item>
                    <TodoItem
                        itemLabel={item.itemLabel}
                        isImportant={item.isImportant}
                        isDone={item.isDone}
                        onToggleDone={toggleDone}
                        onToggleImportant={toggleImportant}
                        onDelete={deleteTodo}
                        id={item.id}
                    />
                </List.Item>
            )}
        />
    );
};
