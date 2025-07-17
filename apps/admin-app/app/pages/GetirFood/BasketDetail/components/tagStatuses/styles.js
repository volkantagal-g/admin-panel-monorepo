import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    tag: { color: theme.color.white, fontWeight: '700' },
    productStatus: { borderRadius: '7px', fontSize: '10px' },
    paymentStatuses: { color: theme.color.white, borderRadius: '7px', fontSize: '10px' },
    tagSuccessStatus: {
      padding: '0px 5px',
      marginBottom: '5px',
      backgroundColor: theme.color.status.success,
      color: theme.color.white,
      borderRadius: '7px',
      fontSize: '10px',
    },
    tagWarningStatus: {
      padding: '0px 5px',
      backgroundColor: theme.color.status.warning,
      color: theme.color.white,
      borderRadius: '7px',
      fontSize: '10px',
    },
    tagDangerStatus: {
      padding: '0px 5px',
      backgroundColor: theme.color.status.danger,
      color: theme.color.white,
      borderRadius: '7px',
      fontSize: '10px',
    },
    tagFoodStatus: {
      backgroundColor: theme.color.green,
      color: theme.color.white,
      borderRadius: '7px',
      fontSize: '10px',
    },
    jsonButton: {
      backgroundColor: theme.color.lightGray,
      color: theme.color.title,
      fontSize: '10px',
      margin: '0 3px',
    },
    tagGetirColorPurple: { backgroundColor: theme.color.getir.purple },
  };
});
