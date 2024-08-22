import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

type ThemeContextType = {
    currentTheme: string;
    toggleTheme?: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>({
    currentTheme: 'light',
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
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
