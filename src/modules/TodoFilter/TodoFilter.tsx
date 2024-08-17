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

    // useEffect(() => {
    //     console.log('useEffect: Тело эффекта');
    //
    //     return () => {
    //         console.log('useEffect: Cleanup');
    //     };
    // }, [categories]);
    //
    // useLayoutEffect(() => {
    //     console.log('useLayoutEffect: Тело эффекта');
    //
    //     return () => {
    //         console.log('useLayoutEffect: Cleanup');
    //     };
    // }, [categories]);
    //

    // наскальные заметки для себя
    // useLayoutEffect: Тело эффекта
    // useEffect: Тело эффекта
    // useLayoutEffect: Cleanup
    // useEffect: Cleanup
    // useLayoutEffect: Тело эффекта
    // useEffect: Тело эффекта
    // смутило то, что после отрисовки сразу очищается, это из-за React.StrictMode
    // React намеренно вызывает эффекты и функции очистки дважды при первоначальной отрисовке,
    // чтобы помочь разработчикам выявлять побочные эффекты и убедиться, что код устойчив к перерендерам
    // проверила, без стриктмод работает нормально

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
