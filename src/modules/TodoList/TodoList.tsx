import React, { useEffect, useRef } from 'react';
import { List } from 'antd';
import { useGate, useList, useUnit } from 'effector-react';
import { TodoItem } from '../Item';
import styles from './TodoList.module.scss';
import { useTodoContext } from '../../context/TodoContext';
import { Loading } from '../Loading';
import { todoModel } from '../../shared/api/todoModel';

export const TodoList = () => {
    const { deleteTodo, toggleDone, toggleImportant } = useTodoContext();
    const { $items, $status, fetchGate, fetchMoreItems } = todoModel;
    const status = useUnit($status);

    const lastItemRef = useRef(null);
    const pageRef = useRef(1);
    const todos = useList($items, (item) => (
        <List.Item key={item.id}>
            <TodoItem
                itemLabel={item.title}
                isImportant={item.isImportant}
                isDone={item.completed}
                onToggleDone={() => toggleDone(item.id)}
                onToggleImportant={() => toggleImportant(item.id)}
                onDelete={() => deleteTodo(item.id)}
                id={item.id}
            />
            <div ref={lastItemRef} />
        </List.Item>
    ));

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        fetchMoreItems();
                        pageRef.current += 1;
                    }
                });
            },
            {
                threshold: 1,
            },
        );

        const currentRef = lastItemRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [todos, fetchMoreItems]);

    useGate(fetchGate);

    if (status === 'pending') {
        return <Loading />;
    }

    return <List className={styles.todoList}>{todos}</List>;
};
