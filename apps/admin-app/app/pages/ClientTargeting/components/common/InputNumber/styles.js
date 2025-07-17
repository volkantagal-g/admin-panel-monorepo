import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return { 
    container: { height: "32px", width: '100%' },
    suffixContainer: {
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      padding: '4px 0',
    },
    caretBackgroundColor: { 
      backgroundColor: '#F6F6F6',
      '&:hover': { backgroundColor: '#E8E8E8' },
    },
  };
});