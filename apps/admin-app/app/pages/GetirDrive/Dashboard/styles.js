import { createUseStyles } from 'react-jss';

export default createUseStyles({
  spaceContainer: {
    width: '100%',
    flexWrap: 'wrap',
    padding: '0 0 0px 4px',
  },
  citySelectInput: {
    width: '150px',
    '@media (max-width: 1200px)': { width: '100%' },
  },
  domainTypeSelectInput: {
    width: '120px',
    '@media (max-width: 1200px)': { width: '100%' },
  },
  dateRangePicker: { width: '100%' },
  datePicker: { width: '100%' },
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
  divider: { margin: '0 0 8px 0' },
  lastUsedDateFilter: { border: '2px dashed #432a97' },
});
