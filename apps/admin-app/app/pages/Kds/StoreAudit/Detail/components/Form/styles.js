import { createUseStyles } from 'react-jss';

export default createUseStyles({
  errorText: {
    fontWeight: 'bold',
    color: 'red',
  },
  error: {
    border: '1px solid red',
    '@media (max-width: 1200px)': { '& .ant-card-head': { height: '130px' } },
  },
  card: { '@media (max-width: 1200px)': { '& .ant-card-head': { height: '130px' } } },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    '& div:nth-child(1)': { margin: '0 10px' },
  },
  totalScore: {
    flex: '1',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  expandButton: { marginLeft: '16px' },
  roundInput: {
    marginLeft: '10px',
    '& .ant-input-number': { width: '50%' },
  },
  rowContainer: { width: '100%' },
  numberInput: { width: '100%' },
  dateInput: { width: '100%' },
  highlightButton: {
    '& > span': {
      display: 'inline-flex',
      alignItems: 'center',
      lineHeight: 1.6,
    },
    '& > span:before': {
      content: '""',
      width: '12px',
      border: '2px solid #991b1b',
      height: '12px',
      display: 'inline-block',
      maxWidth: '12px',
      maxHeight: '12px',
      marginRight: '4px',
      borderRadius: '50%',
      backgroundColor: '#991b1b',
    },
  },
  highlightButtonActive: { '& > span:before': { backgroundColor: 'transparent' } },
});
