import { createUseStyles } from 'react-jss';

import { borderRadius, colors, fontSizes, fontWeights, spacing } from '@app/pages/CommerceIntelligence/styleVariables';

export default createUseStyles({
  wrapper: { backgroundColor: colors.backgroundWhite },
  tabs: {
    '& .ant-tabs-nav': {
      marginBottom: 0,
      padding: `0 ${spacing.lg}`,
      borderBottom: 'none !important',
    },
    '& .ant-tabs-content': {
      backgroundColor: colors.backgroundWhite,
      borderRadius: borderRadius.md,
    },
    '& .ant-tabs-tabpane': { backgroundColor: colors.lightBackgroundGray },
    '& .ant-tabs-tabpane > div': { backgroundColor: colors.backgroundWhite },
    '& .ant-tabs-tab': { padding: `${spacing.sd} ${spacing.sm}` },
    '& .ant-tabs-tab + .ant-tabs-tab': { margin: `0 0 0 ${spacing.md}` },
    '& .ant-tabs-tab .ant-tabs-tab-btn': { fontWeight: fontWeights.semibold, fontSize: fontSizes.sm, color: colors.gray },
    '& .ant-tabs-tab:hover': { color: colors.gray },
    '& .ant-tabs-tab:hover .ant-tabs-tab-btn': { color: colors.gray },
    '& .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn': { color: colors.purple },
    '& .ant-tabs-ink-bar': {
      borderTopLeftRadius: borderRadius.xs,
      borderTopRightRadius: borderRadius.xs,
      height: '3px !important',
    },
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
  inactiveCountBadge: {
    backgroundColor: colors.badgeGray,
    color: colors.gray,
  },
});
