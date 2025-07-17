import { createUseStyles } from 'react-jss';

import bg from '@shared/assets/images/petal_grey_bg.svg';

export default createUseStyles(theme => {
  return {
    mainWrapper: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: `url(${bg})`,
    },
    childWrapper: { textAlign: 'left' },
    countryCard: {
      borderRadius: 8,
      padding: 20,
      width: 525,
      minHeight: 325,
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
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
      margin: '5px',
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
