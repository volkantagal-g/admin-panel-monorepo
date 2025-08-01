import { Button, Tag } from 'antd';

import { EMPLOYEE_PERMIT_STATUSES, PERMIT_STATUS_TAG_COLORS } from '@app/pages/Employee/constants';
import { getFormattedDateByPermitType } from '@app/pages/Employee/utils';
import { getHourlyLeavesTitleWithTooltip } from '../../utils';
import { convertConstantValueTranslationsToSelectOptions } from '@shared/utils/common';

export const getTableColumns = ({
  t,
  handlePermitDetailBtnClick,
  filters,
}) => [
  {
    title: t('global:TYPE'),
    width: 190,
    dataIndex: 'permitType',
    key: 'permitType',
    render: permitType => t(`employeePage:PERMIT_TYPES.${permitType.toString()}`),
  },
  {
    title: t('global:REASON'),
    width: 150,
    dataIndex: 'reason',
    key: 'reason',
    render: reason => (reason ? t(`employeePage:PERMIT_REASONS.${reason?.toString()}`) : ''),
  },
  {
    title: t('global:START_DATE'),
    width: 100,
    render: ({ startDateL, permitType }) => getFormattedDateByPermitType(startDateL, permitType),
  },
  {
    title: t('global:END_DATE'),
    width: 100,
    render: ({ endDateL, permitType }) => getFormattedDateByPermitType(endDateL, permitType),
  },
  {
    title: `${t('global:TOTAL')} (${t('global:DAY')})`,
    width: 80,
    dataIndex: 'totalDay',
    key: 'totalDay',
    align: 'right',
    render: totalDay => totalDay,
  },
  {
    title: t('employeePage:WORK_DAY'),
    width: 80,
    dataIndex: 'totalWorkDay',
    key: 'totalWorkDay',
    align: 'right',
    render: totalWorkDay => totalWorkDay,
  },
  {
    title: t('employeePage:REQUESTED_DAY'),
    width: 120,
    dataIndex: 'requestedPermitDay',
    key: 'requestedPermitDay',
    align: 'right',
    render: requestedPermitDay => requestedPermitDay,
  },
  {
    title: getHourlyLeavesTitleWithTooltip(),
    width: 120,
    dataIndex: 'requestedPermitHours',
    key: 'requestedPermitHours',
    align: 'right',
    render: requestedPermitHours => requestedPermitHours,
  },
  {
    title: t('global:NOTE'),
    width: 150,
    dataIndex: 'employeeNote',
    key: 'employeeNote',
    render: employeeNote => employeeNote,
  },
  {
    title: t('global:STATUS'),
    width: 100,
    dataIndex: 'status',
    key: 'status',
    filters: convertConstantValueTranslationsToSelectOptions({
      constants: EMPLOYEE_PERMIT_STATUSES,
      translationBaseKey: 'employeePage:PERMIT_STATUSES',
      labelKey: 'text',
    }),
    filteredValue: filters?.status || null,
    render: permitStatus => (
      <Tag style={{ lineHeight: '15px' }} color={PERMIT_STATUS_TAG_COLORS[permitStatus]}>{t(`employeePage:PERMIT_STATUSES.${permitStatus.toString()}`)}</Tag>
    ),
  },
  {
    title: t('global:ACTION'),
    align: 'right',
    width: 60,
    render: permit => {
      return (
        <Button type="default" size="small" onClick={() => handlePermitDetailBtnClick({ permit })}>
          {t('DETAIL')}
        </Button>
      );
    },
  },
];
