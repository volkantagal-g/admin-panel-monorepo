import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: { marginBottom: '1rem' },
  formItem: {
    marginBottom: 12,
    '& .ant-form-item-label': { paddingBottom: 0 },
  },
});
