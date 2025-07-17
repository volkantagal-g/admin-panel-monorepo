import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    mapWrapper: {
      height: '400px',
      maxHeight: 'calc(100vh - 200px)',
      border: '1px solid #edf1f2',
      borderTop: 'none',
    },
    customerInfo: {
      padding: '10px',
      marginBottom: '10px',
      background: '#ffffff',
      fontSize: '12px',
      borderBottom: '1px solid #edf1f2',
    },
    actionsMenu: { textAlign: 'right' },
    mapTitle: { fontSize: '12px' },
    titleContent: {
      backgroundColor: '#f6f8f8',
      padding: '5px',
      border: '1px solid #edf1f2',
      borderBottom: 'none',
    },
    insightStatusSuccess: {
      backgroundColor: theme.color.green,
      color: theme.color.white,
      padding: '2px 10px',
    },
    insightStatusWarning: {
      backgroundColor: theme.color.status.warning,
      color: theme.color.white,
      padding: '2px 10px',
    },
    insightStatusDanger: {
      backgroundColor: theme.color.status.danger,
      color: theme.color.white,
      padding: '2px 10px',
    },
    coverFullWidth: { width: '100%' },
  };
});
