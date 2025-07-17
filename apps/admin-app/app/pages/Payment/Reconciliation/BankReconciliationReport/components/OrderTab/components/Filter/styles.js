import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  checkBoxCol: { display: 'flex', alignItems: 'center', marginTop: theme.spacing(4) },
  form: { '&  .ant-form-item': { marginBottom: '8px' } },
}));
