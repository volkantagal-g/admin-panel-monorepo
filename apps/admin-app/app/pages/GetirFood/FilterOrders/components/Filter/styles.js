import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  filterWrapper: { width: '100%' },
  filterSelect: { width: '100%' },
  danger: { color: theme.color.status.danger },
  success: { color: theme.color.status.success },
}));
