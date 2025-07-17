import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    summary: { '& *': { fontWeight: 'bold' }, fontWeight: 'bold', textAlign: 'center' },
    summaryLabel: { fontWeight: 'bold' },
    link: { height: 'auto', padding: '0', border: 'none', textDecoration: 'underline' },
  };
});
