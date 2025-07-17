/* eslint-disable no-inline-styles/no-inline-styles */
import { Select, Tag } from 'antd';
import { get } from 'lodash';
import moment from 'moment';

import { Creators } from '@app/pages/PushNotification/List/redux/actions';
import { notificationProcessStatus, notificationTypes } from '@app/pages/PushNotification/constantValues';
import { getLangKey } from '@shared/i18n';
import {
  NOTIFICATION_ACTION,
  NOTIFICATION_STATUS,
  NOTIFICATION_PROCESS_STATUS,
  NOTIFICATION_OPTION_TYPES,
} from '@app/pages/PushNotification/constants';

const NOTIF_STATUS_MAP = {
  [NOTIFICATION_STATUS.ACTIVE]: {
    value: 'ACTIVE',
    color: 'green',
  },
  [NOTIFICATION_STATUS.INACTIVE]: {
    value: 'INACTIVE',
    color: 'magenta',
  },
};

// cancellable mapping
const NOTIF_INACTIVE_CANCELLABLES = [
  NOTIFICATION_PROCESS_STATUS.CREATED,
  NOTIFICATION_PROCESS_STATUS.PAUSE,
  NOTIFICATION_PROCESS_STATUS.DAILY_COMPLETED,
  NOTIFICATION_PROCESS_STATUS.GLOBAL_PAUSE,
];

const NOTIF_CANCELLABLES = [
  NOTIFICATION_PROCESS_STATUS.CREATED,
  NOTIFICATION_PROCESS_STATUS.PRE_PROCESS,
  NOTIFICATION_PROCESS_STATUS.READY,
  NOTIFICATION_PROCESS_STATUS.IN_PROCESS,
  NOTIFICATION_PROCESS_STATUS.PAUSE,
  NOTIFICATION_PROCESS_STATUS.DAILY_COMPLETED,
  NOTIFICATION_PROCESS_STATUS.GLOBAL_PAUSE,
  NOTIFICATION_PROCESS_STATUS.DAILY_FINISHED,
];

const NOTIF_DOWNLOADABLES = [
  NOTIFICATION_PROCESS_STATUS.CANCEL,
  NOTIFICATION_PROCESS_STATUS.DAILY_FINISHED,
  NOTIFICATION_PROCESS_STATUS.FINISHED,
];

// resumable mapping: same status for active and inactive
const NOTIF_RESUMABLES = [
  NOTIFICATION_PROCESS_STATUS.PAUSE,
];

// pausable mapping
const NOTIF_INACTIVE_PAUSABLES = [
  NOTIFICATION_PROCESS_STATUS.DAILY_COMPLETED,
  NOTIFICATION_PROCESS_STATUS.GLOBAL_PAUSE,
];

const NOTIF_PAUSABLES = [
  NOTIFICATION_PROCESS_STATUS.READY,
  NOTIFICATION_PROCESS_STATUS.IN_PROCESS,
  NOTIFICATION_PROCESS_STATUS.DAILY_COMPLETED,
  NOTIFICATION_PROCESS_STATUS.GLOBAL_PAUSE,
];

const NOTIF_DELETABLES = [
  NOTIFICATION_PROCESS_STATUS.CREATED,
];

const getEligibleActions = ({ status, processStatus, notificationType }) => {
  const actions = [NOTIFICATION_ACTION.DETAIL];

  if (notificationType !== NOTIFICATION_OPTION_TYPES.AI) {
    actions.push(NOTIFICATION_ACTION.DUPLICATE);
  }

  if (NOTIF_DOWNLOADABLES.includes(processStatus)) {
    actions.push(NOTIFICATION_ACTION.DOWNLOAD_LIST);
  }
  if (NOTIF_RESUMABLES.includes(processStatus)) {
    actions.push(NOTIFICATION_ACTION.RESUME);
  }

  const eligibleActions = {
    [NOTIFICATION_STATUS.ACTIVE]() {
      if (NOTIF_CANCELLABLES.includes(processStatus)) {
        actions.push(NOTIFICATION_ACTION.CANCEL);
      }
      if (NOTIF_PAUSABLES.includes(processStatus)) {
        actions.push(NOTIFICATION_ACTION.PAUSE);
      }
    },
    [NOTIFICATION_STATUS.INACTIVE]() {
      if (NOTIF_DELETABLES.includes(processStatus)) {
        actions.push(NOTIFICATION_ACTION.DELETE);
      }
      if (NOTIF_INACTIVE_PAUSABLES.includes(processStatus)) {
        actions.push(NOTIFICATION_ACTION.PAUSE);
      }
      if (NOTIF_INACTIVE_CANCELLABLES.includes(processStatus)) {
        actions.push(NOTIFICATION_ACTION.CANCEL);
      }
    },
  };

  (eligibleActions[status])();

  return actions;
};

const actionOptions = ({ t, status, processStatus, notificationType }) => getEligibleActions({ status, processStatus, notificationType })
  .map(value => ({ label: t(value), value }));

