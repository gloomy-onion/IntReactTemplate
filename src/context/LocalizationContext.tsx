import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { i18n, Language } from '../shared/lib/i18n/translations';
import { listenToMessages, sendMessage } from '../shared/lib/services/broadcastService';

type LocalizationContextType = {
    language: Language;
    translate: (key: string) => string;
    toggleLanguage: () => void;
};

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en');

    useEffect(() => {
        listenToMessages((message) => {
            if (message.type === 'language_change') {
                setLanguage(message.data);
            }
        });
    }, []);

    const toggleLanguage = useCallback(() => {
        setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'ru' : 'en'));
    }, []);

    useEffect(() => {
        sendMessage({ type: 'language_change', data: language });
    }, [language]);

    const translate = useCallback(
        (key: string): string => {
            const translation = i18n[key];
            if (translation) {
                return translation[language] || key;
            }

            return key;
        },
        [language],
    );

    const value = useMemo(
        () => ({
            toggleLanguage,
            language,
            translate,
        }),
        [language, translate, toggleLanguage],
    );

    return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
};

export const useLocalizationContext = (): LocalizationContextType => {
    const context = useContext(LocalizationContext);
    if (!context) {
        throw new Error('useLocalizationContext must be used within a LocalizationProvider');
    }

    return context;
};
