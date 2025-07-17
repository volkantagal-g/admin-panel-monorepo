import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    mapWrapper: {
      height: '100%',
      maxHeight: 'calc(100vh - 124px)',
      '@media (max-width: 768px)': { overflow: 'auto' },
    },
    cardWrapper: { height: 'calc(100vh - 124px)' },
  };
});
