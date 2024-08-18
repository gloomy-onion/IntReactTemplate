import React, { ChangeEvent } from 'react';
import { Input } from 'antd';
import { useTodoContext } from '../../context/TodoContext';

export const Search = () => {
    const { setSearchValue, searchValue } = useTodoContext();

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    return <Input.Search size="large" onChange={handleSearchChange} value={searchValue} />;
};
