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
    '& .ant-tag': {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '22px',
    },
  },
  cardContainer: {
    boxShadow: '0px 3px 12px -1px rgba(28, 52, 84, 0.13), 0px 2px 4px -1px rgba(28, 55, 90, 0.08)',
    borderRadius: '8px',
    padding: '22px 22px 12px 22px',
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
  profilePictureImage: { width: '150px' },
  dialingCodeSelect: {
    width: '95px !important',
    borderRadius: '6px 0 0 6px !important',
    '& .ant-select-selector': {
      width: '95px !important',
      borderRadius: '6px 0 0 6px !important',
    },
    '& .ant-select-arrow': { right: '11px !important' },
    '& .ant-select-clear': { right: '11px !important' },
  },
  phoneNumberInput: {
    width: 'calc(100% - 95px) !important',
    borderRadius: '0 6px 6px 0 !important',
  },
  buttonBase: { borderRadius: '6px' },
  actionButtonContainer: {
    display: 'flex',
    justifyContent: 'end',
    '& button': { borderRadius: '6px' },
  },
  cancelActionButton: { marginRight: '6px' },
  surveyActionButton: { marginRight: '6px' },
  cancelTerminationButton: { marginRight: '6px' },
  borderRad6: { borderRadius: '6px' },
  tabContainer: {
    '& .ant-tabs-nav': { margin: '0' },
    '& .ant-tabs-content-holder': {
      backgroundColor: '#fff',
      padding: '16px 8px',
    },
  },
}));
