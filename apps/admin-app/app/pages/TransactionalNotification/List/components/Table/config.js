import { Select, Tag, Tooltip } from 'antd';
import moment from 'moment';
import { get } from 'lodash';

import { Creators } from '@app/pages/TransactionalNotification/List/redux/actions';
import { TRANSACTIONAL_NOTIFICATION_ACTIONS } from '@app/pages/TransactionalNotification/constants';
import { getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';
import { getLangKey } from '@shared/i18n';

const getEligibleActions = () => {
  return [TRANSACTIONAL_NOTIFICATION_ACTIONS.DETAIL, TRANSACTIONAL_NOTIFICATION_ACTIONS.DUPLICATE];
};

const actionOptions = ({ t, status, transactionalNotificationProcessStatus }) => getEligibleActions({ status, transactionalNotificationProcessStatus })
  .map(value => ({ label: t(value), value }));

const actionHandler = ({ id, dispatch }) => action => {
  const actions = {
    [TRANSACTIONAL_NOTIFICATION_ACTIONS.DETAIL]() {
      window.open(`/transactional-notification/detail/${id}`);
    },
    [TRANSACTIONAL_NOTIFICATION_ACTIONS.DUPLICATE]() {
      dispatch(Creators.duplicateRequest({ id, clientLanguage: getLangKey() }));
    },
  };
  (actions[action])();
};

export const generateNotificationColumns = ({ t, dispatch, filters, config }) => {
  const selectedCountryPrimaryTimeZone = getSelectedCountryTimeZones()[0]?.timezone;
  return [
    {
      title: t('TRANSACTIONAL_NOTIFICATION_ID'),
      dataIndex: 'id',
      key: 'id',
      width: 200,
    },
    {
      title: t('NAME'),
      dataIndex: 'name',
      key: 'name',
      width: 100,
      ellipsis: { showTitle: false },
      sorter: true,
      minWidth: 150,
      render: name => (
        <Tooltip placement="topLeft" title={name}>
          {name}
        </Tooltip>
      ),
    },
    {
      title: t('TITLE'),
      dataIndex: 'title',
      key: 'title',
      ellipsis: { showTitle: false },
      sort: true,
      width: 200,
      render: title => (
        <Tooltip placement="topLeft" title={title}>
          {title}
        </Tooltip>
      ),
    },
    {
      title: t('CREATED_AT'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
      sorter: true,
      render: createdAt => moment.utc(createdAt).tz(selectedCountryPrimaryTimeZone).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: t('TARGET_SERVICE'),
      dataIndex: 'domainType',
      key: 'domainType',
      width: 150,
      sorter: true,
    },
    {
      title: t('DEPARTMENT'),
      dataIndex: 'department',
      key: 'department',
      width: 100,
    },
    {
      title: t('SENDER'),
      key: 'type',
      width: 100,
      render: ({ type }) => {
        return (
          <Tag color="cyan">
            {get(config.configData.types, type, '')}
          </Tag>
        );
      },
    },
    {
      title: t('TYPE'),
      key: 'notificationType',
      width: 100,
      render: ({ notificationType }) => {
        return (
          <Tag color="cyan">
            {get(config.configData.notificationTypes, notificationType, '')}
          </Tag>
        );
      },
    },
    {
      title: t('ACTION'),
      key: 'action',
      width: 150,
      fixed: 'right',
      render: ({ id, status, actionProcessStatus }) => (
        <Select
          className="w-100"
          placeholder={t('ACTION')}
          options={actionOptions({ t, status, actionProcessStatus })}
          onSelect={actionHandler({ id, dispatch, filters })}
        />
      ),
    },
  ];
};
