import { createUseStyles } from 'react-jss';

export default createUseStyles({
  customProgressHeader: {
    width: '100%',
    marginTop: '10px',
    textAlign: 'center',
  },
  customProgress: {
    display: 'flex',
    width: '100%',
    height: '20px',
    marginBottom: '20px',
    boxShadow: 'none',
    borderRadius: '4px',
    overflow: 'hidden',
    backgroundColor: '#edf1f2',
  },
  customBar: {
    height: '100%',
    textAlign: 'center',
    color: '#fff',
  },
  bgInfo: { backgroundColor: '#23b7e5' },
  bgInfoDarker: { backgroundColor: '#359BBA' },
  bgInfoLighter: { backgroundColor: '#75CBE6' },
  bgPrimary: { backgroundColor: '#5D3EBD' },
});
