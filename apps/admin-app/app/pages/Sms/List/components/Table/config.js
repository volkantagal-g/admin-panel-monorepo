import { Select, Tag } from 'antd';
import { get } from 'lodash';
import moment from 'moment';

import { Creators } from '@app/pages/Sms/List/redux/actions';
import { processStatus as smsProcessStatus } from '@app/pages/Sms/constantValues';
import { getLangKey } from '@shared/i18n';
import { PROCESS_STATUS, SMS_ACTIONS, SMS_STATUS } from '@app/pages/Sms/constants';
import { getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';

const STATUS_MAP = {
  [SMS_STATUS.ACTIVE]: {
    value: 'ACTIVE',
    color: 'green',
  },
  [SMS_STATUS.INACTIVE]: {
    value: 'INACTIVE',
    color: 'magenta',
  },
};

// cancellable mapping
const INACTIVE_CANCELLABLES = [
  PROCESS_STATUS.CREATED,
  PROCESS_STATUS.PRE_PROCESS,
  PROCESS_STATUS.READY,
];

const CANCELLABLES = [
  PROCESS_STATUS.CREATED,
  PROCESS_STATUS.PRE_PROCESS,
  PROCESS_STATUS.READY,
  PROCESS_STATUS.IN_PROCESS,
];

const getEligibleActions = ({ status, processStatus }) => {
  const actions = [SMS_ACTIONS.DETAIL, SMS_ACTIONS.DUPLICATE];
  const eligibleActions = {
    [SMS_STATUS.ACTIVE]() {
      if (CANCELLABLES.includes(processStatus)) {
        actions.push(SMS_ACTIONS.CANCEL);
      }
    },
    [SMS_STATUS.INACTIVE]() {
      if (INACTIVE_CANCELLABLES.includes(processStatus)) {
        actions.push(SMS_ACTIONS.CANCEL);
      }
    },
    defaultActions() { },
  };
  (eligibleActions[status] || eligibleActions.defaultActions)();
  return actions;
};

const actionOptions = ({ t, status, processStatus }) => getEligibleActions({ status, processStatus })
  .map(value => ({ label: t(value), value }));

const actionHandler = ({ id, dispatch }) => action => {
  const actions = {
    [SMS_ACTIONS.DETAIL]() {
      window.open(`/sms/detail/${id}`);
    },
    [SMS_ACTIONS.CANCEL]() {
      dispatch(Creators.cancelRequest({ id }));
    },
    [SMS_ACTIONS.DUPLICATE]() {
      dispatch(Creators.duplicateRequest({ id }));
    },
    defaultOption() { },
  };
  (actions[action] || actions.defaultOption)();
};

export const getTableColumns = t => {
  const selectedCountryPrimaryTimeZone = getSelectedCountryTimeZones()[0]?.timezone;
  return [
    {
      title: t('SMS_ID'),
      dataIndex: 'id',
      key: 'id',
      width: 200,
    },
    {
      title: t('START_DATE'),
      dataIndex: 'startDate',
      key: 'startDate',
      width: 150,
      sorter: true,
      render: startDate => moment.utc(startDate).tz(selectedCountryPrimaryTimeZone).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: t('END_DATE'),
      dataIndex: 'endDate',
      key: 'endDate',
      width: 150,
      sorter: true,
      render: endDate => moment.utc(endDate).tz(selectedCountryPrimaryTimeZone).format('DD.MM.YYYY HH:mm'),
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
    },
    {
      title: t('STATUS'),
      key: 'status',
      width: 100,
      render: sms => (
        <Tag color={STATUS_MAP[sms.status]?.color}>
          {t(`global:${STATUS_MAP[sms.status]?.value}`)}
        </Tag>
      ),
    },
    {
      title: t('PROCESS_STATUS'),
      key: 'processStatus',
      width: 100,
      render: sms => {
        const _processStatus = get(sms, 'processStatus', '');
        return get(smsProcessStatus, [_processStatus, getLangKey()], '');
      },
    },
  ];
};
export const generateColumns = ({ t, dispatch, filters, selectedHeaders }) => {
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
    render: ({ id, status, processStatus }) => {
      return (
        <Select
          className="w-100"
          placeholder={t('ACTION')}
          value={null}
          options={actionOptions({ t, status, processStatus })}
          onSelect={actionHandler({ id, dispatch, filters })}
        />
      );
    },
  };
  return [...tableColumns, actionColumn];
};
