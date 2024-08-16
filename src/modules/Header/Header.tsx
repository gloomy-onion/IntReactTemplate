import React from 'react';
import { Button, Typography } from 'antd';
import cn from 'classnames';
import styles from './Header.module.scss';
import { useTodoContext } from '../../context/TodoContext';
import { useThemeContext } from '../../context/ThemeContext';
import { getButtonType, getTextColor } from '../../shared/lib/utils/themeUtils';
import themeStyles from '../../shared/lib/styles/Theme.module.scss';

export const Header = () => {
    const { getTodoCount, getDoneCount } = useTodoContext();
    const { currentTheme, toggleTheme } = useThemeContext();

    const todo = getTodoCount();
    const done = getDoneCount();

    const buttonType = getButtonType(currentTheme);
    const typographyColor = getTextColor(currentTheme);

    return (
        <div className={styles.headerContainer}>
            <Button type={buttonType} size="large" onClick={toggleTheme}>
                Change theme
            </Button>
            <div className={styles.headerTitles}>
                <Typography.Title className={themeStyles[typographyColor]}>
                    Todo List
                </Typography.Title>
                <Typography.Title
                    className={cn(styles.taskCount, themeStyles[typographyColor])}
                    level={2}
                >
                    {todo} more to do, {done} done
                </Typography.Title>
            </div>
        </div>
    );
};
