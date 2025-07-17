import { createUseStyles } from 'react-jss';

export default createUseStyles({
  shopStatistics: {
    position: 'absolute',
    bottom: -15,
    left: 0,
    backgroundColor: '#ffffff',
    width: '100%',
    borderRadius: '3px',
    height: '20px',
    fontSize: '12px',
    '& table': {
      width: '100%',
      textAlign: 'center',
      '& td:hover': {
        cursor: 'pointer',
        backgroundColor: '#dee5e7',
      },
    },
  },
});
