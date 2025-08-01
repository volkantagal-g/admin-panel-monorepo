import { createUseStyles } from 'react-jss';

export default createUseStyles({
  filterItem: { width: '100%' },
  inputGroup: { display: 'flex' },
  minToMaxBox: {
    width: '50px !important',
    borderLeft: 0,
    borderRight: 0,
    pointerEvents: 'none',
    backgroundColor: '#fff',
  },
  fullWidth: { width: '100%' },
  w40: { width: '40%' },
  w60: { width: '60%' },
  margin8: { margin: '8px 0px' },
  antDefaultForm: { '& .ant-form-item': { marginBottom: '8px' } },
});
