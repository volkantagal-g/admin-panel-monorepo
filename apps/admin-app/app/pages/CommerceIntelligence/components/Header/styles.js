import { createUseStyles } from 'react-jss';

import { primary } from '@shared/components/GUI/styles/guiThemes';

import { colors, fontSizes, fontWeights, spacing } from '@app/pages/CommerceIntelligence/styleVariables';

export default createUseStyles({
  header: { width: '100%' },
  body: {
    padding: `${spacing.md2} ${spacing.lg}`,
    display: 'flex',
    background: colors.backgroundWhite,
    boxSizing: 'border-box',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    color: primary,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
  },
  buttonWrapper: {
    display: 'flex',
    gap: spacing.sm,
    alignItems: 'center',
  },
  button: {
    borderRadius: '8px',
    fontWeight: fontWeights.medium,
  },
});
