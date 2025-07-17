import { createUseStyles } from 'react-jss';

export default createUseStyles({
  chartContainer:
    {
      '@media (max-width: 550px)': {
        '& .highcharts-root': { width: '100%' },
        '& .highcharts-container': { width: 'auto !important' },
      },
    },
});
