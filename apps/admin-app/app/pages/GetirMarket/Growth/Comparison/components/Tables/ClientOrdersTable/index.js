import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';

import { filtersSelector, clientOrderCountsSelector } from '../../../redux/selectors';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { getTableColumns } from './config';

const { Title } = Typography;

function ClientOrdersTable() {
  const { t } = useTranslation('getirMarketGrowthComparisonPage');
  const data = useSelector(clientOrderCountsSelector.getData);
  const isPending = useSelector(clientOrderCountsSelector.getIsPending);
  const filters = useSelector(filtersSelector.getFilters);
  const columns = getTableColumns(t, filters?.startDateRange, filters?.endDateRange);

  return (
    <AntTableV2
      title={<Title level={5}>{t('CLIENT_ORDERS')}</Title>}
      data={data}
      columns={columns}
      pagination={false}
      loading={isPending}
      bordered
    />
  );
}

export default ClientOrdersTable;
