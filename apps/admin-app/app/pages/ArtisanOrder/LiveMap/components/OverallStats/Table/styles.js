import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    selectedIdentifierActiveOrdersTable: {
      borderColor: '#dee5e7',
      borderRadius: '15px',
      marginBottom: '5px !important',
      borderBottom: '1px solid #dee5e7',
      '& th, td': { padding: '3px 5px' },
      '& td:not([rowspan]):hover': {
        backgroundColor: '#dee5e7',
        cursor: 'pointer',
      },
    },
    tableHeaders: {
      textAlign: 'center',
      fontSize: '11px',
      fontWeight: 400,
    },
    cityCountryName: {
      textAlign: 'center',
      fontSize: '12px',
      borderRight: '1px solid #8e9294',
      minWidth: '55px !important',
    },
    periodName: {
      textAlign: 'left',
      fontSize: '11px',
      borderRight: '1px solid #8e9294',
      minWidth: '70px !important',
    },
    activeFoodOrderCountCell: {
      textAlign: 'right',
      fontSize: '11px',
      width: '40px !important',
    },
    activeOrderErrorCountCell: {
      textAlign: 'right',
      whiteSpace: 'nowrap',
      fontSize: '11px',
      color: '#900C3F',
      width: '65px !important',
    },
    financialCell: {
      textAlign: 'right',
      fontSize: '11px',
      color: '#27C24C',
      width: '45px !important',
    },
    overallRevenueCell: {
      textAlign: 'right',
      fontSize: '11px',
      color: '#FF974A',
      width: '45px !important',
    },
    orderCountCell: {
      textAlign: 'right',
      fontSize: '11px',
      color: '#5D3EBC',
      width: '45px !important',
    },
    financialGrowthCell: {
      textAlign: 'right',
      color: '#27C24C',
      fontSize: '11px !important',
      verticalAlign: 'bottom',
      width: '45px !important',
      '& span[data-growth="positive"]': { color: '#27C24C' },
      '& span[data-growth="negative"]': { color: '#F05050' },
    },
    dedicatedCourierCountCell: {
      textAlign: 'right',
      width: '45px !important',
      fontSize: '11px',
    },
    G10Cell: {
      textAlign: 'right',
      width: '45px !important',
      fontSize: '11px',
      color: '#0C30D6',
    },
    GBCellHead: {
      textAlign: 'right',
      width: '45px !important',
      fontSize: '11px',
    },
    GBCell: {
      textAlign: 'right',
      width: '45px !important',
      fontSize: '11px',
    },
  };
});
