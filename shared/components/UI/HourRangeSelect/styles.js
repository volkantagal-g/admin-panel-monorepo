import { createUseStyles } from 'react-jss';

export default createUseStyles({
  rangeSliderWrapper: {
    width: '100%',
    '@media (max-width: 1200px)': { width: '100%' },
    '@media (min-width: 1400px)': { margin: '0 4px' },
  },
});
