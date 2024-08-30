import React from 'react';
import { TodoList } from '../../modules/TodoList';
import styles from './MainPage.module.scss';
import { AddTodoItem } from '../../modules/AddTodoItem';
import { TodoFilter } from '../../modules/TodoFilter';
import { Header } from '../../modules/Header';
import { Search } from '../../modules/Search';
import { useThemeContext } from '../../context/ThemeContext';
import { getBackgroundColor } from '../../shared/lib/utils/themeUtils';
import themeStyles from '../../shared/lib/styles/Theme.module.scss';
import { CommentList } from '../../modules/CommentList';
import { AddComment } from '../../modules/AddComment';

export const MainPage = () => {
    const { currentTheme } = useThemeContext();
    const backgroundColor = getBackgroundColor(currentTheme);

    return (
        <div className={themeStyles[backgroundColor]}>
            <main className={styles.mainPage}>
                <Header />
                <Search />
                <TodoFilter />
                <section className={styles.mainSection}>
                    <div>
                        <CommentList />
                        <AddComment />
                    </div>
                    <div>
                        <TodoList />
                        <AddTodoItem />
                    </div>
                </section>
            </main>
        </div>
    );
};
