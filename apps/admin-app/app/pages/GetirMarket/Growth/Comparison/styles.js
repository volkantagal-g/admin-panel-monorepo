import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  container: { marginTop: '8px' },
  negativePercent: { color: theme.color.status.danger },
  positivePercent: { color: theme.color.status.succes },
}));
