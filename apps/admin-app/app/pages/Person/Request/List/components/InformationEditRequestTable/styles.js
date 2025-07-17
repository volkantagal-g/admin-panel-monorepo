import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    dateAndTime: { marginLeft: theme.spacing(2), fontSize: '12px' },
    status_1: { color: 'orange' },
    status_2: { color: 'green' },
    status_3: { color: 'red' },
  };
});
