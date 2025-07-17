import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    alignRight: { textAlign: 'right' },
    text: { fontSize: '18px' },
    wrapper: { display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'flex-end' },
  };
});
