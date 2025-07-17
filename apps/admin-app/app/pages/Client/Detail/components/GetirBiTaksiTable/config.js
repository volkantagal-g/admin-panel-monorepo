import { Tag } from 'antd';

import { currencyFormat } from '@shared/utils/localization';
import { formatDate } from '@shared/utils/dateHelper';
import { ORDER_STATUS_COLOR_MAP }  from '@shared/shared/constants';

const columnsConfig = t => [
  {
    title: t('GETIR_BI_TAKSI_TABLE.TRIP_DATE'),
    dataIndex: 'tripDate',
    key: 'tripDate',
    render: tripDate => tripDate ? formatDate(tripDate) : '-',
  },
  {
    title: t('PRICE'),
    dataIndex: 'baseAmount',
    key: 'baseAmount',
    render: baseAmount => currencyFormat({ maxDecimal: 2 }).format(baseAmount),
  },
  {
    title: t('STATUS'),
    dataIndex: 'status',
    key: 'status',
    render: status => (
      <Tag color={ORDER_STATUS_COLOR_MAP[status?.toLowerCase()]}>
        {status}
      </Tag>
    ),
  },
];

export default columnsConfig;
