import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
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
      margin: '5px',
      cursor: 'pointer',
      border: '1px solid transparent',
      '&:hover': { border: `1px solid ${theme.color.primary}` },
    },
    disabled: { opacity: 0.5 },
    currentCountry: { border: `1px solid ${theme.color.primary}` },
    countryName: { fontSize: '13px' },
    countryFlag: { fontSize: '20px' },
  };
});
