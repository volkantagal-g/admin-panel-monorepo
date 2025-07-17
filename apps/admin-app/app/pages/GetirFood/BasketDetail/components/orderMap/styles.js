import { createUseStyles } from 'react-jss';

export default createUseStyles({
  mapWrapper: {
    height: '400px',
    maxHeight: 'calc(100vh - 200px)',
    border: '1px solid #edf1f2',
    borderTop: 'none',
  },
  mapTitle: { fontSize: '12px' },
  titleContent: {
    backgroundColor: '#f6f8f8',
    padding: '5px',
    border: '1px solid #edf1f2',
    borderBottom: 'none',
  },
});
