/* eslint-disable no-param-reassign */
import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    container: {
      padding: '8px 8px 0 8px',
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
      backgroundColor: '#f5f5f5',
      width: '100%',
      '& > table:first-child': { marginBottom: '10px' },
      fontSize: '12px !important',
      fontWeight: '700',
      zIndex: 9999,
      '@media (min-width: 768px)': { maxWidth: 'calc(100vw - 550px)' },
    },
    tableContainer: { overflow: 'auto' },
    table: {
      borderRadius: '6px',
      marginBottom: '4px',
      backgroundColor: '#fff',
      width: '100%',
      '& td': { padding: '1px', textAlign: 'right', height: '22px' },
      '& tr:nth-child(2n)': { backgroundColor: '#F9F9F9', width: '100%' },
      '@media (max-width: 768px)': { '& td': { padding: '2px 4px' } },
    },
    totalCountryContainer: {
      display: 'flex',
      fontWeight: 'normal',
    },
    totalCountryData: {
      color: '#363f44',
      fontWeight: '700',
      margin: '0 6px',
    },
    rightMargin: { marginRight: '4px' },
    hiddenTable: { '@media (max-width: 768px)': { display: 'none' } },
    mobileTabs: {
      display: 'none',
      fontWeight: '400',
      '@media (max-width: 768px)': {
        display: 'flex',
        marginBottom: '6px',
      },
    },
    tabButton: {
      display: 'flex',
      alignItems: 'center',
      borderRadius: '6px',
      marginRight: '6px',
    },
    emptyCell: {
      // if all of the cells in a row empty, they will collapse
      height: '0px !important',
    },
  };
});
