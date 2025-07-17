import { createUseStyles } from 'react-jss';

import { colors, transitions } from '@app/pages/MarketProductChainManagement/styleVariables';

export default createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '24px',
    height: 'auto',
    transition: transitions.default,
  },
  configurationContent: {
    borderRadius: '12px',
    padding: '24px',
    transition: transitions.default,
    minHeight: '400px',
    '&:hover': { boxShadow: `0 4px 12px ${colors.boxShadowLight}` },
  },
  formContainer: {
    width: '100%',
    height: 'auto',
  },
  formGroup: { marginBottom: '16px' },
  formItem: {
    margin: 0,
    flex: 1,
    '& .ant-form-item-control': { width: '100%' },
  },
  selectWithSearchButton: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    width: '100%',
  },
  searchDarkstoresButton: {
    minWidth: '120px',
    height: '48px',
    padding: '4px 12px',
    fontSize: '13px',
    marginBottom: 0,
  },
  searchButton: {
    flex: 'none',
    marginLeft: '16px',
  },
  label: {
    marginBottom: '8px',
    fontWeight: 500,
  },
  row: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
    '@media (max-width: 768px)': { flexDirection: 'column' },
    '& > *': { flex: 1 },
  },
  selectWithButton: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    '& > *:first-child': { flex: 1 },
  },
  selectAllButton: {
    height: 48,
    margin: 0,
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
  },
  warehouseRow: { marginTop: '16px' },
  // Save Confirmation Modal styles
  saveConfirmationModal: {
    '& .ant-modal-content': {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    },
    '& .ant-modal-header': {
      background: 'transparent',
      borderBottom: 'none',
      padding: '24px 24px 0',
    },
    '& .ant-modal-title': {
      fontSize: '20px',
      fontWeight: 600,
      color: '#6750A4',
    },
    '& .ant-modal-body': {
      padding: '16px 24px',
      fontSize: '16px',
      color: '#49454F',
    },
    '& .ant-modal-footer': {
      borderTop: 'none',
      padding: '0 24px 24px',
    },
    '& .ant-btn': {
      height: '40px',
      padding: '0 24px',
      fontSize: '14px',
      fontWeight: 500,
      borderRadius: '8px',
    },
    '& .ant-btn-default': {
      color: '#6750A4',
      borderColor: 'transparent',
      background: '#F4EFF4',
      '&:hover': { background: '#E8DEF8' },
    },
    '& .ant-btn-primary': {
      background: '#6750A4',
      borderColor: 'transparent',
      '&:hover': { background: '#7C67B2' },
    },
    '& .ant-modal-close': {
      color: '#49454F',
      '&:hover': { color: '#6750A4' },
    },
  },
  modalMask: {
    background: 'rgba(28, 27, 31, 0.32) !important',
    backdropFilter: 'blur(4px) !important',
  },
});
