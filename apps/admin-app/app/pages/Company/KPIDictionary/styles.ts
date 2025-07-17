import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  pageContainer: { padding: '24px' },
  pageHeader: {
    paddingBottom: '24px',
    fontSize: '22px',
    fontWeight: 600,
    // @ts-ignore
    color: theme?.color?.primary,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContainer: {
    boxShadow: '0px 3px 12px -1px rgba(28, 52, 84, 0.13), 0px 2px 4px -1px rgba(28, 55, 90, 0.08)',
    borderRadius: '8px',
    padding: '22px',
    '& .ant-card-head': {
      padding: '2px',
      fontSize: 18,
      lineHeight: '24px',
      marginBottom: 12,
      '& .ant-card-head-title': { paddingTop: '2px' },
    },
    '& .ant-card-body': { padding: '4px' },
  },
  inputContainer: {
    borderRadius: '6px',
    '& .ant-select-selector': { borderRadius: '6px !important' },
  },
  filterFormContainer: { '& .ant-form-item': { marginBottom: '12px' } },
  filterCardContainer: { paddingBottom: '8px' },
  tableCardContainer: { paddingBottom: '8px', paddingTop: '18px' },
  excelDownloadMenuButton: { width: '100%', textAlign: 'left' },
  modalListItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  modalAcronym: {
    minWidth: 80,
    fontSize: 14,
    marginRight: 16,
    fontWeight: 600,
    textAlign: 'left',
  },
  modalDivider: {
    width: 1,
    height: 24,
    background: '#e0e0e0',
    margin: '0 16px',
  },
  modalFullName: {
    fontSize: 14,
    textAlign: 'left',
    flex: 1,
  },
  modalSpin: {
    textAlign: 'center',
    padding: '32px 0',
  },
  modalButtonLeft: {
    marginRight: 4,
    marginLeft: 0,
    display: 'flex',
    alignItems: 'center',
  },
  modalButtonIcon: {
    marginRight: 0,
    fontSize: 14,
  },
}));
