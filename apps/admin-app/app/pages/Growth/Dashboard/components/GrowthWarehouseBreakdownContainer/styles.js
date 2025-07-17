import { createUseStyles } from 'react-jss';

export default createUseStyles({
  radioGroup: { display: 'flex' },
  radioButton: {
    width: '100%',
    '@media (max-width: 576px)': {
      height: 'auto',
      lineHeight: '20px',
    },
  },
  collapse: {
    '& .ant-collapse-header': { padding: '8px !important' },
    '& .ant-collapse-content > .ant-collapse-content-box': { padding: '0' },
  },
  warehouseRow: { backgroundColor: '#ffffff' },
  cityRow: { backgroundColor: '#ececec' },
});
