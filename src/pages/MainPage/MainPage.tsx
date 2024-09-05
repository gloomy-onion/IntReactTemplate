import React from 'react';
import cn from 'classnames';
import { useResizeObserver } from '../../shared/lib/hooks';
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
import { YandexShare } from '../../modules/YaShare';

export const MainPage = () => {
    const { currentTheme } = useThemeContext();
    const backgroundColor = getBackgroundColor(currentTheme);

    const { observedElementRef, size } = useResizeObserver();

    const isVertical = size.width < 1200;

    return (
        <div className={themeStyles[backgroundColor]}>
            <main className={styles.mainPage}>
                <Header />
                <Search />
                <TodoFilter />
                <section
                    className={cn(styles.mainSection, { [styles.verticalLayout]: isVertical })}
                    ref={observedElementRef}
                >
                    <div>
                        <CommentList />
                        <AddComment />
                    </div>
                    <div>
                        <TodoList />
                        <AddTodoItem />
                    </div>
                </section>
                <YandexShare />
            </main>
        </div>
    );
};
