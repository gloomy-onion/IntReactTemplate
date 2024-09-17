import React from 'react';
import { Button } from 'antd';
import { deleteCookie, getCookie, setCookie } from 'shared/lib/utils/cookie';

export const CookieButtons = () => {
    const handleGet = () => {
        getCookie('user');
    };

    const handleSet = () => {
        setCookie('user', 'John', { expires: 3600 / (60 * 60 * 24) });
    };

    const handleDelete = () => {
        deleteCookie('user');
    };

    return (
        <div>
            <Button onClick={handleGet}>Get Cookie</Button>
            <Button onClick={handleSet}>Set Cookie</Button>
            <Button onClick={handleDelete}>Delete Cookie</Button>
        </div>
    );
};
