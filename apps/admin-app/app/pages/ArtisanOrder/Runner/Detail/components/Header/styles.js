import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    pageTitle: {
      fontSize: '22px',
      color: 'rgba(24, 39, 57, 0.94)',
      marginBottom: '0',
    },
    badge: {
      backgroundColor: 'rgba(93, 62, 188, 0.2)',
      borderRadius: '6px',
      color: theme.color.darkPrimary,
      fontSize: '12px',
      fontWeight: 600,
      padding: '0 5px',
    },
  };
});
