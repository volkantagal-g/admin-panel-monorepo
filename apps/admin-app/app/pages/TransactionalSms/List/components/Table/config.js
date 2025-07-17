import { Select, Tag, Tooltip } from 'antd';
import moment from 'moment';

import { get } from 'lodash';

import { Creators } from '@app/pages/TransactionalSms/List/redux/actions';
import { TRANSACTIONAL_SMS_ACTIONS } from '@app/pages/TransactionalSms/constants';
import { getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';
import { getLangKey } from '@shared/i18n';

const actionOptions = ({ t }) => [
  { label: t(TRANSACTIONAL_SMS_ACTIONS.DETAIL), value: TRANSACTIONAL_SMS_ACTIONS.DETAIL },
  { label: t(TRANSACTIONAL_SMS_ACTIONS.DUPLICATE), value: TRANSACTIONAL_SMS_ACTIONS.DUPLICATE },
];

const actionHandler = ({ id, dispatch }) => action => {
  const actions = {
    [TRANSACTIONAL_SMS_ACTIONS.DETAIL]() {
      window.open(`/transactional-sms/detail/${id}`);
    },
    [TRANSACTIONAL_SMS_ACTIONS.DUPLICATE]() {
      dispatch(Creators.duplicateRequest({ id, clientLanguage: getLangKey() }));
    },
  };
  (actions[action])();
};

export const generateSmsColumns = ({ t, dispatch, filters, config }) => {
  const selectedCountryPrimaryTimeZone = getSelectedCountryTimeZones()[0]?.timezone;
  return [
    {
      title: t('TRANSACTIONAL_SMS_ID'),
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
      title: t('CREATED_AT'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
      sorter: true,
      render: createdAt => moment.utc(createdAt).tz(selectedCountryPrimaryTimeZone).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: t('TARGET_SERVICE'),
      dataIndex: 'targetService',
      key: 'targetService',
      width: 150,
      sorter: true,
    },
    {
      title: t('TYPE'),
      key: 'smsType',
      width: 100,
      render: ({ smsType }) => {
        return (
          <Tag color="cyan">
            {get(config?.configData?.smsTypes, smsType, '')}
          </Tag>
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
          onSelect={actionHandler({ id, dispatch, filters })}
        />
      ),
    },
  ];
};
