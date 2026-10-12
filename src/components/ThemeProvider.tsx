import React from 'react';

export type ThemeMode = 'system' | 'light' | 'dark';
export type ThemePalette = 'rose' | 'sage' | 'lavender';

type ThemePreferences = {
  mode: ThemeMode;
  palette: ThemePalette;
};

type ThemeContextValue = ThemePreferences & {
  setMode: (mode: ThemeMode) => void;
  setPalette: (palette: ThemePalette) => void;
};

const storageKey = 'my-little-baby-theme';
const defaultPreferences: ThemePreferences = { mode: 'system', palette: 'rose' };
const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function isThemePreferences(value: unknown): value is ThemePreferences {
  if (typeof value !== 'object' || value === null) return false;
  const preferences = value as Record<string, unknown>;
  return (
    (preferences.mode === 'system' || preferences.mode === 'light' || preferences.mode === 'dark') &&
    (preferences.palette === 'rose' || preferences.palette === 'sage' || preferences.palette === 'lavender')
  );
}

function readPreferences(): ThemePreferences {
  const storedValue = window.localStorage.getItem(storageKey);
  if (!storedValue) return defaultPreferences;

  let parsedValue: unknown;
  try {
    parsedValue = JSON.parse(storedValue);
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
    // eslint-disable-next-line no-console -- malformed persisted settings need an explicit diagnostic
    console.error('Saved theme preferences are malformed; using the default appearance.', error);
    return defaultPreferences;
  }

  if (!isThemePreferences(parsedValue)) {
    // eslint-disable-next-line no-console -- unsupported persisted settings need an explicit diagnostic
    console.error('Saved theme preferences are unsupported; using the default appearance.');
    return defaultPreferences;
  }
  return parsedValue;
}

function savePreferences(preferences: ThemePreferences) {
  window.localStorage.setItem(storageKey, JSON.stringify(preferences));
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = React.useState(readPreferences);

  React.useEffect(() => {
    const root = document.documentElement;
    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const applyColorScheme = () => {
      if (preferences.mode === 'system') {
        root.dataset.colorScheme = colorScheme.matches ? 'dark' : 'light';
      } else {
        root.dataset.colorScheme = preferences.mode;
      }
    };

    root.dataset.theme = preferences.palette;
    applyColorScheme();
    colorScheme.addEventListener('change', applyColorScheme);

    return () => colorScheme.removeEventListener('change', applyColorScheme);
  }, [preferences.mode, preferences.palette]);

  const setMode = React.useCallback(
    (mode: ThemeMode) => {
      const nextPreferences = { ...preferences, mode };
      savePreferences(nextPreferences);
      setPreferences(nextPreferences);
    },
    [preferences]
  );

  const setPalette = React.useCallback(
    (palette: ThemePalette) => {
      const nextPreferences = { ...preferences, palette };
      savePreferences(nextPreferences);
      setPreferences(nextPreferences);
    },
    [preferences]
  );

  const contextValue = React.useMemo(
    () => ({ ...preferences, setMode, setPalette }),
    [preferences, setMode, setPalette]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
