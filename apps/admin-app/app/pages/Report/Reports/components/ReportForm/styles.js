import { createUseStyles } from 'react-jss';

export default createUseStyles({
  form: {
    backgroundColor: 'white',
    padding: '6px 12px',
    '&  .ant-form-item': { marginBottom: '12px' },
    '& .ant-checkbox': { outline: '2px solid gray' },
  },
  formItem: { '& label ': { fontWeight: 'bold' } },

  actionButtonContainer: {
    display: 'flex',
    justifyContent: 'end',
  },
});
