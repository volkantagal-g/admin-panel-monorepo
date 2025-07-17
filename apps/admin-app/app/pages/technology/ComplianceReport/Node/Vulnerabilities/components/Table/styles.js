import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    vulnerableRow: {
      backgroundColor: 'rgba(250, 137, 125, 0.28)',
      '& > td': { background: 'transparent!important' },
      '&:hover': { backgroundColor: 'rgba(250, 137, 125, 0.37)' },
    },
    nonVulnerableRow: {
      backgroundColor: 'rgba(174, 245, 154, 0.28)',
      '& > td': { background: 'transparent!important' },
      '&:hover': { backgroundColor: 'rgba(174, 245, 154, 0.37)' },
    },
  };
});
