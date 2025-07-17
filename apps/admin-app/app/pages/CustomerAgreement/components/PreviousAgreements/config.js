import moment from 'moment';
import { Button, Tag, Space, Switch } from 'antd';
import { Link } from 'react-router-dom';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import permKey from '@shared/shared/permKey.json';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { ROUTE } from '@app/routes';

const VERSION_IDENTIFIER = 'v';
const EMPTY = '';

export const tableColumns = ({
  t,
  canAccess,
  tableEvents,
  isForcedPending,
}) => [
  {
    title: t('PREVIOUS_AGREEMENTS.COLUMNS.VERSION'),
    dataIndex: 'version',
    key: 'version',
    width: 100,
    render: version => `${VERSION_IDENTIFIER}${version}`,
  },
  {
    title: t('PREVIOUS_AGREEMENTS.COLUMNS.UPLOAD_DATE'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (createdAt = { createdAt: EMPTY }) => (<span>{moment(createdAt).format(getLocalDateTimeFormat())}</span>),
  },
  {
    title: t('PREVIOUS_AGREEMENTS.COLUMNS.UPLOADED_BY'),
    dataIndex: 'uploadedByDetails',
    key: 'uploadedByDetails',
    render: uploadedByDetails => {
      if (!uploadedByDetails) return (<span>{EMPTY}</span>);

      const { name: userName, id: userId } = uploadedByDetails;
      const userDetailRoute = ROUTE.USER_DETAIL.path;
      const userDetailPath = userDetailRoute.replace(':id', userId);
      const hasAccessToUserDetailPage = canAccess(permKey.PAGE_USER_DETAIL);
      if (userName && userId && hasAccessToUserDetailPage) {
        return (
          <Link to={userDetailPath} target="_blank">
            <Button type="link" size="small">
              {userName}
            </Button>
          </Link>
        );
      }
      return (<span>{userName}</span>);
    },
  },
  {
    title: t('PREVIOUS_AGREEMENTS.COLUMNS.LAST_FORCED_DATE'),
    dataIndex: 'lastForcedDate',
    key: 'lastForcedDate',
    render: lastForcedDate => {
      if (lastForcedDate) {
        return moment(lastForcedDate).format(getLocalDateTimeFormat());
      }
      return null;
    },
  },
  {
    title: t('PREVIOUS_AGREEMENTS.COLUMNS.LAST_UN_FORCED_DATE'),
    dataIndex: 'lastUnForcedDate',
    key: 'lastUnForcedDate',
    render: lastUnForcedDate => {
      if (lastUnForcedDate) {
        return moment(lastUnForcedDate).format(getLocalDateTimeFormat());
      }
      return null;
    },
  },
  {
    title: t('PREVIOUS_AGREEMENTS.COLUMNS.DOCUMENTS'),
    dataIndex: 'urls',
    key: 'urls',
    render: urls => {
      if (urls) {
        return Object.entries(urls)
          .map(([language, url]) => {
            return (
              <Tag key={language}>
                <a target="_blank" rel="noreferrer" href={url}>{language.toUpperCase()}</a>
              </Tag>
            );
          });
      }
      return (<span>{EMPTY}</span>);
    },
  },
  {
    title: t('LATEST_AGREEMENT.COLUMNS.FORCED'),
    align: 'right',
    width: 200,
    render: record => {
      const { _id: agreementId, forced } = record;
      const isForceAllowed = canAccess(permKey.PAGE_CUSTOMER_AGREEMENT_FORCE_AGREEMENT);
      const onToggle = value => {
        const payload = {
          isForced: value,
          agreementId,
        };
        tableEvents.onForceChange({ payload });
      };

      if (record?.canBeForce || record.forced) {
        return (
          <Space>
            <Switch
              loading={isForcedPending}
              disabled={!isForceAllowed}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              checked={forced}
              onChange={onToggle}
            />
          </Space>
        );
      }

      if (record?.lastUnForcedDate) {
        return <CheckOutlined />;
      }

      if (!record || !record?.canBeForce) return (<span>-</span>);

      return null;
    },
  },
];
