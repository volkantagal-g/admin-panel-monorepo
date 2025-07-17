import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    childWrapper: { textAlign: 'left' },
    countryCard: {
      borderRadius: 8,
      padding: 20,
      width: 525,
      height: 325,
    },
    countryWrap: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    countryList: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      borderRadius: 8,
      margin: '0 10px 10px 0',
      cursor: 'pointer',
      border: '1px solid transparent',
      '&:hover': { border: `1px solid ${theme.color.primary}` },
    },
    countryTitle: {
      fontSize: '18px',
      marginBottom: '25px',
      textAlign: 'center',
      fontWeight: 'bold',
      color: theme.color.primary,
    },
    countryName: { fontSize: '13px' },
    countryFlag: { fontSize: '20px' },
  };
});
