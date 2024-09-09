import React from 'react';
import { Button } from 'antd';

export const CookieButtons = () => {
    const getCookie = (name: string) => {
        const matches = document.cookie.match(
            `(?:^|; )${name.replaceAll(/([$()*+./?[\\]^{}|])/g, '\\$1')}=([^;]*)`,
        );

        return matches
            ? // eslint-disable-next-line no-console
              console.log(decodeURIComponent(matches[1]))
            : // eslint-disable-next-line no-console
              console.log('Cookie not found');
    };

    const setCookie = (name: string, value: string, options: { [key: string]: any } = {}) => {
        options = {
            path: '/',
            ...options,
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

        for (const optionKey in options) {
            updatedCookie += `; ${optionKey}`;
            const optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += `=${optionValue}`;
            }
        }

        document.cookie = updatedCookie;
    };

    const deleteCookie = (name: string) => {
        setCookie(name, '', { 'max-age': -1 });
    };

    const handleGetClick = () => {
        getCookie('user');
    };

    const handleSetClick = () => {
        setCookie('user', 'John', { 'max-age': 3600 });
    };

    return (
        <div>
            <Button onClick={handleGetClick}>Get Cookie</Button>
            <Button onClick={handleSetClick}>Set Cookie</Button>
            <Button onClick={() => deleteCookie('user')}>Delete Cookie</Button>
        </div>
    );
};
