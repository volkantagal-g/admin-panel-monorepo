import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    tableSearchWrapper: { padding: theme.spacing(2) },
    tableSearchInput: { width: 188, marginBottom: theme.spacing(2), display: 'block' },
    tableSearchButton: { marginRight: theme.spacing(2), width: 90 },
    tableSearchResetButton: { width: 90 },
  };
});
