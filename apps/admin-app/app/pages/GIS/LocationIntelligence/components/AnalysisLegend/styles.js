import { createUseStyles } from 'react-jss';

export default createUseStyles({
  cardWrapper: {
    position: 'absolute',
    left: 10,
    bottom: 40,
    zIndex: 2,
    width: 'auto',
    height: 'auto',
    backgroundColor: 'white',
  },
  legendItem: {
    width: 'auto',
    '& .ant-row': { width: '200px' },
  },
  colorSquare: {
    width: '5px',
    height: '5px',
  },
});
