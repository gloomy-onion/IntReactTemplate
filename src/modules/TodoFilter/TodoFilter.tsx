import React, { useState } from 'react';
import { Tabs } from 'antd';

type TabItem = {
    key: string;
    label: string;
    children: React.ReactNode;
};

const items: TabItem[] = [
    {
        key: '1',
        label: 'All',
        children: '',
    },
    {
        key: '2',
        label: 'Active',
        children: '',
    },
    {
        key: '3',
        label: 'Done',
        children: '',
    },
];

export const TodoFilter = () => {
    const [activeKey, setActiveKey] = useState<string>('1');

    const onChange = (key: string) => {
        setActiveKey(key);
    };

    return (
        <Tabs activeKey={activeKey} centered onChange={onChange} type={'line'} size={'large'} items={items} />
    );
};
