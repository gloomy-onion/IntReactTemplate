import React from 'react';
import { Button, Typography } from 'antd';
import cn from 'classnames';
import styles from './Header.module.scss';
import { useTodoContext } from '../../context/TodoContext';
import { useThemeContext } from '../../context/ThemeContext';
import { getButtonType, getTextColor } from '../../shared/lib/utils/themeUtils';
import themeStyles from '../../shared/lib/styles/Theme.module.scss';
import { useLocalizationContext } from '../../context/LocalizationContext';
import { LanguageDropdown } from '../LanguageDropdown';

export const Header = () => {
    const { getTodoCount, getDoneCount } = useTodoContext();
    const { currentTheme, toggleTheme } = useThemeContext();
    const { translate } = useLocalizationContext();

    const todo = getTodoCount();
    const done = getDoneCount();

    const buttonType = getButtonType(currentTheme);
    const typographyColor = getTextColor(currentTheme);

    return (
        <div className={styles.header}>
            <div className={styles.headerButtons}>
                <LanguageDropdown />
                <Button type={buttonType} size="large" onClick={toggleTheme}>
                    {translate('changeTheme')}
                </Button>
            </div>
            <div className={styles.headerTitles}>
                <Typography.Title className={themeStyles[typographyColor]}>
                    {translate('title')}
                </Typography.Title>
                <Typography.Title
                    className={cn(styles.taskCount, themeStyles[typographyColor])}
                    level={2}
                >
                    {`${todo} ${translate('headerCounterToDo')}, ${done} ${translate(
                        'headerCounterDone',
                    )}`}
                </Typography.Title>
            </div>
        </div>
    );
};
