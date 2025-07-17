import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    pieCharts: {
      display: 'flex',
      justifyContent: 'start',
      flexWrap: 'wrap',
      '& > *': { minWidth: 229 },
    },
    card: { padding: 12 },
  };
});
