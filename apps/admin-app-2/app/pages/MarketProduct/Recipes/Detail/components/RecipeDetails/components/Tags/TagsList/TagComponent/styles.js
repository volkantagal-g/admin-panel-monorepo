import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    tagContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: theme.spacing(2),
    },
    inputWrapper: { flex: 1 },
    arrowsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    arrowButton: { margin: -4 },
    arrowIcon: { color: theme.color.primary },
    deleteIcon: { color: theme.color.status.danger },
  };
});
