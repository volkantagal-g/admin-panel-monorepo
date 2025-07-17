import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    wrapper: { width: '100%' },
    buttonWrapper: { display: 'flex', flex: 1, justifyContent: 'flex-end' },
  };
});
