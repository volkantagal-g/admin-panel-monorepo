import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    card: { display: 'flex', gap: '12px', flexDirection: 'column' },
    alert: { width: 'max-content' },
    button: { display: 'flex', alignItems: 'center', width: 'max-content', gap: '8px', flexDirection: 'row-reverse' },
  };
});
