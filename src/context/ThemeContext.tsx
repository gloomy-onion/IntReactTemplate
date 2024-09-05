import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    closeChannel,
    createChannel,
    listenToMessages,
    sendMessage,
} from '../shared/lib/services/broadcastService';

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
        createChannel();

        listenToMessages((message) => {
            if (message.type === 'theme_change') {
                setTheme(message.data);
            }
        });

        return () => {
            closeChannel();
        };
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            sendMessage({ type: 'theme_change', data: newTheme });

            return newTheme;
        });
    }, []);

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
