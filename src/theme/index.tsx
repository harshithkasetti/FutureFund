// FutureFund Theme Context
import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors, AppColors } from './colors';
import { typography, fontFamilies, fontSizes, letterSpacings, lineHeights } from './typography';
import { spacing, radius, layout } from './spacing';

export type ThemeMode = 'light' | 'dark' | 'system';

// ─── Shadow tokens ────────────────────────────────────────────────────────────
// Defined inline here so the type is always complete — no partial merges.

export interface ShadowToken {
  shadowColor:   string;
  shadowOffset:  { width: number; height: number };
  shadowOpacity: number;
  shadowRadius:  number;
  elevation:     number;
}

export interface ThemeShadows {
  sm:          ShadowToken;
  md:          ShadowToken;
  lg:          ShadowToken;
  xl:          ShadowToken;
  neonCyan:    ShadowToken;
  neonGreen:   ShadowToken;
  neonPurple:  ShadowToken;
  gold:        ShadowToken;
}

const lightShadows: ThemeShadows = {
  sm:         { shadowColor: '#241E16', shadowOffset: { width: 0, height: 1  }, shadowOpacity: 0.06, shadowRadius: 4,  elevation: 2  },
  md:         { shadowColor: '#241E16', shadowOffset: { width: 0, height: 4  }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4  },
  lg:         { shadowColor: '#241E16', shadowOffset: { width: 0, height: 8  }, shadowOpacity: 0.12, shadowRadius: 24, elevation: 8  },
  xl:         { shadowColor: '#241E16', shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.16, shadowRadius: 40, elevation: 12 },
  gold:       { shadowColor: '#C9A84C', shadowOffset: { width: 0, height: 4  }, shadowOpacity: 0.30, shadowRadius: 16, elevation: 6  },
  // neon tokens re-use gold values in light mode — screens can safely spread these
  neonCyan:   { shadowColor: '#C9A84C', shadowOffset: { width: 0, height: 4  }, shadowOpacity: 0.25, shadowRadius: 16, elevation: 6  },
  neonGreen:  { shadowColor: '#10D98F', shadowOffset: { width: 0, height: 4  }, shadowOpacity: 0.25, shadowRadius: 16, elevation: 6  },
  neonPurple: { shadowColor: '#9B72C8', shadowOffset: { width: 0, height: 4  }, shadowOpacity: 0.25, shadowRadius: 16, elevation: 6  },
};

const darkShadows: ThemeShadows = {
  sm:         { shadowColor: '#000000', shadowOffset: { width: 0, height: 1  }, shadowOpacity: 0.40, shadowRadius: 4,  elevation: 2  },
  md:         { shadowColor: '#000000', shadowOffset: { width: 0, height: 4  }, shadowOpacity: 0.50, shadowRadius: 12, elevation: 4  },
  lg:         { shadowColor: '#000000', shadowOffset: { width: 0, height: 8  }, shadowOpacity: 0.60, shadowRadius: 24, elevation: 8  },
  xl:         { shadowColor: '#000000', shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.70, shadowRadius: 40, elevation: 12 },
  gold:       { shadowColor: '#C9A84C', shadowOffset: { width: 0, height: 4  }, shadowOpacity: 0.40, shadowRadius: 16, elevation: 8  },
  neonCyan:   { shadowColor: '#00F5FF', shadowOffset: { width: 0, height: 4  }, shadowOpacity: 0.45, shadowRadius: 16, elevation: 8  },
  neonGreen:  { shadowColor: '#00FF9D', shadowOffset: { width: 0, height: 4  }, shadowOpacity: 0.40, shadowRadius: 16, elevation: 8  },
  neonPurple: { shadowColor: '#BF5FFF', shadowOffset: { width: 0, height: 4  }, shadowOpacity: 0.40, shadowRadius: 16, elevation: 8  },
};

// ─── Context shape ────────────────────────────────────────────────────────────

interface ThemeContextValue {
  colors:        AppColors;
  shadows:       ThemeShadows;
  typography:    typeof typography;
  fontFamilies:  typeof fontFamilies;
  fontSizes:     typeof fontSizes;
  letterSpacings:typeof letterSpacings;
  lineHeights:   typeof lineHeights;
  spacing:       typeof spacing;
  radius:        typeof radius;
  layout:        typeof layout;
  isDark:        boolean;
  themeMode:     ThemeMode;
  setThemeMode:  (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  colors:        lightColors,
  shadows:       lightShadows,
  typography,
  fontFamilies,
  fontSizes,
  letterSpacings,
  lineHeights,
  spacing,
  radius,
  layout,
  isDark:        false,
  themeMode:     'system',
  setThemeMode:  () => {},
});

// ─── Provider ─────────────────────────────────────────────────────────────────

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');

  const isDark =
    themeMode === 'dark' ||
    (themeMode === 'system' && systemScheme === 'dark');

  return (
    <ThemeContext.Provider
      value={{
        colors:        isDark ? darkColors  : lightColors,
        shadows:       isDark ? darkShadows : lightShadows,
        typography,
        fontFamilies,
        fontSizes,
        letterSpacings,
        lineHeights,
        spacing,
        radius,
        layout,
        isDark,
        themeMode,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useTheme = (): ThemeContextValue => useContext(ThemeContext);