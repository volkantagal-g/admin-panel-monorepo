import { Select } from 'antd';
import moment from 'moment';

import { COMMUNICATION_CALLBACK_URLS_ACTIONS } from '@app/pages/CommunicationCallbackUrls/constants';
import { getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';

const getEligibleActions = () => {
  return [COMMUNICATION_CALLBACK_URLS_ACTIONS.DETAIL];
};

const actionOptions = ({ t }) => getEligibleActions()
  .map(value => ({ label: t(value), value }));

const actionHandler = ({ id, serviceType }) => action => {
  const actions = {
    [COMMUNICATION_CALLBACK_URLS_ACTIONS.DETAIL]() {
      window.open(`/callback-urls/detail/${id}/${serviceType}`);
    },
  };
  (actions[action])();
};

export const generateColumns = ({ t, serviceType }) => {
  const selectedCountryPrimaryTimeZone = getSelectedCountryTimeZones()[0]?.timezone;
  return [
    {
      title: t('ID'),
      dataIndex: 'id',
      key: 'id',
      width: 160,
    },
    {
      title: t('CALLBACK_TYPE'),
      dataIndex: 'callbackType',
      key: 'callbackType',
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
      title: t('CALLBACK_URL'),
      dataIndex: 'url',
      key: 'url',
      width: 160,
      sorter: true,
    },
    {
      title: t('SERVICE_NAME'),
      dataIndex: 'serviceName',
      key: 'serviceName',
      width: 160,
      sorter: true,
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
};
