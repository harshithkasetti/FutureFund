// FutureFund Color System
// Light: Warm ivory & deep navy luxury palette
// Dark:  Deep obsidian with electric neon accents

// ─── Raw Palette ──────────────────────────────────────────────────────────────
// Never use these directly in components — always go through lightColors/darkColors.

export const palette = {
  // Brand Core
  gold:          '#C9A84C',
  goldLight:     '#E8C97A',
  goldDark:      '#A07830',

  // Neon Accents (Dark Mode)
  neonCyan:      '#00F5FF',
  neonGreen:     '#00FF9D',
  neonPurple:    '#BF5FFF',
  neonBlue:      '#4D9EFF',
  neonPink:      '#FF4D9E',
  neonYellow:    '#FFE600',

  // Neutrals
  white:         '#FFFFFF',
  offWhite:      '#F8F6F1',
  ivory:         '#F2EDE4',
  cream:         '#E8E0D0',
  warmGray100:   '#F5F2ED',
  warmGray200:   '#EAE5DC',
  warmGray300:   '#D4CCBC',
  warmGray400:   '#B5A98C',
  warmGray500:   '#8C7E65',
  warmGray600:   '#5E5244',
  warmGray700:   '#3D3228',
  warmGray800:   '#241E16',
  warmGray900:   '#120F0A',

  // Dark Backgrounds
  obsidian:      '#080B14',
  darkNavy:      '#0D1220',
  darkCard:      '#111827',
  darkSurface:   '#161F2E',
  darkBorder:    '#1E2D42',
  darkElevated:  '#1A2535',

  // Semantic
  success:       '#10D98F',
  successDark:   '#00FF9D',
  warning:       '#F5A623',
  warningDark:   '#FFE600',
  error:         '#E85858',
  errorDark:     '#FF4D4D',
  info:          '#4A90D9',
  infoDark:      '#4D9EFF',
} as const;

// ─── Shared Interface ─────────────────────────────────────────────────────────
// Both lightColors and darkColors must satisfy this — gives every screen a
// guaranteed, fully-typed token set regardless of which theme is active.

export interface AppColors {
  // Backgrounds
  background:          string;
  backgroundSecondary: string;
  backgroundTertiary:  string;
  surface:             string;
  surfaceSecondary:    string;
  elevated:            string;

  // Text
  textPrimary:   string;
  textSecondary: string;
  textTertiary:  string;
  textInverse:   string;
  textAccent:    string;

  // Brand / Primary action
  primary:        string;
  primaryLight:   string;
  primarySurface: string;

  // Borders & dividers
  border:      string;
  borderLight: string;
  borderDark:  string;
  divider:     string;

  // Semantic status
  success:        string;
  successSurface: string;
  warning:        string;
  warningSurface: string;
  error:          string;
  errorSurface:   string;
  info:           string;
  infoSurface:    string;

  // Misc
  shadowColor:       string;
  cardGradientStart: string;
  cardGradientEnd:   string;

  // Tab bar
  tabActive:   string;
  tabInactive: string;
  tabBar:      string;

  // Utility — always available so screens never need to conditional-access
  white:       string;
  darkBorder:  string;
  warmGray100: string;

  // Neon accents — present in both themes.
  // In light mode these hold neutral/brand equivalents so code never needs
  // to guard with `colors.neonCyan ?? fallback`.
  neonCyan:    string;
  neonGreen:   string;
  neonPurple:  string;
  neonBlue:    string;
  neonPink:    string;
  neonYellow:  string;
  gold:        string;

  // Extended dark-surface colours — neutral equivalents in light mode
  darkNavy:     string;
  darkCard:     string;
  darkSurface:  string;
  darkElevated: string;

  // Extra semantic surfaces used in screens
  errorDark:    string;
  successDark:  string;
}

// ─── Light Theme ──────────────────────────────────────────────────────────────

