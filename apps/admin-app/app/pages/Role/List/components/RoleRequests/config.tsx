import { Button } from 'antd';
import moment from 'moment';
import { ColumnType } from 'antd/lib/table';
import { TFunction } from 'react-i18next';
import { Link } from 'react-router-dom';

import { getLocalDateTimeFormat } from '@shared/utils/localization';
import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';
import { ROLE_REQUEST_STATUSES } from '@app/pages/Role/List/constants';
import AnalyticsService from '@shared/services/analytics';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';

export const ROLE_REQUEST_TABS = {
  MINE: 'mine',
  PENDING_APPROVAL: 'pendingApproval',
};

export const tableColumns = ({
  canAccess,
  onCancel,
  showRoleRequestModal,
  t,
  tab,
}: {
  canAccess: (permKey: string) => boolean,
  onCancel: (id: MongoIDType) => () => void,
  showRoleRequestModal: (roleRequest: RoleRequestType) => void,
  t: TFunction,
  tab: string,
}) => {
  const showUser = tab === 'pendingApproval';
  const columns: ColumnType<RoleRequestType>[] = [
    {
      title: t('ID'),
      dataIndex: '_id',
      key: '_id',
      width: 170,
    },
  ];

  if (showUser) {
    columns.push({
      title: t('USER'),
      dataIndex: ['user', 'name'],
      key: 'user',
      width: 150,
    });
  }

  return columns.concat([
    {
      title: t('ROLE'),
      dataIndex: 'role',
      key: 'role',
      width: 300,
      ellipsis: true,
      render: (role, roleRequest) => {
        if (canAccess(permKey.PAGE_ROLE_DETAIL)) {
          return (
            <Link to={ROUTE.ROLE_DETAIL.path.replace(':id', role._id)}>
              <Button size="small" title={(roleRequest.role as RoleType)?.name}>{(roleRequest.role as RoleType)?.name}</Button>
            </Link>
          );
        }

        return (roleRequest.role as RoleType)?.name;
      },
    },
    {
      title: t('REQUEST_DATE'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => moment(a.createdAt).diff(moment(b.createdAt)),
      defaultSortOrder: 'descend',
      width: 120,
      render: recordDate => (
        moment(recordDate).format(getLocalDateTimeFormat())
      ),
    },
    {
      title: t('STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: 110,
      render: status => t(`ROLE_REQUEST_STATE.${status}`),
    },
    {
      title: t('ACTION'),
      width: 130,
      render: (text, record) => {
        if (tab === ROLE_REQUEST_TABS.MINE) {
          if (record.status === ROLE_REQUEST_STATUSES.CANCELED || record.status === ROLE_REQUEST_STATUSES.COMPLETED) {
            return (
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  showRoleRequestModal(record);
                  AnalyticsService.track(PANEL_EVENTS.ROLE_LIST.EVENT_NAME.BUTTON, { button: PANEL_EVENTS.ROLE_LIST.BUTTON.MY_REQUESTS_VIEW_REPLY });
                }}
              >{t('VIEW_REPLY')}
              </Button>
            );
          }

          return (
            <Button
              size="small"
              danger
              onClick={onCancel(record._id)}
            >{t('CANCEL')}
            </Button>
          );
        }

        if (record.status === ROLE_REQUEST_STATUSES.PENDING) {
          return (
            <Button
              size="small"
              type="primary"
              onClick={() => {
                showRoleRequestModal(record);
                AnalyticsService.track(PANEL_EVENTS.ROLE_LIST.EVENT_NAME.BUTTON, { button: PANEL_EVENTS.ROLE_LIST.BUTTON.PENDING_APPROVAL_REPLY });
              }}
            >
              {t('REPLY')}
            </Button>
          );
        }
        return (
          <Button
            size="small"
            onClick={() => {
              showRoleRequestModal(record);
              AnalyticsService.track(PANEL_EVENTS.ROLE_LIST.EVENT_NAME.BUTTON, { button: PANEL_EVENTS.ROLE_LIST.BUTTON.MY_REQUESTS_STATUS });
            }}
          >
            {t('VIEW_DETAILS')}
          </Button>
        );
      },
    },
  ]);
};
