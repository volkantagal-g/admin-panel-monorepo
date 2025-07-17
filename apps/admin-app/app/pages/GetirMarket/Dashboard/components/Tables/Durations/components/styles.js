import { createUseStyles } from 'react-jss';

export default createUseStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    fontSize: '12px',
    margin: '0 2px',
  },
  valueContainer: { margin: '0 4px 0 0', fontWeight: 700 },
});
