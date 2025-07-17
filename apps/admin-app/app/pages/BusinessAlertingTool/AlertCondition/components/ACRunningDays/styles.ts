import { createUseStyles } from 'react-jss';

import theme from '@shared/jssTheme';

export default createUseStyles({
  // runningDayHoursContainer: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   gap: '8px',
  // },
  // dayContainer: {
  //   display: 'flex',
  //   gap: '8px',
  //   overflow: 'scroll',

  //   '&::-webkit-scrollbar': { display: 'none' },
  // },
  hourSelectionContainer: { marginBottom: '12px' },
  hoursContainer: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  allDaySection: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  tabTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  activeHourCard: {
    background: '#F3F0FE !important',
    border: '1px solid #5D3EBC !important',
    color: '#5D3EBC !important',
  },
  bulbFilled: {
    color: theme.color.getir.purple,
    scale: 1.2,
  },
});
