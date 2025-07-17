import { Select, Tag } from 'antd';
import moment from 'moment';

import { COMMUNICATION_SERVICE_CREDENTIALS_ACTIONS, SERVICE_TYPES } from '@app/pages/CommunicationServiceCredentials/constants';
import { getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';

const getEligibleActions = () => {
  const actions = [COMMUNICATION_SERVICE_CREDENTIALS_ACTIONS.DETAIL];
  return actions;
};

const actionOptions = ({ t }) => getEligibleActions()
  .map(value => ({ label: t(value), value }));

const actionHandler = ({ id, serviceType }) => action => {
  const actions = {
    [COMMUNICATION_SERVICE_CREDENTIALS_ACTIONS.DETAIL]() {
      window.open(`/communication-service-credentials/detail/${id}/${serviceType}`);
    },
  };
  (actions[action])();
};

export const generateColumns = ({ t, serviceType }) => {
  const selectedCountryPrimaryTimeZone = getSelectedCountryTimeZones()[0]?.timezone;
  if (serviceType === SERVICE_TYPES.NOTIF) {
    return [
      {
        title: t('ID'),
        dataIndex: 'id',
        key: 'id',
        width: 160,
      },
      {
        title: t('NAME'),
        dataIndex: 'name',
        key: 'name',
        width: 200,
        sorter: true,
      },
      {
        title: t('CREATED_AT'),
        key: 'createdAt',
        width: 200,
        sorter: true,
        render: ({ createdAt }) => moment.utc(createdAt).tz(selectedCountryPrimaryTimeZone).format('DD.MM.YYYY HH:mm'),
      },
      {
        title: t('UPDATED_AT'),
        key: 'updatedAt',
        width: 200,
        sorter: true,
        render: ({ updatedAt }) => moment.utc(updatedAt).tz(selectedCountryPrimaryTimeZone).format('DD.MM.YYYY HH:mm'),
      },
      {
        title: t('TEAM_NAME'),
        dataIndex: 'teamName',
        key: 'teamName',
        width: 160,
        sorter: true,
      },
      {
        title: t('TRIBE_NAME'),
        dataIndex: 'tribeName',
        key: 'tribeName',
        width: 160,
        sorter: true,
      },
      {
        title: t('PERMISSIONS'),
        key: 'permissions',
        width: 160,
        sorter: true,
        render: ({ permissions }) => {
          return permissions?.map(permission => {
            return (<Tag>{permission}</Tag>);
          });
        },
      },
      {
        title: t('PURPOSE'),
        dataIndex: 'purpose',
        key: 'purpose',
        width: 160,
        sorter: true,
      },
      {
        title: t('STATUS'),
        key: 'isActive',
        width: 100,
        sorter: true,
        render: ({ isActive }) => {
          return (
            isActive ?
              <Tag color="green">{t('button:ACTIVE')}</Tag>
              :
              <Tag color="red">{t('button:INACTIVE')}</Tag>
          );
        },
      },
      {
        title: t('ACTION'),
        key: 'action',
        width: 150,
        fixed: 'right',
        render: ({ id }) => (
          <Select
            className="w-100"
            placeholder={t('ACTION')}
            options={actionOptions({ t })}
            onSelect={actionHandler({ id, serviceType })}
          />
        ),
      },
    ];
  }
  if (serviceType === SERVICE_TYPES.EMAIL) {
    return [
      {
        title: t('ID'),
        dataIndex: 'id',
        key: 'id',
        width: 160,
      },
      {
        title: t('NAME'),
        dataIndex: 'name',
        key: 'name',
        width: 200,
        sorter: true,
      },
      {
        title: t('CREATED_AT'),
        key: 'createdAt',
        width: 200,
        sorter: true,
        render: ({ createdAt }) => moment.utc(createdAt).tz(selectedCountryPrimaryTimeZone).format('DD.MM.YYYY HH:mm'),
      },
      {
        title: t('TEAM_NAME'),
        dataIndex: 'teamName',
        key: 'teamName',
        width: 160,
        sorter: true,
      },
      {
        title: t('TRIBE_NAME'),
        dataIndex: 'tribeName',
        key: 'tribeName',
        width: 160,
        sorter: true,
      },
      {
        title: t('PROVIDER'),
        dataIndex: 'provider',
        key: 'provider',
        width: 160,
        sorter: true,
      },
      {
        title: t('FROM'),
        dataIndex: 'from',
        key: 'from',
        width: 160,
        sorter: true,
      },
      {
        title: t('FROM_NAME'),
        dataIndex: 'fromName',
        key: 'fromName',
        width: 160,
        sorter: true,
      },
      {
        title: t('PERMISSIONS'),
        key: 'permissions',
        width: 160,
        sorter: true,
        render: ({ permissions }) => {
          return permissions?.map(permission => {
            return (<Tag>{permission}</Tag>);
          });
        },
      },
      {
        title: t('TO_PATTERNS'),
        key: 'toPatterns',
        width: 160,
        sorter: true,
        render: ({ toPatterns }) => {
          return toPatterns?.map(toPattern => {
            return (<Tag>{toPattern}</Tag>);
          });
        },
      },
      {
        title: t('PURPOSE'),
        dataIndex: 'purpose',
        key: 'purpose',
        width: 160,
        sorter: true,
      },
      {
        title: t('STATUS'),
        key: 'isActive',
        width: 100,
        sorter: true,
        render: ({ isActive }) => {
          return (
            isActive ?
              <Tag color="green">{t('button:ACTIVE')}</Tag>
              :
              <Tag color="red">{t('button:INACTIVE')}</Tag>
          );
        },
      },
      {
        title: t('ACTION'),
        key: 'action',
        width: 150,
        fixed: 'right',
        render: ({ id }) => (
          <Select
            className="w-100"
            placeholder={t('ACTION')}
            options={actionOptions({ t })}
            onSelect={actionHandler({ id, serviceType })}
          />
        ),
      },
    ];
  }
  if (serviceType === SERVICE_TYPES.SMS) {
    return [
      {
        title: t('ID'),
        dataIndex: 'id',
        key: 'id',
        width: 160,
      },
      {
        title: t('NAME'),
        dataIndex: 'name',
        key: 'name',
        width: 200,
        sorter: true,
      },
      {
        title: t('CREATED_AT'),
        key: 'createdAt',
        width: 200,
        sorter: true,
        render: ({ createdAt }) => moment.utc(createdAt).tz(selectedCountryPrimaryTimeZone).format('DD.MM.YYYY HH:mm'),
      },
      {
        title: t('TEAM_NAME'),
        dataIndex: 'teamName',
        key: 'teamName',
        width: 160,
        sorter: true,
      },
      {
        title: t('TRIBE_NAME'),
        dataIndex: 'tribeName',
        key: 'tribeName',
        width: 160,
        sorter: true,
      },
      {
        title: t('PERMISSIONS'),
        key: 'permissions',
        width: 160,
        sorter: true,
        render: ({ permissions }) => {
          return permissions?.map(permission => {
            return (<Tag>{permission}</Tag>);
          });
        },
      },
      {
        title: t('PURPOSE'),
        dataIndex: 'purpose',
        key: 'purpose',
        width: 160,
        sorter: true,
      },
      {
        title: t('STATUS'),
        key: 'isActive',
        width: 100,
        sorter: true,
        render: ({ isActive }) => {
          return (
            isActive ?
              <Tag color="green">{t('button:ACTIVE')}</Tag>
              :
              <Tag color="red">{t('button:INACTIVE')}</Tag>
          );
        },
      },
      {
        title: t('ACTION'),
        key: 'action',
        width: 150,
        fixed: 'right',
        render: ({ id }) => (
          <Select
            className="w-100"
            placeholder={t('ACTION')}
            options={actionOptions({ t })}
            onSelect={actionHandler({ id, serviceType })}
          />
        ),
      },
    ];
  }
  return [];
};
