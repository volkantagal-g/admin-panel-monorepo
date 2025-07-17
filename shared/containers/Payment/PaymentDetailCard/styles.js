import { createUseStyles } from 'react-jss';

export default createUseStyles({
  provisionInfoWrapper: { display: 'flex', flexDirection: 'column', gap: 2 },
  provisionInfoLabel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    lineHeight: '0.75rem',
  },
});
