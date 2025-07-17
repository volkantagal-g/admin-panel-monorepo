import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    container: {
      marginTop: '1rem',
      display: 'flex',
      flexDirection: 'row',
      '& table td': { padding: '4px 6px !important' },
      '& table th': { padding: '4px 6px !important' },
      '& > div:first-child': { width: 'calc(55% - 4px)', marginRight: '4px' },
      '& > div:last-child': { width: '45%' },
      '@media (max-width: 768px)': { flexDirection: 'column', '& > div': { width: '100% !important' } },
    },
  };
});
