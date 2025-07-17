import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    statCards: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    },
  };
});
