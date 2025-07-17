import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { get, isEmpty } from 'lodash';

import { currencyFormat } from '@shared/utils/localization';
import { orderDetailSelector } from '../../redux/selectors';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import TableSummary from './components/TableSummary';
import { getTableColumns } from './config';
import { createProductMap } from './utils';
import { Space } from '@shared/components/GUI';

const PartialRefunds = () => {
  const { t } = useTranslation('marketOrderPage');
  const orderDetail = useSelector(orderDetailSelector.getData);
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const isoCountryCode = get(orderDetail, 'country.currency.code.alpha', 'TRY');
  const { format: currencyFormatter } = currencyFormat({
    currency: isoCountryCode,
    maxDecimal: 4,
  });
  const partialRefunds = get(orderDetail, 'partialRefunds', []);

  const productMap = createProductMap(orderDetail);

  const columns = getTableColumns({ t, productMap, currencyFormatter });

  const renderTableSummary = data => {
    const tableProps = { data, currencyFormatter };
    return <TableSummary {...tableProps} />;
  };

  return (
    <Space className="p-2" title={t('PARTIAL_REFUND.TITLE')}>
      <AntTableV2
        summary={data => (!isEmpty(partialRefunds) ? renderTableSummary(data) : null)}
        data={partialRefunds}
        columns={columns}
        loading={isPending}
        data-testid="partial-refund-list"
      />
    </Space>
  );
};

export default PartialRefunds;
