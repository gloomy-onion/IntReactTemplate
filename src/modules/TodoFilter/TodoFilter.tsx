import React from 'react';
import { Tabs } from 'antd';
import { Categories, useTodoContext } from '../../context/TodoContext';
import { useThemeContext } from '../../context/ThemeContext';
import { getTabColor } from '../../shared/lib/utils/themeUtils';
import themeStyles from '../../shared/lib/styles/Theme.module.scss';
import { useLocalizationContext } from '../../context/LocalizationContext';

type TabItem = {
    key: string;
    label: string;
    children: React.ReactNode;
};

export const TodoFilter = () => {
    const { categories, setCategories } = useTodoContext();
    const { currentTheme } = useThemeContext();
    const { translate } = useLocalizationContext();

    const tabColor = getTabColor(currentTheme);

    const onChange = (key: string) => {
        setCategories(key as Categories);
    };

    const items: TabItem[] = [
        {
            key: 'all',
            label: translate('all'),
            children: '',
        },
        {
            key: 'active',
            label: translate('active'),
            children: '',
        },
        {
            key: 'done',
            label: translate('done'),
            children: '',
        },
    ];

    return (
        <Tabs
            className={themeStyles[tabColor]}
            activeKey={categories}
            centered
            onChange={onChange}
            type="line"
            size="large"
            items={items}
        />
    );
};
