import Cookies from 'js-cookie';

export const getCookie = (name: string) => {
    const value = Cookies.get(name);

    return value ? console.log(value) : console.log('Cookie not found');
};

export const setCookie = (name: string, value: string, options: Cookies.CookieAttributes = {}) => {
    Cookies.set(name, value, options);
};

export const deleteCookie = (name: string) => {
    Cookies.remove(name);
};
