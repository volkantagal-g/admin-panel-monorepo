import { createUseStyles } from 'react-jss';

export default createUseStyles({
  statsTitle: {
    textAlign: 'center',
    '& .ant-statistic-title': { fontSize: '1rem' },
  },
  customCard: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& h5': {
      fontSize: '17px',
      marginBottom: '0',
      marginTop: '8px',
      color: '#AAAAAA',
    },
    '& p': {
      fontSize: '38px',
      fontWeight: '500',
      marginBottom: '0',
      '& small': {
        fontSize: '28px',
        color: 'grey',
        marginBottom: '0',
      },
    },
  },
});
