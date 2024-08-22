import React from 'react';
import { TodoList } from '../../modules/List';
import styles from './MainPage.module.scss';
import { AddTodoItem } from '../../modules/AddTodoItem';
import { TodoFilter } from '../../modules/TodoFilter';
import { Header } from '../../modules/Header';
import { Search } from '../../modules/Search';
import { useThemeContext } from '../../context/ThemeContext';
import { getBackgroundColor } from '../../shared/lib/utils/themeUtils';
import themeStyles from '../../shared/lib/styles/Theme.module.scss';

export const MainPage = () => {
    const { currentTheme } = useThemeContext();
    const backgroundColor = getBackgroundColor(currentTheme);

    return (
        <div className={themeStyles[backgroundColor]}>
            <main className={styles.mainPage}>
                <Header />
                <Search />
                <TodoFilter />
                <TodoList />
                <AddTodoItem />
            </main>
        </div>
    );
};
