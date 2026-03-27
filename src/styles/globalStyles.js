// Global stylesheet for the app
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { borderRadius } from './borderRadius';

export const globalStyles = {
  screen: {
    flex: 1,
    backgroundColor: colors.primary.white,
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.primary.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginVertical: spacing.sm,
    marginHorizontal: spacing.lg,
    shadowColor: colors.secondary.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    color: colors.primary.darkBlue,
    fontFamily: typography.fontFamily,
  },
};
