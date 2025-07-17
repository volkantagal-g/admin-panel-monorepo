const styles = theme => {
  return {
    container: { '& .responsiveCol': { flexGrow: 3 } },
    addon: {
      height: '100%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      padding: '0 11px',
      color: 'rgba(0, 0, 0, 0.85)',
      fontWeight: 'normal',
      backgroundColor: '#fafafa',
      borderTop: '1px solid #d9d9d9',
      borderRight: '1px solid #d9d9d9',
      borderBottom: '1px solid #d9d9d9',
      borderRadius: 2,
      transition: 'all 0.3s',
    },
    border: { border: theme.border.type1 },
  };
};

export default styles;
