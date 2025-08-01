import moment from 'moment';
import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { crisisCardEnumValues } from '@app/pages/MarketFranchise/Detail/components/CrisesManagement/constants';

export const getTableColumns = t => {
  return [
    {
      title: t('DATE'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '120px',
      render: createdAt => moment(createdAt).format('DD.MM.YYYY HH:mm:ss'),
    },
    {
      title: t('USER'),
      dataIndex: 'fullName',
      key: 'fullName',
      width: '120px',
    },
    {
      title: t('CRISIS_CARD_NUMBER'),
      dataIndex: 'cardNumber',
      key: 'cardNumber',
      width: '120px',
      render: cardNumber => `#${cardNumber}`,
    },
    {
      title: t('ACTION'),
      dataIndex: 'action',
      key: 'action',
      width: '120px',
      render: action => {
        return get(crisisCardEnumValues, [action, getLangKey()], '-');
      },
    },
  ];
};
