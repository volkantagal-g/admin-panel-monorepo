import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    tag: { color: '#ffffff', fontWeight: '700' },
    productStatus: { borderRadius: '7px', fontSize: '10px' },
    paymentStatuses: { color: '#ffffff', borderRadius: '7px', fontSize: '10px' },
    tagSuccessStatus: {
      padding: '0px 5px',
      marginBottom: '5px',
      backgroundColor: theme.color.status.success,
      color: '#ffffff',
      borderRadius: '7px',
      fontSize: '10px',
    },
    tagWarningStatus: {
      padding: '0 5px',
      backgroundColor: theme.color.status.warning,
      color: '#ffffff',
      borderRadius: '7px',
      fontSize: '10px',
    },
    tagArtisanStatus: {
      backgroundColor: theme.color.status.artisan,
      color: '#ffffff',
      borderRadius: '7px',
      fontSize: '10px',
    },
    imgTag: {
      border: 0,
      padding: 0,
      background: 'none',
    },
    jsonButton: {
      backgroundColor: theme.color.lightGray,
      color: theme.color.title,
      fontSize: '10px',
    },
  };
});
