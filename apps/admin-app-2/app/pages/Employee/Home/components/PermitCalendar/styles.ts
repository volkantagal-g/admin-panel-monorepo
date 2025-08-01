import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  calendarHeader: { padding: `${theme.spacing(1)}px ${theme.spacing(0.5)}px` },
  monthPicker: { width: '100%' },
  tag: {
    width: '95%',
    lineHeight: `${theme.spacing(3)}px`,
    fontSize: theme.spacing(2.5),
  },
  divider: { margin: '12px 0' },
  payrollSelect: { minWidth: '150px' },
}));
