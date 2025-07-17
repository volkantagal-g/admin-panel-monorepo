import { createUseStyles } from 'react-jss';

export default createUseStyles(() => ({
  fileList: {
    gap: 10,
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  fileListItem: {
    gap: 8,
    display: 'flex',
    padding: '0 4px',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:hover': { background: '#F5F5F5' },
  },
  fileName: {
    width: '100%',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: 'transparent',
    borderColor: 'transparent',
    cursor: 'pointer',
    padding: 0,
    margin: 0,
    '&:hover': { textDecoration: 'underline' },
  },
  note: { placeContent: 'center' },
}));
