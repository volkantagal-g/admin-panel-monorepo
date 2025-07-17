import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    colInfo: {
      display: 'flex',
      flexDirection: 'column',
    },
    infoTitle: { fontWeight: 'bold' },
    textDanger: { color: theme.color.red },
  };
});
