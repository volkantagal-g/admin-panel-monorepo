import { createUseStyles } from 'react-jss';

export default createUseStyles({
  jsonDetailContainer: {
    maxHeight: '80vh',
    marginBottom: 0,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    '& button': { marginBottom: '10px' },
  },
});
