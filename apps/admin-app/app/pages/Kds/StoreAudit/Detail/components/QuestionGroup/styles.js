import { createUseStyles } from 'react-jss';

export default createUseStyles({
  collapseWrapper: { width: '100%' },
  groupContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  groupNameText: { textAlign: 'left' },
  scoreText: { textAlign: 'right' },
  labelText: {
    fontWeight: 'bold',
    fontSize: '15px',
    flex: '1',
  },
});
