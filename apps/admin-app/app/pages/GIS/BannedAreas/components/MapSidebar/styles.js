import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    cardWrapper: { height: 'calc(100vh - 124px)', overflow: 'auto' },
    switchWrapper: { marginTop: '5px' },
  };
});
