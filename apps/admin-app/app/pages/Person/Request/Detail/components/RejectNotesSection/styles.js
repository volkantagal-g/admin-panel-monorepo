import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    row: { marginTop: theme.spacing(2) },
    confirmButton: { marginLeft: theme.spacing(2) },
    redBorderColor: {
      borderColor: 'red',
      '&:hover': { borderColor: 'red' },
      '&:focus': { borderColor: 'red', boxShadow: 'none' },
    },
    errorText: { color: 'red' },
  };
});
