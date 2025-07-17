import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    chart: { fontSize: '12px !important', backgroundColor: 'white', marginTop: '2px', borderRadius: '2px' },
    header: {
      fontSize: '13px',
      padding: '0 1px 1px 4px',
      '& > span': { marginRight: '3px' },
      display: 'flex',
    },
  };
});
