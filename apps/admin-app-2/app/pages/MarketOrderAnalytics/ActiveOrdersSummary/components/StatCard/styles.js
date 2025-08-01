import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    statCard: {
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '200px',
      marginTop: 10,
      justifyContent: 'center',
      padding: '5px 10px',
      '& > h2': { width: '100%', fontSize: '1.2rem', textAlign: 'center', marginBottom: 5 },
      '& > p': { width: '100%', fontSize: '1.6rem', textAlign: 'center', margin: '0' },
    },
  };
});
