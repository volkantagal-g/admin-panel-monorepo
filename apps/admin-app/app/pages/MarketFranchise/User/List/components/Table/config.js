import { Button } from 'antd';
import { Link } from 'react-router-dom';

import permKey from '@shared/shared/permKey.json';
import { showStatus } from '../../utils';

export const tableColumns = (t, Can) => [
  {
    title: t('global:NAME'),
    dataIndex: 'name',
    key: 'name',
    width: 140,
  },
  {
    title: t('global:EMAIL'),
    dataIndex: 'email',
    key: 'email',
    width: 130,
  },
  {
    title: t('global:GSM'),
    dataIndex: 'gsm',
    key: 'gsm',
    width: 120,
  },
  {
    title: t('global:ACTIVENESS'),
    dataIndex: 'active',
    key: 'active',
    width: 80,
    render: active => showStatus({ active, t }),
  },
  {
    title: t('global:FRANCHISE'),
    dataIndex: '_id',
    key: '_id',
    width: 60,
    render: id => (
      <Can key="franchiseUserDetail" permKey={permKey.PAGE_MARKET_FRANCHISE_USER_DETAIL}>
        <Link to={`/marketFranchise/user/detail/${id}`}>
          <Button
            key="franchiseUserDetailButton"
            size="small"
          >
            {t('global:DETAIL')}
          </Button>
        </Link>
      </Can>
    ),
  },
];
