import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: { marginBottom: 5 },
  fullWidth: { width: '100%' },
  filterBtn: { marginBottom: 0 },
  formItem: {
    marginBottom: 12,
    '& .ant-form-item-label': { paddingBottom: 0 },
  },
});
