import { createUseStyles } from 'react-jss';

import { colors } from '@app/pages/MarketProductChainManagement/styleVariables';

export default createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    perspective: 1000,
    transform: 'translate3d(0, 0, 0)',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    transform: 'translate3d(0, 0, 0)',
    willChange: 'transform',
  },
  tabs: {
    '& .ant-tabs-tab': {
      padding: '12px 8px',
      transform: 'translate3d(0, 0, 0)',
      willChange: 'transform',
      backfaceVisibility: 'hidden',
    },
    '& .ant-tabs-nav-wrap': {
      padding: '0px 24px',
      transform: 'translate3d(0, 0, 0)',
    },
    '& .ant-tabs-nav': {
      borderBottom: `1px solid ${colors.borderGray}`,
      margin: 0,
      transform: 'translate3d(0, 0, 0)',
      willChange: 'transform',
    },
    '& .ant-tabs-ink-bar': {
      height: '3px',
      borderRadius: '2px 2px 0 0',
      willChange: 'transform',
      transform: 'translate3d(0, 0, 0)',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  table: {
    '& .ant-table-thead > tr > th': {
      background: colors.tableHeaderBackground,
      color: colors.textDark,
      fontSize: '14px',
      fontWeight: 400,
      transform: 'translate3d(0, 0, 0)',
    },
    '& .ant-table-tbody > tr > td': {
      color: colors.textDark,
      fontSize: '14px',
      fontWeight: 400,
      padding: '12px',
      height: '36px',
      transform: 'translate3d(0, 0, 0)',
      transition: 'background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    '& .ant-table-tbody > tr:hover > td': { willChange: 'background-color' },
    '& .ant-table-pagination': {
      padding: '4px 24px',
      margin: 0,
      transform: 'translate3d(0, 0, 0)',
      willChange: 'transform',
    },
    '& .ant-table-measure-row': { visibility: 'collapse' },
    '& .ant-table-cell-fix-left': {
      background: colors.tableHeaderBackground,
      transform: 'translate3d(0, 0, 0)',
      willChange: 'transform',
    },
    '& .ant-table-thead > tr > th.ant-table-cell-fix-left': {
      background: colors.tableHeaderBackgroundFixed,
      transform: 'translate3d(0, 0, 0)',
    },
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    transform: 'translate3d(0, 0, 0)',
    willChange: 'transform',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  linkButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: colors.textDark,
    background: 'none',
    fontSize: '12px',
    padding: '0px',
    transform: 'translate3d(0, 0, 0)',
    willChange: 'transform',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  menu: {
    boxShadow: `0px 2px 6px -1px ${colors.boxShadowLight}, 0px 8px 24px -4px ${colors.boxShadowDark}`,
    borderRadius: '8px',
    padding: '4px',
    width: '250px',
    transform: 'translate3d(0, 0, 0)',
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden',
    '& .ant-dropdown-menu-item': {
      padding: '12px',
      transform: 'translate3d(0, 0, 0)',
      transition: 'background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  image: {
    height: '18px',
    width: '18px',
    transform: 'translate3d(0, 0, 0)',
    willChange: 'transform',
  },
  actionsColumn: {
    display: 'flex',
    justifyContent: 'flex-end',
    transform: 'translate3d(0, 0, 0)',
    willChange: 'transform',
  },
  redActionLine: {
    color: colors.dangerRed,
    transform: 'translate3d(0, 0, 0)',
  },
  smallMenu: {
    boxShadow: `0px 2px 6px -1px ${colors.boxShadowLight}, 0px 8px 24px -4px ${colors.boxShadowDark}`,
    borderRadius: '8px',
    padding: '4px',
    width: '150px',
    transform: 'translate3d(0, 0, 0)',
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden',
    '& .ant-dropdown-menu-item': {
      padding: '12px',
      transform: 'translate3d(0, 0, 0)',
      transition: 'background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  errorResult: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    animation: '$fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden',
    transform: 'translate3d(0, 0, 0)',
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0.25,
      transform: 'translate3d(0, 10px, 0)',
    },
    '100%': {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
    },
  },
  '@global': {
    '.ant-table': {
      transform: 'translate3d(0, 0, 0)',
      backfaceVisibility: 'hidden',
      perspective: 1000,
      willChange: 'transform',
      '& .ant-table-body': {
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
      },
    },
    '.ant-table-row': {
      willChange: 'transform',
      transform: 'translate3d(0, 0, 0)',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    '.ant-pagination-item': {
      willChange: 'transform',
      transform: 'translate3d(0, 0, 0)',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    '.ant-select-dropdown': {
      willChange: 'transform, opacity',
      transform: 'translate3d(0, 0, 0)',
      backfaceVisibility: 'hidden',
    },
    '.ant-modal': {
      willChange: 'transform, opacity',
      transform: 'translate3d(0, 0, 0)',
      backfaceVisibility: 'hidden',
      '& .ant-modal-content': {
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
      },
    },
    '*': {
      scrollBehavior: 'smooth',
      '&::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '&::-webkit-scrollbar-track': { background: 'transparent' },
      '&::-webkit-scrollbar-thumb': {
        background: colors.borderGray,
        borderRadius: '4px',
        '&:hover': { background: colors.textLight },
      },
    },
  },
});
