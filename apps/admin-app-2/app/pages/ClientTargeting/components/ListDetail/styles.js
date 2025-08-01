import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    flexColumn: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    textWrapper: { padding: '.5rem', width: '100%' },
    buttonWrapper: { marginRight: '1rem', backgroundColor: '#23AD44', color: '#fff' },
  };
});
