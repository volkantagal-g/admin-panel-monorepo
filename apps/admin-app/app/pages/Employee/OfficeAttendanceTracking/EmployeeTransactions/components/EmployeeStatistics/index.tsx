import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import { Tooltip } from 'antd';

import { officeAttendanceTrackingEmployeeAttendanceSelector } from '../../redux/selectors';

import useStyles from './styles';
import { getPresenceRatio } from './utils';

function EmployeeStatistics() {
  const { t } = useTranslation(['global', 'officeAttendanceTracking']);
  const classes = useStyles();

  const summary = useSelector(officeAttendanceTrackingEmployeeAttendanceSelector.getSummary);

  const presenceRatio = useMemo(() => getPresenceRatio({ employeeSummary: summary }), [summary]);

  return (
    <Tooltip title={<Trans>{t('officeAttendanceTracking:PRESENCE_RATIO_TOOLTIP')}</Trans>}>
      <div className={classes.statisticContainer}>
        <div>
          <span>{t('officeAttendanceTracking:PRESENCE_RATIO')}</span>
        </div>
        <div className={classes.valueContainer}>
          <span>{presenceRatio}</span>
        </div>
      </div>
    </Tooltip>
  );
}

export default EmployeeStatistics;
