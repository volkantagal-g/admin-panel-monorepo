import { Select, Tag } from 'antd';
import { get } from 'lodash';

import { Creators } from '@app/pages/Email/List/redux/actions';
import { emailProcessStatus } from '@app/pages/Email/constantValues';
import { EMAIL_ACTIONS, EMAIL_STATUS, EMAIL_PROCESS_STATUS } from '@app/pages/Email/constants';
import { getLangKey } from '@shared/i18n';

const STATUS_MAP = {
  [EMAIL_STATUS.ACTIVE]: {
    value: 'ACTIVE',
    color: 'green',
  },
  [EMAIL_STATUS.INACTIVE]: {
    value: 'INACTIVE',
    color: 'magenta',
  },
};

const EMAIL_CANCELLABLES = [
  EMAIL_PROCESS_STATUS.PRE_PROCESS,
  EMAIL_PROCESS_STATUS.READY,
  EMAIL_PROCESS_STATUS.IN_PROCESS,
];

const getEligibleActions = ({ status, processStatus }) => {
  const actions = [EMAIL_ACTIONS.DETAIL, EMAIL_ACTIONS.DUPLICATE];

  const eligibleActions = {
    [EMAIL_STATUS.ACTIVE]() {
      if (EMAIL_CANCELLABLES.includes(processStatus)) {
        actions.push(EMAIL_ACTIONS.CANCEL);
      }
    },
    [EMAIL_STATUS.INACTIVE]() {
    },
  };

  (eligibleActions[status])();
  return actions;
};

const actionOptions = ({ t, status, processStatus }) => getEligibleActions({ status, processStatus })
  .map(value => ({ label: t(value), value }));

const actionHandler = ({ emailId, dispatch, configs }) => action => {
  const tableConfigs = configs;
  const actions = {
    [EMAIL_ACTIONS.DETAIL]() {
      window.open(`/email/detail/${emailId}`);
    },
    [EMAIL_ACTIONS.DUPLICATE]() {
      dispatch(Creators.duplicateRequest({ id: emailId }));
    },
    [EMAIL_ACTIONS.CANCEL]() {
      dispatch(Creators.cancelRequest({ id: emailId }));
      dispatch(Creators.setTableFilters({ filters: tableConfigs }));
    },
  };
  (actions[action])();
};

export const getTableColumns = t => {
  return [
    {
      title: t('EMAIL_ID'),
      dataIndex: 'emailId',
      key: 'emailId',
      width: 200,
    },
    {
      title: t('CREATION_DATE'),
      dataIndex: 'creationDate',
      key: 'creationDate',
      width: 150,
    },
    {
      title: t('SENDING_DATE'),
      dataIndex: 'startDate',
      key: 'startDate',
      width: 150,
      sorter: true,
    },
    {
      title: t('DUE_DATE'),
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 150,
      sorter: true,
    },
    {
      title: t('TARGET_SERVICE'),
      dataIndex: 'domainType',
      key: 'domainType',
      width: 100,
      sorter: true,
    },
    {
      title: t('DEPARTMENT'),
      dataIndex: 'responsibleDepartment',
      key: 'responsibleDepartment',
      width: 100,
      sorter: true,
    },
    {
      title: t('CUSTOM_LABEL'),
      dataIndex: 'customTag',
      key: 'customTag',
      width: 100,
    },
    {
      title: t('STATUS'),
      key: 'status',
      width: 100,
      sorter: { compare: (a, b) => a.status - b.status },
      render: email => (
        <Tag color={STATUS_MAP[email.status]?.color}>
          {t(`global:${STATUS_MAP[email.status]?.value}`)}
        </Tag>
      ),
    },
    {
      title: t('PROCESS_STATUS'),
      key: 'processStatus',
      width: 100,
      render: email => {
        const _processStatus = get(email, 'processStatus', '');
        return get(emailProcessStatus, [_processStatus, getLangKey()], '');
      },
      sorter: true,
    },
  ];
};

export const generateTableColumns = ({ t, dispatch, configs, selectedHeaders }) => {
  let tableColumns = getTableColumns(t);
  if (selectedHeaders.length !== 0) {
    tableColumns = tableColumns.filter(header => {
      return selectedHeaders.includes(header.key);
    });
  }
  const actionColumn = {
    title: t('ACTION'),
    key: 'action',
    width: 150,
    fixed: 'right',
    render: ({ emailId, status, processStatus }) => (
      <Select
        className="w-100"
        placeholder={t('ACTION')}
        value={null}
        options={actionOptions({ t, status, processStatus })}
        onSelect={actionHandler({ emailId, dispatch, configs })}
      />
    ),
  };

  return [...tableColumns, actionColumn];
};
