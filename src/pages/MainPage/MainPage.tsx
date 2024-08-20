import React from 'react';
import { Search } from '../../modules/Search';
import { TodoList } from '../../modules/List';
import styles from './MainPage.module.scss';
import { AddTodoItem } from '../../modules/AddTodoItem';
import { TodoFilter } from '../../modules/TodoFilter';
import { Header } from '../../modules/Header';

export const MainPage = () => {
    return (
        <main className={styles.mainPage}>
            <Header />
            <Search />
            <TodoFilter />
            <TodoList />
            <AddTodoItem />
        </main>
    );
};
