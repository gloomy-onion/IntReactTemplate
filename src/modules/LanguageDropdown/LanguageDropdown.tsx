import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Menu, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import cn from 'classnames';
import styles from './LanguageDropdown.module.scss';
import { useLocalizationContext } from '../../context/LocalizationContext';
import { getButtonType } from '../../shared/lib/utils/themeUtils';
import { useThemeContext } from '../../context/ThemeContext';

export const LanguageDropdown = () => {
    const { toggleLanguage, translate } = useLocalizationContext();
    const { currentTheme } = useThemeContext();
    const buttonType = getButtonType(currentTheme);

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

    const items = [
        {
            key: 'ru',
            label: 'Русский',
            onClick: () => {
                toggleLanguage();
                setDropdownVisible(false);
            },
        },
        {
            key: 'en',
            label: 'English',
            onClick: () => {
                toggleLanguage();
                setDropdownVisible(false);
            },
        },
    ];

    useEffect(() => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
            });
        }
    }, [dropdownVisible]);

    const dropdownContent = (
        <div
            className={cn(styles.dropdownContent, { [styles.visible]: dropdownVisible })}
            style={{
                top: `${position?.top}px`,
                left: `${position?.left}px`,
            }}
        >
            <Menu items={items} onClick={() => setDropdownVisible(false)} />
        </div>
    );

    return (
        <>
            <Button
                className={styles.dropdownButton}
                size="large"
                type={buttonType}
                onClick={(e) => {
                    e.preventDefault();
                    setDropdownVisible((prev) => !prev);
                }}
                ref={buttonRef}
            >
                <Space>
                    {translate('changeLanguage')}
                    <DownOutlined />
                </Space>
            </Button>
            {dropdownVisible && ReactDOM.createPortal(dropdownContent, document.body)}
        </>
    );
};
