import React from 'react';
import { Tabs } from 'antd';
import { Categories, useTodoContext } from '../../context/TodoContext';
import { useThemeContext } from '../../context/ThemeContext';
import { getTabColor } from '../../shared/lib/utils/themeUtils';
import themeStyles from '../../shared/lib/styles/Theme.module.scss';

type TabItem = {
    key: string;
    label: string;
    children: React.ReactNode;
};

const items: TabItem[] = [
    {
        key: 'all',
        label: 'All',
        children: '',
    },
    {
        key: 'active',
        label: 'Active',
        children: '',
    },
    {
        key: 'done',
        label: 'Done',
        children: '',
    },
];

export const TodoFilter = () => {
    const { categories, setCategories } = useTodoContext();
    const { currentTheme } = useThemeContext();

    const tabColor = getTabColor(currentTheme);

    const onChange = (key: string) => {
        setCategories(key as Categories);
    };

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
