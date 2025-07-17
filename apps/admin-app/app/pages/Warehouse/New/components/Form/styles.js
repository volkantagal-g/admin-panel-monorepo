import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    mapWrapper: { marginTop: '10px' },
    sapWarehouseContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    sapWarehouseNameContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: '8px',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sapReferenceCode: {
      color: '#fff',
      display: 'inline-flex',
      padding: '4px 6px',
      fontSize: '10px',
      fontWeight: '400',
      lineHeight: '1',
      borderRadius: '20px',
      backgroundColor: '#5D3EBC',
      alignItems: 'center',
      justifyContent: 'center',
    },
    sapWarehouseName: {
      fontSize: '12px',
      color: '#000',
    },
    sapReferenceCodeContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: '4px',
      alignItems: 'center',
      justifyContent: 'center',
    },
    sapReferenceCodeLabel: {
      fontSize: '10px',
      fontWeight: '500',
      color: '#000',
    },
    disabledOption: {
      backgroundColor: '#F4F4F4',
      color: '#FF6565',
    },
  };
});
