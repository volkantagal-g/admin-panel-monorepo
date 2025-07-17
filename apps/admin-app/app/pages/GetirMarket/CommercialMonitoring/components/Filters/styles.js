import { createUseStyles } from 'react-jss';

export default createUseStyles({
  spaceContainer: {
    width: '100%',
    overflowY: 'auto',
    padding: '0 0 4px 4px',
    '@media (min-width: 1200px)': {
      padding: '0 0 0px 4px',
      marginTop: -4,
    },
    '@media (max-width: 768px)': {
      flexWrap: 'wrap',
      overflowY: 'unset',
    },
  },
  rangeSliderWrapper: {
    width: 160,
    padding: '0 8px',
    '@media (max-width: 768px)': { width: '100%' },
    '@media (min-width: 1400px)': { margin: '0 4px' },
  },
  divider: { margin: '0 0 5px 0' },
  citySelectInput: {
    width: 195,
    '@media (max-width: 768px)': { width: '100%' },
    '& .ant-select-selection-item-content': { maxWidth: 75 },
  },
  domainTypeSelect: {
    width: 110,
    '@media (max-width: 768px)': { width: '100%' },
  },
  radioButtonGroupContainer: {
    '& .ant-radio-button-wrapper': {
      paddingRight: 8,
      paddingLeft: 8,
    },
  },
  dateRangePicker: {
    width: 190,
    height: 32,
    '@media (max-width: 768px)': { width: '100%' },
  },
  datePicker: {
    width: 100,
    height: 32,
    '@media (max-width: 768px)': { width: '100%' },
  },
});
