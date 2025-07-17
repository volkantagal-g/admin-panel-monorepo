import { createUseStyles } from 'react-jss';

import { borderRadius, colors, spacing, transitions } from '@app/pages/CommerceIntelligence/styleVariables';

export default createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    background: colors.backgroundWhite,
    transition: transitions.default,
  },
  smartPricingWrapper: {
    margin: spacing.lg,
    border: `1px solid ${colors.borderGray}`,
    borderRadius: borderRadius.md,
    backgroundColor: colors.backgroundWhite,
    overflow: 'hidden',
  },
  contentPadding: { padding: spacing.lg },
});
