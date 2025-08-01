import { createUseStyles } from 'react-jss';

import { colors } from '@app/pages/MarketProductChainManagement/styleVariables';

const useStyles = createUseStyles({
  configurationContent: { backgroundColor: colors.lightBackgroundGray, padding: '24px' },
  header: {
    marginBottom: '24px',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '240px',
    backgroundColor: colors.backgroundWhite,
    borderRadius: '8px',
    border: `1px solid ${colors.borderGray}`,
    padding: '16px',
  },
  hasTables: { minHeight: 'auto' },
  headerTitle: {
    fontSize: '16px',
    color: colors.purple,
    fontWeight: 700,
    marginBottom: '16px',
  },
  warehouseSelect: {
    maxWidth: '350px',
    width: '350px',
    alignSelf: 'flex-start',
    '& .ant-select-selector': {
      borderRadius: '4px',
      border: `1px solid ${colors.borderGray}`,
    },
  },
  tableContainer: {
    position: 'relative',
    overflow: 'hidden',
    '& .ant-table-wrapper': { height: '100%' },
    '& .ant-table': { height: '100%' },
    '& .ant-table-body': {
      overflow: 'auto !important',
      height: '400px !important',
    },
    flex: '1 1 500px',
    minWidth: 0,
    backgroundColor: colors.backgroundWhite,
    borderRadius: '8px',
    border: `1px solid ${colors.borderGray}`,
    padding: '16px',
  },
  tablesWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    marginBottom: '24px',
  },
  tableHeaderWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',

  },
  searchInput: {
    width: '320px',
    '& .ant-input': {
      borderRadius: '4px',
      border: `1px solid ${colors.borderGray}`,
    },
  },
  saveButtonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  moveIcon: {
    width: 16,
    height: 16,
  },
  moveButton: { '&.ant-btn': { backgroundColor: colors.lightPurple, padding: '8px 10px' } },
  tableCell: {
    display: 'flex',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: '16px',
    margin: 0,
    color: colors.purple,
    fontWeight: 700,
  },
  columnName: { flex: 3 },
  columnProducts: { minWidth: '100px' },
  columnPlatform: { minWidth: '200px' },
  columnMove: { flex: '0 0 40px' },
  unmatchedColumnName: { flex: 4.5 },
  unmatchedColumnProducts: { flex: 4.5, minWidth: '80px' },
  boldText: { fontWeight: 500 },
  addPlatformButton: {
    '&.ant-btn': {
      backgroundColor: colors.lightPurple,
      padding: '8px 12px',
    },
  },
});

export default useStyles;
