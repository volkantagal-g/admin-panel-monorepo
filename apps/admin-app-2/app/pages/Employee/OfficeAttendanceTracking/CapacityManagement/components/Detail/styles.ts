import { createUseStyles } from 'react-jss';

export default createUseStyles({
  importSection: {
    display: 'flex',
    flexDirection: 'column',
    height: '300px',
    background: 'white',
    borderRadius: '4px',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    fontSize: '16px',

    '& .anticon': { fontSize: '48px' },
  },
  invalidEmailContainer: {
    maxHeight: '150px',
    overflow: 'scroll',
  },
});
