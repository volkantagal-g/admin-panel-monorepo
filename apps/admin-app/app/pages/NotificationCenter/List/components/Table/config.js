import { Popover, Select, Tag } from 'antd';
import moment from 'moment';

import { Creators } from '@app/pages/NotificationCenter/List/redux/actions';
import { PROCESS_STATUS, NOTIFICATION_CENTER_ACTIONS, NOTIFICATION_CENTER_STATUS } from '@app/pages/NotificationCenter/constants';
import { getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';

const STATUS_MAP = {
  [NOTIFICATION_CENTER_STATUS.ACTIVE]: {
    value: 'ACTIVE',
    color: 'green',
  },
  [NOTIFICATION_CENTER_STATUS.INACTIVE]: {
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
  const actions = [NOTIFICATION_CENTER_ACTIONS.DETAIL, NOTIFICATION_CENTER_ACTIONS.DUPLICATE];
  const eligibleActions = {
    [NOTIFICATION_CENTER_STATUS.ACTIVE]() {
      if (CANCELLABLES.includes(processStatus)) {
        actions.push(NOTIFICATION_CENTER_ACTIONS.CANCEL);
      }
    },
    [NOTIFICATION_CENTER_STATUS.INACTIVE]() {
      if (INACTIVE_CANCELLABLES.includes(processStatus)) {
        actions.push(NOTIFICATION_CENTER_ACTIONS.CANCEL);
      }
    },
  };
  (eligibleActions[status])();
  return actions;
};

const actionOptions = ({ t, status, processStatus }) => getEligibleActions({ status, processStatus })
  .map(value => ({ label: t(value), value }));

const actionHandler = ({ id, dispatch }) => action => {
  const actions = {
    [NOTIFICATION_CENTER_ACTIONS.DETAIL]() {
      window.open(`/announcementv2/detail/${id}`);
    },
    [NOTIFICATION_CENTER_ACTIONS.CANCEL]() {
      dispatch(Creators.cancelRequest({ id }));
    },
    [NOTIFICATION_CENTER_ACTIONS.DUPLICATE]() {
      dispatch(Creators.duplicateRequest({ id }));
    },
  };
  (actions[action])();
};

export const getTableColumns = (t, classes) => {
  const selectedCountryPrimaryTimeZone = getSelectedCountryTimeZones()[0]?.timezone;
  return [
    {
      title: t('ANNOUNCEMENT_IMAGE'),
      key: 'image',
      width: 150,
      render: notificationCenter => {
        const { picUrl } = notificationCenter;

        const imageHolder = (
          <div className={classes.imageHolder}>
            {picUrl && <img src={picUrl} alt="PicUrl" />}
          </div>
        );

        return (
          <Popover content={<div className={classes.popover}>{imageHolder}</div>}>
            <div className="w-full">
              {imageHolder}
            </div>
          </Popover>

        );
      },
    },
    {
      title: t('ANNOUNCEMENT_ID'),
      dataIndex: 'id',
      key: 'id',
      width: 200,
    },
    {
      title: t('TITLE'),
      dataIndex: 'title',
      key: 'title',
      width: 300,
    },
    {
      title: t('DESCRIPTION'),
      dataIndex: 'description',
      key: 'description',
      width: 200,
      minWidth: 150,
    },
    {
      title: t('START_DATE'),
      dataIndex: 'validFrom',
      key: 'validFrom',
      width: 150,
      sorter: true,
      render: validFrom => moment.utc(validFrom).tz(selectedCountryPrimaryTimeZone).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: t('END_DATE'),
      dataIndex: 'validUntil',
      key: 'validUntil',
      width: 150,
      sorter: true,
      render: validUntil => moment.utc(validUntil).tz(selectedCountryPrimaryTimeZone).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: t('TARGET_SERVICE'),
      dataIndex: 'domainType',
      key: 'domainType',
      sorter: true,
      width: 130,
    },
    {
      title: t('STATUS'),
      key: 'status',
      width: 100,
      render: notificationCenter => (
        <Tag color={STATUS_MAP[notificationCenter.status]?.color}>
          {t(`global:${STATUS_MAP[notificationCenter.status]?.value}`)}
        </Tag>
      ),
    },
  ];
};

export const generateTableColumns = ({ t, dispatch, filters, selectedHeaders, classes }) => {
  let tableColumns = getTableColumns(t, classes);
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
