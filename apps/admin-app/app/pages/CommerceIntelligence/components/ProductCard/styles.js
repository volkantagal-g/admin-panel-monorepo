import { createUseStyles } from 'react-jss';

import { colors, fontSizes, fontWeights, spacing } from '@app/pages/CommerceIntelligence/styleVariables';

export default createUseStyles({
  productContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  productImage: {
    width: 84,
    height: 84,
    objectFit: 'cover',
    borderRadius: '50%',
    border: `2px solid ${colors.badgeGray}`,
    padding: 12,
    background: colors.backgroundWhite,
  },
  productInfo: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.inputBlack,
    paddingTop: 6,
  },
  productSize: {
    color: colors.inputBlack,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    lineHeight: '18px',
  },
  competitorImage: {
    width: 'auto',
    height: 16,
    objectFit: 'contain',
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
  },
});
