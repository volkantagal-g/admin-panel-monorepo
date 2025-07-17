import { createUseStyles } from 'react-jss';

export default createUseStyles({
  formContainer: {
    padding: '24px 0',
    '& > div': {
      marginBottom: 16,
      '&:last-child': { marginBottom: 0 },
    },
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: '100%',
  },
});
