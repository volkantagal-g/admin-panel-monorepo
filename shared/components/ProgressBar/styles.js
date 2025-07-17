import { createUseStyles } from 'react-jss';

export default createUseStyles({
  progressBar: {
    display: 'flex',
    width: '100%',
    height: '20px',
    borderRadius: '4px',
    overflow: 'hidden',
    cursor: 'default',
  },
  progressBarItem: {
    height: '100%',
    textAlign: 'center',
    color: '#fff',
    transition: '.5s',

    '&:nth-child(1)': { backgroundColor: '#5D3EBD' },
    '&:nth-child(2)': { backgroundColor: '#0077b6' },
    '&:nth-child(3)': { backgroundColor: '#00b4d8' },
    '&:nth-child(4)': { backgroundColor: '#75CBE6' },
    '&:nth-child(5)': { backgroundColor: '#90e0ef' },
  },
});
