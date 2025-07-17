import { createUseStyles } from 'react-jss';

import { borderRadius, colors, fontSizes, fontWeights, spacing, transitions } from '@app/pages/CommerceIntelligence/styleVariables';

export default createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    background: colors.backgroundWhite,
    transition: transitions.default,
  },
  confidenceWrapper: {
    margin: spacing.lg,
    border: `1px solid ${colors.borderGray}`,
    borderRadius: borderRadius.md,
    backgroundColor: colors.backgroundWhite,
    overflow: 'hidden',
  },
  countBadge: {
    backgroundColor: colors.lightPurple,
    padding: '1px 6px',
    borderRadius: borderRadius.sm,
    marginLeft: spacing.sm,
    fontSize: fontSizes.xs,
    color: colors.purple,
    fontWeight: fontWeights.semibold,
  },
});
