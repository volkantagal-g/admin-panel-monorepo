import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    panelHeader: { lineHeight: '32px' },
    panelWrapperDanger: {
      transition: '500ms all ease',
      color: '#a94442 !important',
      backgroundColor: '#f2dede !important',
      borderColor: '#ebccd1 !important',
    },
    panelWrapperSuccess: {
      transition: '500ms all ease',
      color: '#31708f !important',
      backgroundColor: '#d9edf7 !important',
      borderColor: '#bce8f1 !important',
    },
  };
});