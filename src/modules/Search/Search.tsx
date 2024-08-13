import React, { ChangeEvent, useState } from 'react';
import { Input } from 'antd';
import { useTodoContext } from '../../context/TodoContext';

export const Search = () => {
    const { searchTodo, searchValue } = useTodoContext();

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        searchTodo(event.target.value);
    };

    return (
        <Input.Search size={'large'} onChange={handleSearchChange} value={searchValue} />
    );
};
