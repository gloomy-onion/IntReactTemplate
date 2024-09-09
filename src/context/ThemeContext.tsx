import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { listenToMessages, sendMessage } from '../shared/lib/services/broadcastService';

type ThemeContextType = {
    currentTheme: string;
    toggleTheme?: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>({
    currentTheme: 'light',
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        listenToMessages((message) => {
            if (message.type === 'theme_change') {
                setTheme(message.data);
            }
        });
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }, []);

    useEffect(() => {
        sendMessage({ type: 'theme_change', data: theme });
    }, [theme]);

    const value = useMemo(
        () => ({
            toggleTheme,
            currentTheme: theme,
        }),
        [toggleTheme, theme],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext should be inside ThemeProvider');
    }

    return context;
};
