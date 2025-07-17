import { createUseStyles } from 'react-jss';

export default createUseStyles({
  dayPickingRadios: {
    width: '100%',
    textAlign: 'center',
    margin: '0 0 5px',
  },
  paginationWrapper: { marginTop: '10px' },
  calendarWrapper: {
    '& .ant-picker-calendar-year-select, .ant-picker-calendar-month-select': { left: '5% !important', width: '30% !important' },
    '& .ant-radio-group-small': { visibility: 'hidden !important' },
  },
});
