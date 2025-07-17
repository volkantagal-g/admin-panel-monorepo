import { createUseStyles } from 'react-jss';

export default createUseStyles({
  spaceContainer: {
    width: '100%',
    flexWrap: 'wrap',
    padding: '0 0 4px 4px',
    '@media (min-width: 1200px)': {
      padding: '0 0 0px 4px',
      height: 45,
      marginTop: -8,
    },
  },
  divisionCountriesSelectInput: {
    width: 195,
    '@media (max-width: 1200px)': { width: '100%' },
    '& .ant-select-selection-item-content': { maxWidth: 75 },
    border: props => {
      if (props) {
        const {
          localSelectedDivisionCountries,
          defaultSelectedDivisionCountries,
        } = props;
        if (!localSelectedDivisionCountries && defaultSelectedDivisionCountries) {
          return '1px solid #432a97';
        }
        return null;
      }
      return null;
    },
  },
  citySelectInput: {
    width: 195,
    '@media (max-width: 1200px)': { width: '100%' },
    '& .ant-select-selection-item-content': { maxWidth: 75 },
  },
  domainTypeSelectInput: {
    width: '100px',
    '@media (max-width: 1200px)': { width: '100%' },
  },
  dateRangePicker: {
    width: 190,
    height: 32,
    '@media (max-width: 1200px)': { width: '100%' },
  },
  datePicker: {
    width: 100,
    height: 32,
    '@media (max-width: 1200px)': { width: '100%' },
  },
  radioButtonGroupContainer: { '& .ant-radio-button-wrapper': { paddingRight: 5, paddingLeft: 5 } },
  hourRangeSlider: {
    width: '140px',
    padding: '0 8px',
    '@media (max-width: 1200px)': { width: '100%' },
    '@media (min-width: 1400px)': { margin: '0 4px' },
  },
  widthFull: { width: '100%' },
  datesContainer: {
    display: 'flex',
    flexDirection: 'column',
    '@media (min-width: 1200px)': { flexDirection: 'row' },
  },
  dateButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0 0 8px',
    '@media (min-width: 1200px)': { margin: '0 8px' },
  },
  dateRangeContainer: {
    display: 'flex',
    flexDirection: 'column',
    '@media (min-width: 1400px)': {
      flexDirection: 'row',
      margin: '0',
    },
  },
  hourCountainer: {
    display: 'flex',
    flexDirection: 'column',
    '@media (min-width: 1400px)': { flexDirection: 'row' },
  },
  dateTypeButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '4px 0',
    '@media (min-width: 1400px)': { margin: '0 8px' },
  },
  flex: { display: 'flex' },
  spaceBetween: { justifyContent: 'space-between' },
  smallMargin: { marginRight: '8px' },
  smallYMargin: { margin: '8px 0' },
  collapse: { '&  .ant-collapse-header': { paddingTop: '6px !important', paddingBottom: '6px !important' } },
  panel: { '& .ant-collapse-content-box': { paddingTop: '6px !important', paddingBottom: '6px !important' } },
  divider: { margin: '0 0 2px 0' },
  lastUsedDateFilter: { border: '2px dashed #432a97' },
  inputBorder: { border: '1px solid #432a97' },
  ml4: { marginLeft: '4px' },
});
