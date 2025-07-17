import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    markerInfoHeader: {
      justifyContent: 'space-between',
      alignItems: 'center',
      display: 'flex',
      width: '300px',
      right: 0,
      position: 'fixed',
      top: '520px',
      backgroundColor: '#f5f5f5',
      borderRadius: '5px',
      boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
      fontSize: '13px',
    },
    markerInfoTable: {
      justifyContent: 'space-between',
      alignItems: 'center',
      display: 'flex',
      width: '300px',
      right: 0,
      top: '550px',
      padding: '0 5px',
      position: 'fixed',
      backgroundColor: '#f5f5f5',
      borderRadius: '5px',
      boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
      fontSize: '13px',
    },
    markerInfoCell: {
      justifyContent: 'space-around',
      width: '300px',
      fontSize: '11px',
    },
    domainTypeTag: {
      fontSize: '8px',
      marginTop: '2px',
      marginLeft: '2px',
      fontWeight: 'bold',
      width: '60px',
      display: 'flex',
      borderRadius: '5px',
      justifyContent: 'center',
    },
  };
});
