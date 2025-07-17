import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  form: {},
  formItem: { marginBottom: theme.spacing(1) },
  formActionButtonContainer: {
    display: 'flex',
    justifyContent: 'end',
  },
}));
