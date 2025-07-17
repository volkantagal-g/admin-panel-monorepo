import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    tableTitle: {
      height: '48px',
      display: 'flex',
      opacity: '1',
      padding: '0px 12px',
      alignItems: 'center',
      borderBottom: '1px solid rgb(240, 240, 240)',
      gap: '4px',
      backgroundColor: 'rgb(250, 250, 250)',
      fontSize: '14px',
    },
    tableFooter: {
      display: 'flex',
      gap: '4px',
      justifyContent: 'right',
      paddingRight: '8px',
    },
  };
});
