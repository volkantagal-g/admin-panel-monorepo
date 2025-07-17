import { createUseStyles } from 'react-jss';

export default createUseStyles({
  dynamicCol: {
    fontSize: '1rem',
    '& label .anticon-cloud-upload': { marginLeft: '4px', marginRight: '4px' },
  },
  formItem: { '& label ': { fontWeight: 'bold' } },
  formItemWrapper: {
    border: '1px solid gray',
    borderRadius: '3px',
    padding: '4px',
  },
});
