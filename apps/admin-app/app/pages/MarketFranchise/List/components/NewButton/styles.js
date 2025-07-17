import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    newButton: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: '0', 
      textDecoration: 'none',
      '&:hover': {
        width: 'auto',
        textDecoration: 'none',
      },
      '& > a': {
        color: 'inherit',
        textDecoration: 'none',
        '&:hover, &:focus': {
          color: 'inherit',
          textDecoration: 'none',
        },
      },
    },
  };
});