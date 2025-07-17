import { createUseStyles } from 'react-jss';

export default createUseStyles({
  fullWidth: { width: '100%' },
  timerContainer: { display: 'flex', justifyContent: 'end', paddingRight: '0px !important' },
  timer: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    '& .ant-statistic-content': { fontSize: '12px' },
  },
  info: { display: 'flex', alignItems: 'center' },
  spinner: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' },
});
