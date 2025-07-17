import { createUseStyles } from 'react-jss';

export default createUseStyles(({
  wrapper: { width: '100%' },
  numberInput: {
    display: 'flex',
    borderRadius: '4px',
    width: '100%',
    height: '32px',
    padding: '3px 0',
  },
  rightInput: { marginLeft: '5px', width: 'calc(100% - 5px)' },
}));
