import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    modal: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 2,
      backgroundColor: 'white',
      left: props => props.x,
      top: props => props.y,
      padding: '2px',
      maxWidth: '225px',
      borderRadius: '4px',
    },
    title: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  };
});