export const lightColors: AppColors = {
  // Backgrounds
  background:          palette.offWhite,
  backgroundSecondary: palette.ivory,
  backgroundTertiary:  palette.cream,
  surface:             palette.white,
  surfaceSecondary:    palette.warmGray100,
  elevated:            palette.white,

  // Text
  textPrimary:   palette.warmGray800,
  textSecondary: palette.warmGray600,
  textTertiary:  palette.warmGray500,
  textInverse:   palette.white,
  textAccent:    palette.goldDark,

  // Brand
  primary:        palette.goldDark,
  primaryLight:   palette.gold,
  primarySurface: '#FDF5E0',

  // Borders
  border:      palette.warmGray300,
  borderLight: palette.warmGray200,
  borderDark:  palette.warmGray400,
  divider:     palette.warmGray200,

  // Status
  success:        palette.success,
  successSurface: '#E6FAF3',
  warning:        palette.warning,
  warningSurface: '#FEF6E4',
  error:          palette.error,
  errorSurface:   '#FDEDED',
  info:           palette.info,
  infoSurface:    '#EAF3FC',

  // Misc
  shadowColor:       palette.warmGray700,
  cardGradientStart: '#FFFDF8',
  cardGradientEnd:   '#F5EDD8',

  // Tabs
  tabActive:   palette.goldDark,
  tabInactive: palette.warmGray400,
  tabBar:      palette.white,

  // Utility
  white:       palette.white,
  darkBorder:  palette.warmGray300, // neutral equivalent in light mode
  warmGray100: palette.warmGray100,

  // Neon — neutral/brand equivalents so light-mode code compiles without guards
  neonCyan:   palette.goldDark,   // maps to primary action colour
  neonGreen:  palette.success,
  neonPurple: '#9B72C8',
  neonBlue:   palette.info,
  neonPink:   palette.error,
  neonYellow: palette.warning,
  gold:       palette.gold,

  // Dark-surface neutrals — light equivalents
  darkNavy:     palette.warmGray200,
  darkCard:     palette.white,
  darkSurface:  palette.warmGray100,
  darkElevated: palette.white,

  // Extra semantic
  errorDark:   palette.error,
  successDark: palette.success,
};

// ─── Dark Theme ───────────────────────────────────────────────────────────────

export const darkColors: AppColors = {
  // Backgrounds
  background:          palette.obsidian,
  backgroundSecondary: palette.darkNavy,
  backgroundTertiary:  palette.darkSurface,
  surface:             palette.darkCard,
  surfaceSecondary:    palette.darkSurface,
  elevated:            palette.darkElevated,

  // Text
  textPrimary:   '#E8F0FF',
  textSecondary: '#8A9DC4',
  textTertiary:  '#5A6E8A',
  textInverse:   palette.obsidian,
  textAccent:    palette.neonCyan,

  // Brand
  primary:        palette.neonCyan,
  primaryLight:   '#66F9FF',
  primarySurface: '#001A1E',

  // Borders
  border:      palette.darkBorder,
  borderLight: '#162030',
  borderDark:  '#263A52',
  divider:     palette.darkBorder,

  // Status
  success:        palette.successDark,
  successSurface: '#00200F',
  warning:        palette.warningDark,
  warningSurface: '#1F1900',
  error:          palette.errorDark,
  errorSurface:   '#200000',
  info:           palette.infoDark,
  infoSurface:    '#001433',

  // Misc
  shadowColor:       '#000000',
  cardGradientStart: '#0D1220',
  cardGradientEnd:   '#0A1628',

  // Tabs
  tabActive:   palette.neonCyan,
  tabInactive: '#3A4A62',
  tabBar:      palette.darkCard,

  // Utility
  white:       palette.white,
  darkBorder:  palette.darkBorder,
  warmGray100: '#1A2535',

  // Neon accents — full values in dark mode
  neonCyan:   palette.neonCyan,
  neonGreen:  palette.neonGreen,
  neonPurple: palette.neonPurple,
  neonBlue:   palette.neonBlue,
  neonPink:   palette.neonPink,
  neonYellow: palette.neonYellow,
  gold:       palette.gold,

  // Dark-surface colours
  darkNavy:     palette.darkNavy,
  darkCard:     palette.darkCard,
  darkSurface:  palette.darkSurface,
  darkElevated: palette.darkElevated,

  // Extra semantic
  errorDark:   palette.errorDark,
  successDark: palette.successDark,
};