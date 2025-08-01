import { Button, Col, Row, Tag } from 'antd';

import { EMPLOYEE_PERMIT_STATUSES, PERMIT_STATUS_TAG_COLORS } from '@app/pages/Employee/constants';
import { getFormattedDateByPermitType } from '@app/pages/Employee/utils';
import { getHourlyLeavesTitleWithTooltip, getPermitStatusTableFilters, getPermitTypeTableFilters } from '../../utils';

export const getTableColumns = ({ t, employees, filters, handlePermitDetailBtnClick, handleApproveBtnClick, handleRejectBtnClick, isPending }) => [
  {
    title: t('global:GETIRIAN'),
    width: 130,
    dataIndex: 'employee',
    key: 'employee',
    filters: employees?.map(employee => ({ text: employee.fullName, value: employee._id })),
    filteredValue: filters?.employee || null,
    filterSearch: true,
    render: ({ fullName }) => fullName,
  },
  {
    title: t('global:TYPE'),
    width: 120,
    dataIndex: 'permitType',
    key: 'permitType',
    filters: getPermitTypeTableFilters(),
    filteredValue: filters?.permitType || null,
    render: permitType => t(`employeePage:PERMIT_TYPES.${permitType.toString()}`),
  },
  {
    title: t('global:REASON'),
    width: 120,
    dataIndex: 'reason',
    key: 'reason',
    render: reason => {
      return reason ? t(`employeePage:PERMIT_REASONS.${reason.toString()}`) : '';
    },
  },
  {
    title: t('global:START_DATE'),
    width: 85,
    render: ({ startDateL, permitType }) => getFormattedDateByPermitType(startDateL, permitType),
  },
  {
    title: t('global:END_DATE'),
    width: 85,
    render: ({ endDateL, permitType }) => getFormattedDateByPermitType(endDateL, permitType),
  },
  {
    title: `${t('global:TOTAL')} (${t('global:DAY')})`,
    width: 70,
    dataIndex: 'totalDay',
    key: 'totalDay',
    align: 'right',
    render: totalDay => totalDay,
  },
  {
    title: t('employeePage:WORK_DAY'),
    width: 70,
    dataIndex: 'totalWorkDay',
    key: 'totalWorkDay',
    align: 'right',
    render: totalWorkDay => totalWorkDay,
  },
  {
    title: t('employeePage:REQUESTED_DAY'),
    width: 70,
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
    width: 90,
    dataIndex: 'status',
    key: 'status',
    filters: getPermitStatusTableFilters(),
    filteredValue: filters?.status || null,
    render: permitStatus => (
      <Tag style={{ lineHeight: '15px' }} color={PERMIT_STATUS_TAG_COLORS[permitStatus]}>{t(`employeePage:PERMIT_STATUSES.${permitStatus.toString()}`)}</Tag>
    ),
  },
  {
    title: t('global:ACTION'),
    width: 150,
    render: permit => {
      return (
        <Row align="middle">
          {permit.status === EMPLOYEE_PERMIT_STATUSES.REQUESTED && (
            <Col className="mr-2">
              <Button
                loading={isPending}
                type="danger"
                size="small"
                onClick={() => handleRejectBtnClick(permit._id)}
                className="mr-2"
              >{t('global:REJECT')}
              </Button>
              <Button loading={isPending} type="success" size="small" onClick={() => handleApproveBtnClick(permit._id)}>{t('global:APPROVE')}</Button>
            </Col>
          )}
          <Col>
            <Button loading={isPending} type="default" size="small" onClick={() => handlePermitDetailBtnClick({ permit })}>
              {t('DETAIL')}
            </Button>
          </Col>
        </Row>
      );
    },
  },
];
