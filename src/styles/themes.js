// Theme configurations for light (default) and dark (future)
import { colors } from './colors';

export const lightTheme = {
  background: colors.primary.white,
  surface: colors.secondary.lightGray,
  text: {
    primary: colors.secondary.charcoal,
    secondary: colors.secondary.darkGray,
    tertiary: colors.secondary.mediumGray,
  },
  border: colors.secondary.mediumGray,
};

export const darkTheme = {
  background: '#121212',
  surface: '#1E1E1E',
  text: {
    primary: '#FFFFFF',
    secondary: '#B0B0B0',
    tertiary: '#808080',
  },
  border: '#2C2C2C',
};
