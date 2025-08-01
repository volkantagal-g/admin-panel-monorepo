import { useTranslation } from 'react-i18next';

import { ATTENDANCE_LEGEND } from '../../constants';

import useStyles from './styles';

function AttendanceLegend() {
  const { t } = useTranslation(['officeAttendanceTracking']);
  const classes = useStyles();

  return (
    <div className={classes.attendanceLegend}>
      {Object.keys(ATTENDANCE_LEGEND).map((key: string) => {
        return (
          <div className={classes.legendItem} key={key}>
            <span><b>{key}</b> - {t(`officeAttendanceTracking:ATTENDANCE_LEGEND.${ATTENDANCE_LEGEND[key]}`)}</span>
          </div>
        );
      })}
    </div>
  );
}

export default AttendanceLegend;
