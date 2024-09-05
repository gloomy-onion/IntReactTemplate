export type ThemeChangeMessage = {
    type: 'theme_change';
    data: 'light' | 'dark';
};
export type LanguageChangeMessage = {
    type: 'language_change';
    data: 'ru' | 'en';
};

export type BroadcastMessage = ThemeChangeMessage | LanguageChangeMessage;
