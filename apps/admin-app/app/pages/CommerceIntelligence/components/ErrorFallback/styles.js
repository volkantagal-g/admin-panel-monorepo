import { createUseStyles } from 'react-jss';

import { borderRadius, colors, fontSizes, spacing } from '@app/pages/CommerceIntelligence/styleVariables';

export default createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    textAlign: 'center',
  },
  error: {
    margin: `${spacing.md} 0`,
    padding: spacing.md,
    backgroundColor: colors.errorFallbackBackground,
    borderRadius: borderRadius.xs,
    color: colors.errorFallbackText,
    fontSize: fontSizes.sm,
    maxWidth: '100%',
    overflow: 'auto',
  },
});
