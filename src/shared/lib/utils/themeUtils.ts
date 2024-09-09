export const getButtonType = (currentTheme: string) =>
    currentTheme === 'light' ? 'primary' : 'default';

export const getTextColor = (currentTheme: string) =>
    (currentTheme === 'dark' ? 'typographyDark' : '');

export const getBackgroundColor = (currentTheme: string) =>
    currentTheme === 'dark' ? 'backgroundDark' : '';

export const getTabColor = (currentTheme: string) => (currentTheme === 'dark' ? 'darkTab' : '');
