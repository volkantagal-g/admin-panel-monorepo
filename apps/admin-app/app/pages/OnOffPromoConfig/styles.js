import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  const constant = {
    fontWeightBolder: 'bolder !important',
    fontWeight: '600 !important',
    color: 'crimson !important',
  };

  return {
    selectContainer: {
      width: '250px',
      zIndex: '2',
    },
    configInput: { marginTop: '10px !important' },
    cityFilter: { marginRight: '20px !important' },
    gridButtonsContainer: {
      display: 'flex',
      justifyContent: 'space-between !important',
      paddingLeft: '40px',
    },
    filterSelect: { width: '215px' },
    poptitleGridContainer: {
      marginLeft: '3rem',
      width: '50rem',
    },
    changeConfigButton: {
      height: 'auto !important',
      width: 'auto !important',
      padding: '3px 5px !important',
    },
    gridItemButton: {
      alignSelf: 'center',
      justifyContent: 'flex-start',
    },
    gridTableTitle: { display: 'flex' },
    onOffTable: { marginTop: '20px' },
    poptitleGridItemFirstChild: {
      color: constant.color,
      fontWeight: constant.fontWeightBolder,
      fontSize: '2rem',
      marginBottom: '10px !important',
    },
    poptitleGridItemSecondChild: {
      color: constant.color,
      fontWeight: constant.fontWeightBolder,
      fontSize: '1.5rem',
      marginBottom: '10px !important',
    },
    poptitleGridItemThirdChild: {
      fontWeight: constant.fontWeight,
      fontSize: '20px',
      marginBottom: '10px !important',
    },
    poptitleSpanEffected: {
      color: 'var(--text-secondary)',
      fontWeight: constant.fontWeight,
    },
    specialEffected: {
      color: 'var(--text-secondary)',
      fontWeight: constant.fontWeight,
      fontSize: '20px',
    },
    onoffPopconfirmBox: {
      fontWeight: constant.fontWeight,
      marginBottom: '20px !important',
    },
    cityListsSpan: {
      fontWeight: constant.fontWeight,
      fontSize: '17px',
    },
    questionCircle: {
      color: constant.color,
      fontSize: '50px !important',
    },
    radioGroup: {
      display: 'flex',
      alignItems: 'center',
    },
    radioButton: {
      width: '120px !important',
      height: '110px',
      padding: '11px',
    },
    radioContainer: { width: 'fit-content !important' },
    configModalContainer: { width: 'min-content !important' },
    effectedCitiesList: {
      position: 'absolute',
      left: '300px',
    },
    selectTitle: {
      marginBottom: '5px important',
      width: '120px',
      fontSize: '15px',
      fontWeight: 600,
    },
    selectTitleImg: {
      width: '15px',
      height: '15px',
      marginBottom: '5px',
    },
  };
});
