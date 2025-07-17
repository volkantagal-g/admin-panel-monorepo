import { Table } from 'antd';

import { useSelector } from 'react-redux';

import { get } from 'lodash';

import { useTranslation } from 'react-i18next';

import { formatDate } from '@shared/utils/dateHelper';
import { getProductsTotalAmount } from '../../utils';
import { orderDetailSelector } from '../../../../redux/selectors';

const { Summary: { Cell, Row } } = Table;

const TableSummary = ({ data, currencyFormatter }) => {
  const { t } = useTranslation('marketOrderPage');
  const marketOrder = useSelector(orderDetailSelector.getData);
  const bagFeeRefundStatus = get(marketOrder, 'bagFeeRefundStatus', {});
  const serviceFeeRefundStatus = get(marketOrder, 'serviceFeeRefundStatus', {});
  const deliveryFeeRefundStatus = get(
    marketOrder,
    'deliveryFeeRefundStatus',
    {},
  );
  const amount = getProductsTotalAmount(marketOrder);
  const totalPartialRefundAmount =
    amount +
    (bagFeeRefundStatus?.amount || 0) +
    (deliveryFeeRefundStatus?.amount || 0) +
    (serviceFeeRefundStatus?.amount || 0);
  const { date } = data?.[0] || {};
  return (
    <>
      <Row data-testid="table-summary">
        <Cell prefixCls="table" index={0} />
        <Cell prefixCls="table" index={1}>
          <strong>Total</strong>
        </Cell>
        <Cell prefixCls="table" index={2}>
          <strong>{`${currencyFormatter(amount)}`}</strong>
        </Cell>
        <Cell prefixCls="table" index={3}>
          {' '}
          {formatDate(date)}
        </Cell>
      </Row>
      {bagFeeRefundStatus?.isRefunded && (
        <Row>
          <Cell prefixCls="table" index={0} />
          <Cell prefixCls="table" index={1}>
            <strong>{t('BAG_PRICE')}</strong>
          </Cell>
          <Cell prefixCls="table" index={2}>
            <strong>{`${currencyFormatter(
              bagFeeRefundStatus?.amount,
            )}`}
            </strong>
          </Cell>
          <Cell prefixCls="table" index={3} />
        </Row>
      )}
      {deliveryFeeRefundStatus?.isRefunded && (
        <Row>
          <Cell prefixCls="table" index={0} />
          <Cell prefixCls="table" index={1}>
            <strong>{t('DELIVERY_FEE')}</strong>
          </Cell>
          <Cell prefixCls="table" index={2}>
            <strong>
              {' '}
              {`${currencyFormatter(deliveryFeeRefundStatus?.amount)}`}
            </strong>
          </Cell>
          <Cell prefixCls="table" index={3} />
        </Row>
      )}
      {serviceFeeRefundStatus?.isRefunded && (
        <Row>
          <Cell prefixCls="table" index={0} />
          <Cell prefixCls="table" index={1}>
            <strong>{t('SERVICE_FEE')}</strong>
          </Cell>
          <Cell prefixCls="table" index={2}>
            <strong>
              {' '}
              {`${currencyFormatter(serviceFeeRefundStatus?.amount ?? 0)}`}
            </strong>
          </Cell>
          <Cell prefixCls="table" index={3} />
        </Row>
      )}
      <Row>
        <Cell prefixCls="table" index={0} />
        <Cell prefixCls="table" index={1}>
          <strong>{t('TOTAL_PRICE')}</strong>
        </Cell>
        <Cell prefixCls="table" index={2}>
          <strong>{`${currencyFormatter(totalPartialRefundAmount)}`}</strong>
        </Cell>
        <Cell prefixCls="table" index={3} />
      </Row>
    </>
  );
};

export default TableSummary;
