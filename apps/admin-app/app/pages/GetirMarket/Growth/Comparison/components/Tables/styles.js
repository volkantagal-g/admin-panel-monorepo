import { createUseStyles } from 'react-jss';

export default createUseStyles({
  emptyDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    minHeight: '165px',
    padding: '1rem',
    margin: '0 0 2px 0',
  },
  emptyDivDescription: {
    fontWeight: 'bold',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
  },
});
