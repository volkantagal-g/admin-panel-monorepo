import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table } from 'antd';
import { get, isEmpty } from 'lodash';

import { orderDetailSelector } from '../../redux/selectors';
import { getTableColumns } from './config';
import { createSubscriptionTableData } from './utils';
import { currencyFormat } from '@shared/utils/localization';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import { Space } from '@shared/components/GUI';

const { Summary: { Cell, Row } } = Table;
const TableSummary = ({ tableData, currencyFormatter, t: translate }) => {
  let total = 0;
  tableData?.forEach(({ amount }) => {
    total += amount;
  });
  return (
    <Row>
      <Cell prefixCls="table" index={0}>
        <strong>{translate('global:Total')}</strong>
      </Cell>
      <Cell prefixCls="table" index={1}>
        <strong>{currencyFormatter(total)}</strong>
      </Cell>
    </Row>
  );
};

const SubscriptionBenefitInfoTable = () => {
  const { Can } = usePermission();
  const { t } = useTranslation('marketOrderPage');
  const orderDetail = useSelector(orderDetailSelector.getData);
  const isPending = useSelector(orderDetailSelector.getIsPending);

  const subscriptionBenefitInfo = get(
    orderDetail,
    'basket.subscriptionBenefitInfo',
    {},
  );
  const orderPromo = get(orderDetail, 'promo.applied', []);

  const isoCountryCode = get(orderDetail, 'country.currency.code.alpha');
  const { format: currencyFormatter } = currencyFormat({ currency: isoCountryCode });
  const data = createSubscriptionTableData(
    subscriptionBenefitInfo,
    orderPromo,
    t,
  );

  const columns = getTableColumns(t, currencyFormatter);

  const renderTableSummary = tableData => {
    const tableProps = { tableData, currencyFormatter, t };
    return <TableSummary {...tableProps} />;
  };

  return (
    <Can permKey={permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_SUBSCRIPTION_BENEFIT_INFO}>
      <Space title={t('SUBSCRIPTION_BENEFIT_INFO.TITLE')}>
        <Table
          summary={summaryData => (!isEmpty(data) ? renderTableSummary(summaryData) : null)}
          dataSource={data}
          columns={columns}
          loading={isPending}
          data-testid="subscription-benefit-info-table"
          size="small"
          pagination={false}
        />
      </Space>
    </Can>
  );
};

export default SubscriptionBenefitInfoTable;
