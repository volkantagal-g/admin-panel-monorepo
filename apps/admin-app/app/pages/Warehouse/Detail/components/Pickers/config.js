import { Link } from 'react-router-dom';

import { t } from '@shared/i18n';
import permKey from '@shared/shared/permKey.json';
import { ListTag } from '@shared/components/UI/List';
import { ACTIVE, CLOSED, COURIER_ACTIVENESS, INACTIVE } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';

export const tableColumns = canAccess => [
  {
    title: t('global:Name'),
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: t('warehousePage:ACTIVENESS'),
    dataIndex: 'isLoggedIn',
    key: 'isLoggedIn',
    render: status => {
      const statusKey = (status && ACTIVE) || (status === false && CLOSED) || INACTIVE;
      return ListTag({
        tagCode: statusKey,
        tagType: COURIER_ACTIVENESS,
        namespace: 'warehousePage',
      });
    },
  },
  {
    title: '',
    key: '_id',
    width: '10%',
    render: obj => {
      return canAccess(permKey.PAGE_PICKER_DETAIL) && <Link to={ROUTE.PICKER_DETAIL.path.replace(':id', obj._id)}>{t('global:DETAIL')}</Link>;
    },
  },
];
