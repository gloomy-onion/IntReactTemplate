import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import cn from 'classnames';
import { createPortal } from 'react-dom';
import styles from './Header.module.scss';
import { useTodoContext } from '../../context/TodoContext';
import { useThemeContext } from '../../context/ThemeContext';
import { getButtonType, getTextColor } from '../../shared/lib/utils/themeUtils';
import themeStyles from '../../shared/lib/styles/Theme.module.scss';
import { useLocalizationContext } from '../../context/LocalizationContext';
import { LanguageDropdown } from '../LanguageDropdown';
import { Map } from '../Map';

export const Header = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { todo, done } = useTodoContext();
    const { currentTheme, toggleTheme } = useThemeContext();
    const { translate } = useLocalizationContext();

    const buttonType = getButtonType(currentTheme);
    const typographyColor = getTextColor(currentTheme);
    const showModal = () => setOpenModal(true);
    const closeModal = () => setOpenModal(false);

    return (
        <div className={styles.header}>
            <div className={styles.headerButtons}>
                <LanguageDropdown />
                <Button type={buttonType} size="large" onClick={showModal}>
                    {translate('openMap')}
                </Button>
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
            {openModal &&
                createPortal(<Map open={openModal} onClose={closeModal} />, document.body)}
        </div>
    );
};
