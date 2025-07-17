import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return { 
    container: { display: 'flex', justifyContent: 'flex-end' },
    closeButton: { 
      backgroundColor: '#EE3A38', 
      color: '#fff', 
      fontSize: '1rem', 
      display: 'flex', 
    },
    plusButton: { 
      backgroundColor: '#24AC43', 
      color: '#fff', 
      fontSize: '1rem', 
      display: 'flex', 
    },
    selectWrapper: { width: '4rem' },
    paginateButton: { marginRight: '0' },
    activeButton: { 
      backgroundColor: '#5D3EBC', 
      color: '#FFD10D',
      marginRight: '0',
    },
  };
});