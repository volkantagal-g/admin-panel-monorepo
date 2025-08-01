import _ from 'lodash';

import { DetailButton } from '@shared/components/UI/List';
import OwnerLabels from './components/OwnerLabels';
import WarehousesLabel from './components/WarehousesLabel';

export const tableColumns = t => {
  return [
    {
      title: t('global:NAME'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('marketFranchisePage:FRANCHISE_TYPE'),
      key: 'franchiseType',
      render: obj => {
        const franchiseType = _.get(obj, 'franchiseType', 2);
        return t(`marketFranchisePage:MARKET_FRANCHISE_TYPES:${franchiseType}`);
      },
    },
    {
      title: t('marketFranchisePage:WAREHOUSES'),
      key: 'warehouses',
      render: obj => {
        return WarehousesLabel({ warehouses: obj.warehouses });
      },
    },
    {
      title: t('marketFranchisePage:OWNERS'),
      key: 'owners',
      render: obj => {
        return OwnerLabels({ owners: obj.owners });
      },
    },
    {
      title: '',
      key: '_id',
      width: "10%",
      render: obj => {
        return DetailButton({
          _id: obj._id,
          urlPath: '/marketFranchise/detail/',
        });
      },
    },
  ];
};