const actionHandler = ({ notificationId, dispatch, filters }) => action => {
  const actions = {
    [NOTIFICATION_ACTION.DETAIL]() {
      window.open(`/pushNotification/detail/${notificationId}`);
    },
    [NOTIFICATION_ACTION.CANCEL]() {
      dispatch(Creators.cancelNotificationRequest({ data: { id: notificationId }, filters }));
    },
    [NOTIFICATION_ACTION.PAUSE]() {
      dispatch(Creators.pauseNotificationRequest({ data: { id: notificationId }, filters }));
    },
    [NOTIFICATION_ACTION.RESUME]() {
      dispatch(Creators.resumeNotificationRequest({ data: { id: notificationId }, filters }));
    },
    [NOTIFICATION_ACTION.DUPLICATE]() {
      dispatch(Creators.duplicateNotificationRequest({ data: { id: notificationId } }));
    },
    [NOTIFICATION_ACTION.DELETE]() {
      dispatch(Creators.deleteNotificationRequest({ data: { id: notificationId }, filters }));
    },
    [NOTIFICATION_ACTION.DOWNLOAD_LIST]() {
      dispatch(Creators.openDownloadListModal({ data: { id: notificationId } }));
    },
  };
  (actions[action])();
};

export const getHeaders = t => {
  return (
    [
      {
        title: t('NOTIFICATION_ID'),
        dataIndex: 'notificationId',
        key: 'notificationId',
        width: 200,
      },
      {
        title: t('NOTIFICATION_TITLE'),
        dataIndex: 'title',
        key: 'title',
        width: 200,
      },
      {
        title: t('NOTIFICATION_TYPE'),
        key: 'notificationType',
        width: 100,
        render: notif => {
          const notificationType = get(notif, 'notificationType', '');
          return get(notificationTypes, [notificationType, getLangKey()], '');
        },
      },
      {
        title: t('NOTIFICATION_TEXT'),
        dataIndex: 'notificationText',
        key: 'notificationText',
        width: 200,
        minWidth: 150,
      },
      {
        title: t('CUSTOM_LABEL'),
        dataIndex: 'customTag',
        key: 'customTag',
        width: 200,
        minWidth: 150,
      },
      {
        title: t('CREATION_DATE'),
        dataIndex: 'creationDate',
        key: 'creationDate',
        width: 150,
        // Todo : Implement dateHelpers/formatDate function
        render: creationDate => moment(creationDate).format('DD.MM.YYYY HH:mm'),
      },
      {
        title: t('SENDING_DATE'),
        dataIndex: 'startDate',
        key: 'startDate',
        width: 150,
        render: startDate => moment(startDate).format('DD.MM.YYYY HH:mm'),
      },
      {
        title: t('SERVICE'),
        dataIndex: 'service',
        key: 'service',
        width: 100,
      },
      {
        title: t('DEPARTMENT'),
        dataIndex: 'responsibleDepartment',
        key: 'responsibleDepartment',
        width: 100,
      },
      {
        title: t('NOTIFICATION_CATEGORIES'),
        dataIndex: 'notificationCategory',
        key: 'notificationCategory',
        width: 100,
      },
      {
        title: t('TARGET_PERSON'),
        key: 'target_person',
        width: 120,
        render: notif => {
          const _targettedPersons = get(notif, 'target_person', '');
          const _successNotifCount = get(notif, 'successCount', '');
          return `${_successNotifCount} / ${_targettedPersons}`;
        },
      },
      {
        title: t('STATUS'),
        key: 'status',
        width: 100,
        sorter: { compare: (a, b) => a.status - b.status },
        render: notif => (
          <Tag color={NOTIF_STATUS_MAP[notif.status]?.color}>
            {t(`global:${NOTIF_STATUS_MAP[notif.status]?.value}`)}
          </Tag>
        ),
      },
      {
        title: t('PROCESS_STATUS'),
        key: 'processStatus',
        width: 100,
        render: notif => {
          const _processStatus = get(notif, 'processStatus', '');
          return get(notificationProcessStatus, [_processStatus, getLangKey()], '');
        },
      },
    ]
  );
};

export const generateNotificationColumns = ({ t, dispatch, filters, selectedHeaders = [] }) => {
  let notificationColumns = getHeaders(t);
  if (selectedHeaders.length !== 0) {
    notificationColumns = notificationColumns.filter(header => {
      return selectedHeaders.includes(header.key);
    });
  }

  const actionHeader = {
    title: t('ACTION'),
    key: 'action',
    width: 150,
    fixed: 'right',
    render: ({ notificationId, status, processStatus, notificationType }) => {
      return (
        <Select
          className="w-100"
          placeholder={t('SELECT')}
          options={actionOptions({ t, status, processStatus, notificationType })}
          onSelect={actionHandler({ notificationId, dispatch, filters })}
        />
      );
    },
  };

  return [...notificationColumns, actionHeader];
};
