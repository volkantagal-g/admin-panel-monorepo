import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    cardBorder: { border: `1px solid ${theme.color.primary} !important` },
    card: {
      '& .ant-card-body': { padding: '8px 0 0' },
      zIndex: 1000,
    },
    productTitle: {
      width: '100%',
      height: '40px',
      lineHeight: '15px',
      fontSize: '11px',
      textAlign: 'center',
      overflow: 'hidden',
      margin: '5px 0',
      padding: '0 5px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    productPrice: ({ isActive }) => {
      return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: theme.color.primary,
        backgroundColor: isActive ? '#FFD10D' : '#E0E0E0',
        padding: '5px',
        fontSize: '13px',
      };
    },
    detailButton: {
      color: '#FFD10D',
      backgroundColor: theme.color.primary,
      fontWeight: 'bold',
      height: '24px',
      width: '24px',
      marginLeft: 4,
      lineHeight: '24px',
      padding: 0,
      fontSize: '11px',
      borderRadius: '4px',
      '&:hover': {
        backgroundColor: theme.color.primary,
        color: 'white',
      },
    },
  };
});
