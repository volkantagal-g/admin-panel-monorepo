import { createUseStyles } from 'react-jss';

export default createUseStyles(() => ({
  root: {
    display: 'flex',
    gap: 10,
    justifyContent: 'space-between',
  },
  controls: {
    display: 'flex',
    gap: 10,
  },
  cardNumber: {
    width: '100%',
    maxWidth: 250,
  },
}));
