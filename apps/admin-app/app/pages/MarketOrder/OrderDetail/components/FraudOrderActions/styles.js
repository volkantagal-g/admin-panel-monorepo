import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    button: {
      color: '#ffffff',
      fontWeight: '700',
    },
    activeStatus: { backgroundColor: '#5D3EBD', color: '#ffffff' },
  };
});
