import { Button, Popconfirm, Tooltip } from 'antd';
import { get } from 'lodash';
import moment from 'moment';

import { getLangKey } from '@shared/i18n';
import { isMobile } from '@shared/utils/common';
import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';
import LinkOrText from '@shared/components/UI/LinkOrText';

const MISSING_STRING = 'N/A';

export const getTableColumns = ({ t, hasPermissionToEditPageOwners, onRemove }) => {
  return [
    {
      title: '#',
      key: '_index',
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: t('NAME'),
      dataIndex: 'name',
      key: 'name',
      width: 200,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => {
        const nameA = a.name;
        const nameB = b.name;
        return nameA.localeCompare(nameB);
      },
      render: (name, record) => {
        const { _id } = record;
        return (
          <LinkOrText
            permKey={permKey.PAGE_USER_DETAIL}
            to={ROUTE.USER_DETAIL.path.replace(':id', _id)}
            text={name}
          />
        );
      },

    },
    {
      title: t('EMAIL'),
      dataIndex: 'email',
      width: 250,
      key: 'email',
      sorter: (a, b) => {
        const emailA = a.email;
        const emailB = b.email;
        return emailA.localeCompare(emailB);
      },
    },
    {
      title: `${t('DEPARTMENT')} / ${t('BUSINESS_TITLE')}`,
      dataIndex: 'employeeData',
      key: 'employeeData',
      width: isMobile() ? 300 : undefined,
      ellipsis: true,
      sorter: (a, b, sortOrder) => {
        const departmentNameA = get(a, ['employeeData', 'department', 'name', getLangKey()], MISSING_STRING);
        const departmentNameB = get(b, ['employeeData', 'department', 'name', getLangKey()], MISSING_STRING);
        const jobTitleA = get(a, ['employeeData', 'jobTitle'], MISSING_STRING);
        const jobTitleB = get(b, ['employeeData', 'jobTitle'], MISSING_STRING);

        if (departmentNameA === MISSING_STRING) {
          return sortOrder === 'ascend' ? 1 : -1;
        }

        if (departmentNameB === MISSING_STRING) {
          return sortOrder === 'ascend' ? -1 : 1;
        }

        return (departmentNameA + jobTitleA).localeCompare(departmentNameB + jobTitleB);
      },
      render: employeeData => {
        const departmentName = get(employeeData, ['department', 'name', getLangKey()], MISSING_STRING);
        const lineManagerName = get(employeeData, ['lineManager', 'fullName'], MISSING_STRING);
        const jobTitle = get(employeeData, 'jobTitle', MISSING_STRING);

        return (
          <Tooltip
            title={(
              <div>
                <div>{t('DEPARTMENT')}: {departmentName}</div>
                <div>{t('BUSINESS_TITLE')}: {jobTitle}</div>
                <div>{t('SUPERVISOR')}: {lineManagerName}</div>
              </div>
            )}
          >
            {departmentName} - {jobTitle}
          </Tooltip>
        );
      },
    },
    {
      title: t('OWNER_DATE'),
      dataIndex: 'ownerDate',
      key: 'ownerDate',
      width: 200,
      sorter: (a, b) => {
        const dateA = new Date(a.ownerDate);
        const dateB = new Date(b.ownerDate);
        return dateA - dateB;
      },
      render: ownerDate => {
        return moment(ownerDate).format('YYYY-MM-DD');
      },
    },
    ...(hasPermissionToEditPageOwners ? [{
      title: t('ACTION'),
      dataIndex: '_id',
      align: 'center',
      key: '_id',
      width: 100,
      render: id => (
        <Popconfirm title={t('COMMON_CONFIRM_TEXT')} onConfirm={() => onRemove({ ownerIds: [id] })}>
          <Button type="button" size="small" danger>
            {t('REMOVE')}
          </Button>
        </Popconfirm>
      ),

    }] : []),
  ];
};
