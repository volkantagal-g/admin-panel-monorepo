import { createUseStyles } from 'react-jss';

export default createUseStyles({
  noFieldMargin: {
    '& .ant-form-item': { margin: '0 0 5px 0' },
    '& label': { marginBottom: 0 },
  },
});