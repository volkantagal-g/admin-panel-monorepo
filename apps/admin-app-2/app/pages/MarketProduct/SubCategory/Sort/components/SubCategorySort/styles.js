import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    cardBorder: { border: `1px solid ${theme.color.primary} !important` },
    listHeader: {
      fontWeight: 'bold',
      color: '#FFD10D',
      backgroundColor: '#5D3EBC',
      padding: '10px',
      marginBottom: '10px',
    },
    sortableItem: {
      zIndex: 1000,
      '& .ant-card-body': { padding: 12 },
    },
  };
});
