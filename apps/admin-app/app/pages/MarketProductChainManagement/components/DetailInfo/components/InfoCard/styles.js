import { createUseStyles } from 'react-jss';

import { colors } from '@app/pages/MarketProductChainManagement/styleVariables';

export default createUseStyles({
  cardContainer: {
    position: 'relative',
    background: colors.backgroundWhite,
    borderRadius: '12px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    border: `1px solid ${colors.borderGray}`,
    boxShadow: `0 1px 3px ${colors.boxShadowLight}`,
    height: 'auto',
    minHeight: '100px',
  },

  contentWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: '16px',
    display: 'flex',
    alignItems: 'flex-start',
    transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  contentLayer: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    gap: '16px',
  },

  iconSection: {
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '4px',
  },

  imageWrapper: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: `${colors.purple}10`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  icon: {
    width: '24px',
    height: '24px',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    objectFit: 'contain',
  },

  placeholderIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: `${colors.textLight}10`,
    color: colors.textLight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 500,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  textSection: {
    flex: '1 1 auto',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  title: {
    color: colors.textLight,
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '16px',
  },

  content: {
    color: colors.textDark,
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
  },

  domainTag: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 8px',
    borderRadius: '6px',
    background: `${colors.purple}10`,
    color: colors.purple,
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '16px',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: `${colors.purple}20`,
      transform: 'translateY(-1px)',
    },
  },

  skeletonLayer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },

  skeletonAvatar: {
    flex: '0 0 40px',
    '& .ant-skeleton-avatar': { background: `${colors.purple}10 !important` },
  },

  skeletonContent: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  skeletonTitle: {
    width: '40% !important',
    height: '16px !important',
    '& .ant-skeleton-input': {
      height: '16px !important',
      background: `${colors.textLight}10 !important`,
    },
  },

  skeletonValue: {
    width: '60% !important',
    height: '20px !important',
    '& .ant-skeleton-input': {
      height: '20px !important',
      background: `${colors.textLight}15 !important`,
    },
  },

  loading: {
    '& $contentLayer': { opacity: 0 },
    '& $skeletonLayer': { opacity: 1 },
  },

  '@global': {
    '@keyframes shimmer': {
      '0%': { backgroundPosition: '200% 0' },
      '100%': { backgroundPosition: '-200% 0' },
    },
  },
});
