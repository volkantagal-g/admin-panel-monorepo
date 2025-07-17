import { Typography } from 'antd';

import { t } from '@shared/i18n';
import { currencyFormat } from '@shared/utils/localization';

const { Text } = Typography;

export const tableColumns = [
  {
    title: t('artisanOrderPage:USAGE_BENEFITS'),
    dataIndex: 'benefit',
    key: 'benefit',
    width: 100,
    render: benefit => {
      return benefit;
    },
  },
  {
    title: t('artisanOrderPage:AMOUNT'),
    dataIndex: 'amount',
    key: 'amount',
    width: 100,
    align: 'right',
    render: amount => {
      return (
        <>
          <Text delete>{currencyFormat().format(amount / 100)}</Text> <Text>{currencyFormat().format(0)}</Text>
        </>
      );
    },
  },
];
