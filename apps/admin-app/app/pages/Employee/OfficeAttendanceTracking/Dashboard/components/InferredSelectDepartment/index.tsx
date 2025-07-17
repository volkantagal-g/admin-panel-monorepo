import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';

import {
  filtersSelector,
  officeAttendanceTrackingMultipleDayRecordsSelector,
  officeAttendanceTrackingSingleDayRecordsSelector,
} from '@app/pages/Employee/OfficeAttendanceTracking/Dashboard/redux/selectors';
import {
  extractBusinessUnitToDepartmentMappings,
  getDepartmentOptionsBasedOnBusinessUnitSelection,
} from '@app/pages/Employee/OfficeAttendanceTracking/Dashboard/utils';

type InferredSelectDepartmentPropsType = {
  onChange: (value: any) => void;
  size: 'large' | 'middle' | 'small';
}

const InferredSelectDepartment = ({ onChange, size }: InferredSelectDepartmentPropsType) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['officeAttendanceTracking']);

  const commonFilters = useSelector(filtersSelector.getCommonFilters);
  const isSingleDayModeOfficeAttendance = useSelector(filtersSelector.getIsSingleDay);
  const officeAttendanceSingleDayRecords = useSelector(officeAttendanceTrackingSingleDayRecordsSelector.getData);
  const officeAttendanceMultipleDayRecords = useSelector(officeAttendanceTrackingMultipleDayRecordsSelector.getData);

  const isSingleDayModeOfficeAttendancePending = useSelector(officeAttendanceTrackingSingleDayRecordsSelector.getIsPending);
  const isMultipleDayModeOfficeAttendancePending = useSelector(officeAttendanceTrackingMultipleDayRecordsSelector.getIsPending);

  const isPending = isSingleDayModeOfficeAttendance ? isSingleDayModeOfficeAttendancePending : isMultipleDayModeOfficeAttendancePending;

  const { businessUnitToDepartmentMap, departmentIdToDepartmentNameMap } = useMemo(() => {
    if (!isSingleDayModeOfficeAttendance) {
      return extractBusinessUnitToDepartmentMappings(officeAttendanceMultipleDayRecords);
    }
    return extractBusinessUnitToDepartmentMappings(officeAttendanceSingleDayRecords);
  }, [isSingleDayModeOfficeAttendance, officeAttendanceMultipleDayRecords, officeAttendanceSingleDayRecords]);

  const options = useMemo(() => {
    const selectedBusinessUnit = commonFilters?.businessUnit;

    return getDepartmentOptionsBasedOnBusinessUnitSelection({
      businessUnitToDepartmentMap: businessUnitToDepartmentMap as { [key: string]: string[] },
      departmentIdToDepartmentNameMap,
      businessUnitId: selectedBusinessUnit,
    });
  }, [commonFilters?.businessUnit, businessUnitToDepartmentMap, departmentIdToDepartmentNameMap]);

  return (
    <Select
      size={size}
      allowClear
      options={options}
      loading={isPending}
      placeholder={t('global:EMPLOYEE_SELECT_DEPARTMENT')}
      value={commonFilters?.department}
      onChange={onChange}
    />
  );
};

export default InferredSelectDepartment;
