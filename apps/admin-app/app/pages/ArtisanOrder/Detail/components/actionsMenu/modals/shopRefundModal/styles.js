import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    buttonStyle: {
      display: 'block',
      width: '100%',
      border: 'none',
      color: '#fa0707',
      padding: '0 5px',
    },
    disabledButton: {
      display: 'block',
      width: '100%',
      border: 'none',
      color: '#dddddd' ,
      padding: '0 5px',
    },
  };
});
