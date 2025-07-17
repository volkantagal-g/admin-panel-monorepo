import { Select, Tag } from 'antd';
import moment from 'moment';

import { ACTIVENESS_STATUS, CAMPAIGN_STATUS, COMMUNICATION_BULK_SMS_ACTIONS } from '@app/pages/CommunicationBulkSms/constants';
import { getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';
import { Creators } from '@app/pages/CommunicationBulkSms/List/redux/actions';
import { getUser } from '@shared/redux/selectors/auth';
import { campaignStatus } from '@app/pages/CommunicationBulkSms/constantValues';

const getEligibleActions = () => {
  return [COMMUNICATION_BULK_SMS_ACTIONS.DETAIL, COMMUNICATION_BULK_SMS_ACTIONS.DUPLICATE, COMMUNICATION_BULK_SMS_ACTIONS.CANCEL];
};

const actionOptions = ({ t, currentCampaignStatus }) => {
  const eligibleActions = getEligibleActions();

  const allowedStatuses = [
    campaignStatus[CAMPAIGN_STATUS.INITIALIZING].en,
    campaignStatus[CAMPAIGN_STATUS.INITIALIZING].tr,
    campaignStatus[CAMPAIGN_STATUS.READY_FOR_DELIVERY].en,
    campaignStatus[CAMPAIGN_STATUS.READY_FOR_DELIVERY].tr,
  ];
  const isCancelAllowed = allowedStatuses.includes(currentCampaignStatus);
  if (isCancelAllowed) {
    return eligibleActions.map(value => ({
      label: t(value),
      value,
    }));
  }
  const filteredActions = eligibleActions.filter(action => action !== COMMUNICATION_BULK_SMS_ACTIONS.CANCEL);
  return filteredActions.map(value => ({
    label: t(value),
    value,
  }));
};

const actionHandler = ({ id, dispatch }) => action => {
  const actions = {
    [COMMUNICATION_BULK_SMS_ACTIONS.DETAIL]() {
      window.open(`/bulk-sms/detail/${id}`);
    },
    [COMMUNICATION_BULK_SMS_ACTIONS.DUPLICATE]() {
      dispatch(Creators.duplicateRequest({ id, clientId: getUser()?._id }));
    },
    [COMMUNICATION_BULK_SMS_ACTIONS.CANCEL]() {
      dispatch(Creators.getCancelRequest({ id, clientId: getUser()?._id }));
    },
  };
  (actions[action])();
};

const STATUS_MAP = {
  [ACTIVENESS_STATUS.ACTIVE]: {
    value: 'ACTIVE',
    color: 'green',
  },
  [ACTIVENESS_STATUS.INACTIVE]: {
    value: 'INACTIVE',
    color: 'magenta',
  },
};

export const getTableColumns = t => {
  const selectedCountryPrimaryTimeZone = getSelectedCountryTimeZones()[0]?.timezone;
  return [
    {
      title: t('ID'),
      dataIndex: 'id',
      key: 'id',
      width: 160,
    },
    {
      title: t('SENDER_DOMAIN'),
      dataIndex: 'senderDomain',
      key: 'senderDomain',
      width: 200,
      sorter: true,
    },
    {
      title: t('SENDER_ORGANIZATION'),
      dataIndex: 'senderOrganizationId',
      key: 'senderOrganizationId',
      width: 200,
      sorter: true,
      render: senderOrganizationId => {
        return t(`global:${senderOrganizationId}`);
      },
    },
    {
      title: t('CAMPAIGN_STATUS'),
      dataIndex: 'campaignStatus',
      key: 'campaignStatus',
      width: 200,
      sorter: true,
    },
    {
      title: t('SMS_TYPE'),
      dataIndex: 'smsType',
      key: 'smsType',
      width: 200,
      sorter: true,
      render: smsType => {
        return t(`communicationBulkSmsPage:${smsType}`);
      },
    },
    {
      title: t('CUSTOM_LABEL'),
      dataIndex: 'description',
      key: 'description',
      width: 200,
      sorter: true,
    },
    {
      title: t('ACTIVENESS_STATUS'),
      dataIndex: 'activenessStatus',
      key: 'activenessStatus',
      width: 200,
      sorter: true,
      render: activeness => (
        <Tag className="activenessStatus" color={STATUS_MAP[activeness]?.color}>
          {t(`global:${STATUS_MAP[activeness]?.value}`)}
        </Tag>
      ),
    },
    {
      title: t('CREATED_AT'),
      key: 'createdAt',
      width: 200,
      sorter: true,
      render: ({ createdAt }) => moment.utc(createdAt).tz(selectedCountryPrimaryTimeZone).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: t('DELIVERY_TIME'),
      key: 'deliveryTime',
      width: 200,
      sorter: true,
      render: ({ deliveryTime }) => moment.utc(deliveryTime).tz(selectedCountryPrimaryTimeZone).format('DD.MM.YYYY HH:mm'),
    },
  ];
};

export const generateTableColumns = ({ t, dispatch, filters, selectedHeaders }) => {
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
    render: ({ id, campaignStatus: currentCampaignStatus }) => {
      return (
        <Select
          className="w-100 action"
          placeholder={t('ACTION')}
          options={actionOptions({ t, currentCampaignStatus })}
          onSelect={actionHandler({
            id,
            dispatch,
            filters,
          })}
          value={null}
        />
      );
    },
  };
  return [...tableColumns, actionColumn];
};
