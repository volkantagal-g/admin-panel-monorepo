import { createUseStyles } from 'react-jss';

import { SIDEBAR_Z_INDEX } from '@shared/constants/styling';
import { colors } from '@app/pages/MarketProductChainManagement/styleVariables';

export default createUseStyles({
  modal: {
    '& .ant-modal-content': {
      padding: '24px',
      borderRadius: '12px',
    },
    '& .ant-modal-header': {
      textAlign: 'center',
      marginBottom: 0,
      borderBottom: 'none',
    },
    '& .ant-modal-title': {
      color: colors.purple,
      fontSize: 18,
      fontWeight: 600,
    },
    '& .ant-modal-close': { display: 'none' },
    '& .ant-select-arrow': { right: '20px', top: '20px' },
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 0',
  },
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 24,
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    '& $selectContainer': { maxWidth: '400px' },
  },
  filterSelect: {
    width: '100%',
    '& .ant-select-selector': { borderRadius: '8px' },
    '& .ant-select-arrow': { right: '20px' },
  },
  selectWithButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    justifyContent: 'space-between',
    '& $filterSelect': { flex: 1 },
    '& .ant-select': {
      '& .ant-select-arrow': {
        display: 'block !important',
        right: '20px',
      },
    },
    '& button': { width: '96px' },
  },
  selectAllButton: {
    fontSize: '12px',
    whiteSpace: 'nowrap',
    minWidth: '80px',
    textAlign: 'center',
    height: '48px',
  },
  selectContainer: {
    flex: 1,
    width: '100%',
  },
  subtitle: {
    color: colors.textLight,
    marginBottom: 24,
  },
  table: {
    marginBottom: 24,
    '& .ant-table-thead > tr > th': {
      backgroundColor: colors.tableHeaderBackground,
      fontWeight: 500,
      color: colors.textLight,
      '&::before': { display: 'none' },
    },
    '& .ant-table-tbody > tr > td': { color: colors.textDark },
  },
  bulkEditContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  sortableHeader: {
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': { backgroundColor: colors.backgroundGrey },
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalContent: { position: 'relative' },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: colors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: SIDEBAR_Z_INDEX + 1,
  },
  deleteButton: {
    cursor: 'pointer',
    color: colors.dangerRed,
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    userSelect: 'none',
    '&:hover': { color: colors.dangerRedHover },
    '&.disabled': {
      cursor: 'not-allowed',
      color: colors.disabledGray,
      '&:hover': { color: colors.disabledGray },
    },
  },
  productNotFoundContent: {
    textAlign: 'center',
    padding: '8px',
  },
  selectWithClearContainer: {
    position: 'relative',
    width: '100%',
  },
  customClearIcon: {
    position: 'absolute',
    right: '44px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '8px',
    color: colors.backgroundWhite,
    cursor: 'pointer',
    zIndex: 10,
    padding: '4px',
    borderRadius: '50%',
    height: '13px',
    width: '13px',
    lineHeight: '5px',
    backgroundColor: colors.textLight,
    '&:hover': {
      color: colors.backgroundWhite,
      backgroundColor: colors.textLight,
    },
  },
});
