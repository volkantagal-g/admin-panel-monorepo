import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  filterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  filters: {
    display: 'flex',
    gap: theme.spacing(2),
    flexWrap: 'wrap',
  },
  rangeSliderWrapper: {
    width: 160,
    padding: '0 8px',
    '@media (max-width: 768px)': { width: '100%' },
    '@media (min-width: 1400px)': { margin: '0 4px' },
    '& > div': {
      marginTop: '4px !important',
      marginBottom: '16px !important',
    },
  },
  fullWidth: { width: '100%' },
}));
