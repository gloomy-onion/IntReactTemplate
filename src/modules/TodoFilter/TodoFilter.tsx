import React, { useState } from 'react';
import { Tabs } from 'antd';
import { Categories, useTodoContext } from '../../context/TodoContext';

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
    const {categories, setCategories} = useTodoContext();


    const onChange = (key: string) => {
        setCategories(key as Categories);
    };

    return (
        <Tabs activeKey={categories} centered onChange={onChange} type={'line'} size={'large'} items={items} />
    );
};
