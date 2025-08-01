import _ from 'lodash';

import { DetailButton } from '@shared/components/UI/List';

export const tableColumns = t => [
  {
    title: t('NAME'),
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: t('GSM'),
    dataIndex: 'gsm',
    key: 'gsm',
  },
  {
    title: '',
    key: '_id',
    width: '10%',
    render: obj => {
      return DetailButton({
        _id: _.get(obj, '_id'),
        urlPath: '/marketFranchise/user/detail/',
      });
    },
  },
];
