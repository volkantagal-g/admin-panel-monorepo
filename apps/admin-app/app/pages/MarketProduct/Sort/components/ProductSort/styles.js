import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    cardBorder: { border: `1px solid ${theme.color.primary} !important` },
    productHeader: {
      background: theme.color.primary,
      color: '#FFD10D',
      padding: '10px',
      fontWeight: 'bold',
      marginBottom: '10px',
      textAlign: 'center',
    },
    productSelection: {
      fontSize: '11px',
      backgroundColor: '#cccccc',
      border: '1px solid #cccccc',
      padding: '10px 3px',
    },
    productSelectionBox: {
      fontSize: '11px',
      backgroundColor: 'white',
      border: '1px solid #CCCCCC',
      margin: '3px',
      padding: '3px 10px',
      borderRadius: '5px',
    },
    productSubTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'black',
      display: 'flex',
      alignItems: 'center',
    },
    detailButton: {
      color: '#FFD10D',
      backgroundColor: '#5D3EBC',
      fontWeight: 'bold',
      height: '24px',
      width: '24px',
      marginLeft: 4,
      lineHeight: '24px',
      padding: 0,
      fontSize: '11px',
      borderRadius: '4px',
      '&:hover': { backgroundColor: '#5D3EBC', color: 'white' },
    },
  };
});
