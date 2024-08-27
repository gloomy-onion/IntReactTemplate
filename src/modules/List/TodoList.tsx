import React, { useEffect } from 'react';
import { List } from 'antd';
import { useUnit } from 'effector-react';
import { TodoItem } from '../Item';
import styles from './TodoList.module.scss';
import { useTodoContext } from '../../context/TodoContext';
import { $todos, fetchTodosFx } from '../../shared/api/todos';

export const TodoList = () => {
    const { deleteTodo, toggleDone, toggleImportant } = useTodoContext();
    const todos = useUnit($todos);

    useEffect(() => {
        fetchTodosFx();
    }, []);

    return (
        <List
            className={styles.todoList}
            dataSource={todos}
            renderItem={(item) => (
                <List.Item>
                    <TodoItem
                        itemLabel={item.title}
                        isImportant={item.isImportant}
                        isDone={item.completed}
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
