import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    filterContainer: {
      zIndex: 998,
      position: 'absolute',
      top: '0.5rem',
      left: '0.5rem',
      display: 'flex',
      '& > div': {
        alignItems: 'center',
        justifyContent: 'center',
      },
      '@media (max-width: 768px)': {
        flexDirection: 'column',
        width: 'calc(40% - 20px)',
        '&:hover': { zIndex: 99999 },
        '& > div': { width: '100%' },
        '& > button': { width: '20px' },
      },
    },
    selectDropdown: { zIndex: 999999 },
    filterContainerCollapsed: { '@media (max-width: 768px)': { '& > div': { display: 'none' } } },
    eachFilter: {
      minWidth: '180px',
      '@media (max-width: 768px)': {
        minWidth: 'auto',
        width: '100%',
      },
    },
    collapseButton: { minWidth: '40px', '@media (min-width: 768px)': { display: 'none' } },
  };
});
