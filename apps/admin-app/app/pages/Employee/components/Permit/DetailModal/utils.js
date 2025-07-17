import moment from 'moment-timezone';

import { createMap } from '@shared/utils/common';
import { EMPLOYEE_PERMIT_ACTIONS } from '@app/pages/Employee/constants';
import { getFormattedDateByPermitType } from '@app/pages/Employee/utils';
import { getHourlyLeavesTitleWithTooltip } from '@app/pages/Employee/Home/utils';
import { ALLOWED_PERMIT_STATUSES_FOR_PERMIT_CANCEL_REQUEST } from '@app/pages/Employee/components/Permit/constants';

export const getHistoryTableColumns = ({ t }) => [
  {
    title: t('global:START_DATE'),
    render: ({ startDateL, permitType }) => getFormattedDateByPermitType(startDateL, permitType),
  },
  {
    title: t('global:END_DATE'),
    render: ({ endDateL, permitType }) => getFormattedDateByPermitType(endDateL, permitType),
  },
  {
    title: t('global:APPROVED_BY'),
    dataIndex: 'actions',
    key: 'approvedBy',
    render: actions => {
      const actionsMap = createMap(actions || [], { field: 'type' });
      return actionsMap[EMPLOYEE_PERMIT_ACTIONS.APPROVE]?.employeeName;
    },
  },
  {
    title: t('employeePage:REQUESTED_DAY'),
    dataIndex: 'requestedPermitDay',
    key: 'requestedPermitDay',
    align: 'right',
    render: requestedPermitDay => requestedPermitDay,
  },
  {
    title: getHourlyLeavesTitleWithTooltip(),
    dataIndex: 'requestedPermitHours',
    key: 'requestedPermitHours',
    align: 'right',
    render: requestedPermitHours => requestedPermitHours,
  },
];

export const getIsPermitCancellationRequestPossible = ({ user, permitData, hasSupervisorAccess }) => {
  const turkeyTimezoneOffset = moment.tz('Europe/Istanbul').utcOffset();
  const today = moment.utc().add(turkeyTimezoneOffset).startOf('day');
  const permitStartDate = moment.utc(permitData?.startDateL).startOf('day');
  const oneDayAfterPermitStartDate = permitStartDate.clone().startOf('day').add(1, 'days');
  const isPermitCancellationRestricted = today.isSameOrAfter(oneDayAfterPermitStartDate);
  const isPermitStatusAllowedToCancel = ALLOWED_PERMIT_STATUSES_FOR_PERMIT_CANCEL_REQUEST.includes(permitData?.status);

  return !hasSupervisorAccess &&
    permitData.employee?._id === user?.employee?._id &&
    isPermitStatusAllowedToCancel &&
    !isPermitCancellationRestricted;
};
