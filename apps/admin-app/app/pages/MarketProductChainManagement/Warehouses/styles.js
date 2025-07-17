import { createUseStyles } from 'react-jss';

import { colors, transitions } from '@app/pages/MarketProductChainManagement/styleVariables';

export default createUseStyles({
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  tabs: {
    '& .ant-tabs-tab': { padding: '12px 8px' },
    '& .ant-tabs-nav-wrap': { padding: '0px 24px' },
    '& .ant-tabs-nav': {
      borderBottom: '1px solid #F0F1F3 !important',
      margin: 0,
    },
    '& .ant-tabs-ink-bar': {
      height: '3px !important',
      borderRadius: '2px 2px 0 0',
    },
  },
  table: {
    '& .ant-table-thead > tr > th': {
      background: '#F0F1F3 !important',
      color: '#191919',
      fontSize: '14px',
      fontWeight: 400,
    },
    '& .ant-table-tbody > tr > td': {
      color: '#191919',
      fontSize: '14px',
      fontWeight: 400,
      padding: '12px !important',
      height: '36px !important',
    },
    '& .ant-table-pagination': {
      padding: '4px 24px',
      margin: 0,
    },
    '& .ant-table-measure-row': { visibility: 'collapse' },
    '& .ant-table-cell-fix-left': { background: '#F0F1F3 !important' },
    '& .ant-table-thead > tr > th.ant-table-cell-fix-left': { background: '#D1D4DA !important' },
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
  },
  linkButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#191919',
    background: 'none',
    fontSize: '12px',
    padding: '0px !important',
  },
  menu: {
    boxShadow:
      '0px 2px 6px -1px rgba(28, 55, 90, 0.16), 0px 8px 24px -4px rgba(28, 50, 79, 0.38)',
    borderRadius: '8px',
    padding: '4px !important',
    width: '250px',
    '& .ant-dropdown-menu-item ': { padding: '12px !important' },
  },
  image: {
    height: '18px !important',
    width: '18px !important',
  },
  actionsColumn: { display: 'flex', justifyContent: 'flex-end' },
  redActionLine: { color: '#FF3939 !important' },
  smallMenu: {
    boxShadow:
      '0px 2px 6px -1px rgba(28, 55, 90, 0.16), 0px 8px 24px -4px rgba(28, 50, 79, 0.38)',
    borderRadius: '8px',
    padding: '4px !important',
    width: '150px',
    '& .ant-dropdown-menu-item ': { padding: '12px !important' },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '24px',
    maxWidth: '100%',
    margin: '0 auto',
    boxSizing: 'border-box',
    background: colors.backgroundLight,
    transition: transitions.default,
    '& > *': {
      width: '100%',
      borderRadius: '8px',
      overflow: 'hidden',
      background: colors.backgroundWhite,
      borderColor: colors.borderGray,
      boxShadow: `0 1px 3px ${colors.boxShadowLight}`,
      transition: transitions.default,
    },
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    perspective: 1000,
    transform: 'translate3d(0, 0, 0)',
  },
});
