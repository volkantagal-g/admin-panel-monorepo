import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import {
  filtersSelector, officeAttendanceTrackingMultipleDayRecordsSelector,
  officeAttendanceTrackingSingleDayRecordsSelector,
} from '../../redux/selectors';
import { extractBusinessUnitToDepartmentMappings } from '@app/pages/Employee/OfficeAttendanceTracking/Dashboard/utils';
import { Creators } from '../../redux/actions';

type InferredSelectBusinessUnitPropsType = {
  onChange: (value: any) => void;
  size: 'large' | 'middle' | 'small';
}

const InferredSelectBusinessUnit = ({ onChange, size }: InferredSelectBusinessUnitPropsType) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['officeAttendanceTracking', 'employeePage', 'global']);

  const filters = useSelector(filtersSelector.getData);
  const commonFilters = useSelector(filtersSelector.getCommonFilters);
  const isSingleDayModeOfficeAttendance = useSelector(filtersSelector.getIsSingleDay);
  const officeAttendanceSingleDayRecords = useSelector(officeAttendanceTrackingSingleDayRecordsSelector.getData);
  const officeAttendanceMultipleDayRecords = useSelector(officeAttendanceTrackingMultipleDayRecordsSelector.getData);

  const isSingleDayModeOfficeAttendancePending = useSelector(officeAttendanceTrackingSingleDayRecordsSelector.getIsPending);
  const isMultipleDayModeOfficeAttendancePending = useSelector(officeAttendanceTrackingMultipleDayRecordsSelector.getIsPending);

  const isPending = isSingleDayModeOfficeAttendance ? isSingleDayModeOfficeAttendancePending : isMultipleDayModeOfficeAttendancePending;

  const { businessIdToBusinessNameMap } = useMemo(() => {
    if (!isSingleDayModeOfficeAttendance) {
      return extractBusinessUnitToDepartmentMappings(officeAttendanceMultipleDayRecords);
    }
    return extractBusinessUnitToDepartmentMappings(officeAttendanceSingleDayRecords);
  }, [isSingleDayModeOfficeAttendance, officeAttendanceMultipleDayRecords, officeAttendanceSingleDayRecords]);

  const inferredBusinessUnitOptions = Object.keys(businessIdToBusinessNameMap).map(businessUnitId => {
    const businessUnitName = businessIdToBusinessNameMap[businessUnitId];
    return {
      value: businessUnitId,
      label: businessUnitName,
    };
  });

  return (
    <Select
      size={size}
      options={inferredBusinessUnitOptions}
      onChange={onChange}
      value={commonFilters?.businessUnit}
      loading={isPending}
      allowClear
      placeholder={t('officeAttendanceTracking:PH_BUSINESS_UNIT_SELECTION')}
    />
  );
};

export default InferredSelectBusinessUnit;
