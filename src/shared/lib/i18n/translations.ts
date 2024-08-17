export type Language = 'ru' | 'en';

export type Translations = {
    [key: string]: {
        [lang in Language]: string;
    };
};

export const i18n: Translations = {
    title: {
        ru: 'Список дел',
        en: 'Todo list',
    },
    addTask: {
        ru: 'Добавить',
        en: 'Add',
    },
    changeTheme: {
        ru: 'Изменить тему',
        en: 'Change theme',
    },
    changeLanguage: {
        ru: 'Изменить язык',
        en: 'Change language',
    },
    headerCounterDone: {
        ru: 'выполнено',
        en: 'done',
    },
    headerCounterToDo: {
        ru: 'осталось',
        en: 'more to do',
    },
    all: {
        ru: 'Все',
        en: 'All',
    },
    active: {
        ru: 'Активные',
        en: 'Active',
    },
    done: {
        ru: 'Выполненные',
        en: 'Done',
    },
};
