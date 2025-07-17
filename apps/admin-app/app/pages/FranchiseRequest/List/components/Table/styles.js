import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    hasBeforeApplication: {
      backgroundColor: '#faad14',
      '&:hover': { '&>td': { backgroundColor: '#ea9f09 !important' } },
    },
  };
});
