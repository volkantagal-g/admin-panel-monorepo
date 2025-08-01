import { createUseStyles } from 'react-jss';

export default createUseStyles({
  statisticContainer: {
    height: 'calc(100% - 10px)',
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    padding: '4px 8px',
    justifyContent: 'space-around',
    color: '#58666E',
    fontSize: '14px',
  },
  valueContainer: {
    display: 'flex',
    fontSize: '24px',
    color: '#58666E',
  },
});
