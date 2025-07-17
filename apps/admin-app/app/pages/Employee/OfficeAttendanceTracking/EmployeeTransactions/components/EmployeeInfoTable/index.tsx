import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { officeAttendanceTrackingEmployeeAttendanceSelector } from '../../redux/selectors';
import { getTableColumns } from './tableConfigs';
import useStyles from '../../../styles';

function EmployeeInfoTable() {
  const { t } = useTranslation(['employeePage', 'officeAttendanceTracking', 'global']);
  const classes = useStyles();

  const employee = useSelector(officeAttendanceTrackingEmployeeAttendanceSelector.getEmployee);
  const isPending = useSelector(officeAttendanceTrackingEmployeeAttendanceSelector.getTransactionsIsPending);

  const columns = useMemo(() => getTableColumns({ t }), [t]);

  return (
    <AntTableV2
      className={classes.commonTableContainer}
      data={[employee]}
      columns={columns}
      loading={isPending}
    />
  );
}

export default EmployeeInfoTable;
