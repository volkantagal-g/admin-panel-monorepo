import { createUseStyles } from 'react-jss';

import { colors, transitions } from '@app/pages/MarketProductChainManagement/styleVariables';

export default createUseStyles({
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  tabs: {
    backgroundColor: colors.backgroundWhite,
    '& .ant-tabs-tab': { padding: '12px' },
    '& .ant-tabs-nav': {
      borderBottom: `1px solid ${colors.borderGray}`,
      margin: 0,
      backgroundColor: colors.backgroundWhite,
    },
    '& .ant-tabs-content-holder': {
      backgroundColor: colors.backgroundWhite,
      height: '100%',
    },
    '& .ant-tabs-content': {
      backgroundColor: colors.backgroundWhite,
      height: '100%',
    },
    '& .ant-tabs-tabpane': {
      backgroundColor: colors.backgroundWhite,
      height: '100%',
    },
    '& .ant-tabs': {
      backgroundColor: colors.backgroundWhite,
      height: '100%',
    },
    '& .ant-tabs-card .ant-tabs-content': { backgroundColor: colors.backgroundWhite },
    '& .ant-tabs-card .ant-tabs-tabpane': { backgroundColor: colors.backgroundWhite },
    '& .ant-tabs-tab-btn': { color: colors.textDark },
    '& .ant-tabs-ink-bar': {
      height: '3px',
      borderRadius: '2px 2px 0 0',
    },
  },
  table: {
    backgroundColor: colors.backgroundWhite,
    '& .ant-table-thead > tr > th': {
      background: colors.tableHeaderBackground,
      color: colors.textDark,
      fontSize: '14px',
      fontWeight: 400,
    },
    '& .ant-table-tbody > tr > td': {
      color: colors.textDark,
      fontSize: '14px',
      fontWeight: 400,
      padding: '12px',
      height: '36px',
    },
    '& .ant-table-pagination': {
      padding: '4px 24px',
      margin: 0,
    },
    '& .ant-table-measure-row': { visibility: 'collapse' },
    '& .ant-table-cell-fix-left': { background: colors.tableHeaderBackground },
    '& .ant-table-thead > tr > th.ant-table-cell-fix-left': { background: colors.tableHeaderBackgroundFixed },
    '& .ant-table-wrapper': { backgroundColor: colors.backgroundWhite },
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
  button: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
  },
  linkButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: colors.textDark,
    background: 'none',
    fontSize: '12px',
    padding: '0px',
  },
  menu: {
    boxShadow: `0px 2px 6px -1px ${colors.boxShadowLight}, 0px 8px 24px -4px ${colors.boxShadowDark}`,
    borderRadius: '8px',
    padding: '4px',
    width: '250px',
    '& .ant-dropdown-menu-item ': { padding: '12px' },
  },
  image: {
    height: '18px',
    width: '18px',
  },
  actionsColumn: { display: 'flex', justifyContent: 'flex-end' },
  redActionLine: { color: colors.dangerRed },
  smallMenu: {
    boxShadow: `0px 2px 6px -1px ${colors.boxShadowLight}, 0px 8px 24px -4px ${colors.boxShadowDark}`,
    borderRadius: '8px',
    padding: '4px',
    width: '150px',
    '& .ant-dropdown-menu-item ': { padding: '12px' },
  },
});
