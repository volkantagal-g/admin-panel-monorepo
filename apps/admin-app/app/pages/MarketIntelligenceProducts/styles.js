import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    selectTitle: {
      marginBottom: '5px important',
      width: '120px',
      fontSize: '12px',
      fontWeight: 600,
    },
    selectTitleIcon: {
      width: '15px',
      height: '15px',
      marginBottom: '5px',
    },
    filterContainer: {
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'center',
    },
    tableFilterContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'nowrap',
    },
    selectItem: { minWidth: '100%', maxWidth: '200px' },
    tableFilterItem: { marginRight: '15px', minWidth: '155px', maxWidth: '200px' },
    selectComponent: { width: '120px' },
    demoOptionLabel: { fontSize: '10px' },
    competitorSelectImg: {
      width: '15px',
      height: '15px',
    },
    tableColumns: { whiteSpace: 'pre-wrap', overflowWrap: 'break-word' },
    tableColumnsImage: { height: '50px' },
    priceRowContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    priceColContainer: { display: 'flex', alignItems: 'center' },
    priceRowItem: {
      justifyContent: 'center',
      flexDirection: 'column',
      minWidth: 'fit-content',
    },
    priceRowItemImg: { marginRight: '10px' },
    discountedPrice: { fontSize: '10px', color: 'grey' },
    arrowImg: {
      height: '15px',
      marginTop: 'auto',
      marginBottom: 'auto',
      marginRight: '12px',
      minWidth: '15px',
    },
    tableSummaryCell: {
      fontWeight: 'bold',
      textAlign: 'left',
      color: 'black',
    },
    tableFilterMainContainer: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    excelExport: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      minWidth: '155px',
      width: '100%',
    },
    excelExportTooltip: { color: 'green' },
  };
});
