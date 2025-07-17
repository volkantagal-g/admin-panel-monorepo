import { createUseStyles } from 'react-jss';

export default createUseStyles({
  pageContainer: { padding: '24px' },
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
  warningContainer: {
    marginBottom: '5px',
    borderRadius: '8px',
  },
});
