import moment from 'moment';
import { Button, Tag } from 'antd';

import { getLangKey } from '@shared/i18n';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { getFormattedDateByPermitType } from '@app/pages/Employee/utils';
import { PERMIT_STATUS_TAG_COLORS } from '@app/pages/Employee/constants';
import { getHourlyLeavesTitleWithTooltip } from '@app/pages/Employee/Home/utils';

export const getTableColumns = ({
  t,
  handlePermitDetailBtnClick,
}) => {
  const dateTimeFormat = getLocalDateTimeFormat();
  const langKey = getLangKey();

  return [
    {
      title: t('global:TYPE'),
      width: 150,
      dataIndex: 'permitType',
      key: 'permitType',
      render: permitType => t(`employeePage:PERMIT_TYPES.${permitType}`),
    },
    {
      title: t('global:REASON'),
      width: 130,
      dataIndex: 'reason',
      key: 'reason',
      render: reason => {
        return reason ? t(`employeePage:PERMIT_REASONS.${reason.toString()}`) : '';
      },
    },
    {
      title: t('global:GETIRIAN'),
      width: 150,
      dataIndex: 'employee',
      key: 'employee.name',
      render: ({ fullName }) => fullName,
    },
    {
      title: t('global:DEPARTMENT'),
      width: 100,
      dataIndex: 'employee',
      key: 'employee.department',
      render: ({ department }) => department?.name?.[langKey],
    },
    {
      title: t('global:SUPERVISOR'),
      width: 150,
      dataIndex: 'employee',
      key: 'employee.supervisor',
      render: ({ supervisor }) => supervisor?.fullName,
    },
    {
      title: t('global:REQUEST_DATE'),
      width: 80,
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: createdAt => moment(createdAt).format(dateTimeFormat),
    },
    {
      title: t('global:START_DATE'),
      width: 90,
      render: ({ startDateL, permitType }) => getFormattedDateByPermitType(startDateL, permitType),
    },
    {
      title: t('global:END_DATE'),
      width: 90,
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
      width: 100,
      dataIndex: 'requestedPermitDay',
      key: 'requestedPermitDay',
      align: 'right',
      render: requestedPermitDay => requestedPermitDay,
    },
    {
      title: getHourlyLeavesTitleWithTooltip(),
      width: 80,
      dataIndex: 'requestedPermitHours',
      key: 'requestedPermitHours',
      align: 'right',
      render: requestedPermitHours => requestedPermitHours,
    },
    {
      title: t('global:STATUS'),
      width: 100,
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={PERMIT_STATUS_TAG_COLORS[status]}>{t(`employeePage:PERMIT_STATUSES.${status.toString()}`)}</Tag>
      ),
    },
    {
      title: t('global:ACTION'),
      align: 'right',
      width: 80,
      render: permit => {
        return (
          <Button type="default" size="small" onClick={() => handlePermitDetailBtnClick({ permit })}>
            {t('DETAIL')}
          </Button>
        );
      },
    },
  ];
};
