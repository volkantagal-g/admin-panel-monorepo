import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    courierCountsWrapper: {
      boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
      background: '#f5f5f5',
      width: '300px',
      borderRadius: '5px',
      right: 0,
      position: 'fixed',
      top: '50px',
      overflow: 'scroll',
      zIndex: '200',
      maxHeight: '501px !important',
      '& table': { margin: '0.25rem' },
      '& > table tr td:first-child': {
        width: '37%',
        textAlign: 'left',
      },
      '& > table tr td': {
        width: '24px',
        fontSize: '11px',
        textAlign: 'right',
      },
      '& > table tr td:nth-child(3)': { color: 'green' },
      '& > table tr td:nth-child(4)': { color: '#5D3EBC' },
      '& > table tr td:nth-child(7)': { color: 'red' },
      '& > table tr td:nth-child(8)': { color: '#1BD5DE' },
    },
    rowName: {
      fontWeight: 'bold',
      fontSize: '12px',
    },
    searchBox: {
      border: '1px solid #eaeff0',
      width: 'calc(100% - 1rem)',
      margin: '0.25rem',
      fontSize: '12px',
      borderRadius: '5px',
    },
    parentTableRow: { borderBottom: '1px solid #eaeff0' },
    expandedRow: {
      padding: '0.25rem',
      border: '1px solid #ccc',
    },
    expandedTable: {
      width: '100%',
      minHeight: 'auto',
      maxHeight: '140px',
      overflowY: 'scroll',
      display: 'block',
    },
    domainFilterButtons: {
      borderRadius: '8px',
      width: '80px',
      fontSize: '11px',
    },
    tableHeaderDiv: { marginLeft: '5px' },
    tableHeaderInfoButton: {
      borderRadius: '8px',
      fontSize: '11px',
      marginLeft: '5px',
    },
    domainFilterButtonsParentDiv: {
      justifyContent: 'space-around',
      display: 'flex',
    },
    headerTitle: {
      float: 'left',
      fontSize: '12px',
      marginLeft: '5px',
      marginTop: '3px',
    },
    warehouseFilterTitle: {
      fontSize: '12px',
      marginLeft: '5px',
      marginTop: '3px',
    },
  };
});
