import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return { 
    form: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
    },
    maxWidth: { maxWidth: '212px' },
    buttonCol: { maxWidth: '212px', display: 'flex', justifyContent: 'end' },
  };
});
