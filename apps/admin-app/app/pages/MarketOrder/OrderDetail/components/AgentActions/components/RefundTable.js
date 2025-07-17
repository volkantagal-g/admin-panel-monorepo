import { isInteger } from 'lodash';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, InputNumber, Table, Form } from 'antd';

import { getLangKey } from '@shared/i18n';

import useStyles from './RefundTable.styles';

import useProducts from '../hooks/useProducts';
import RefundTableFooter from './RefundTableFooter';
import useCurrency from '../hooks/useCurrency';
import Product from './Product';
import { PRODUCT_TYPES } from '../../../constants';

const RefundTable = ({
  onInputChange,
  formValues,
  handleCheckbox,
  handleWholeRefundList,
  isFeedbackDetails,
  setIsWholeRefund,
}) => {
  const { t } = useTranslation('marketOrderPage');
  const { products } = useProducts();
  const { isWholeRefund } = formValues;
  const { format: currencyFormatter } = useCurrency();
  const { partialRefundList } = formValues;
  const styles = useStyles();

  const columns = useMemo(
    () => [
      {
        title: t('AGENT_ACTIONS.MODAL.REFUND.TABLE.PRODUCT'),
        key: 'product',
        dataIndex: 'product',
        width: 220,
        render: (_, product) => {
          const discountPrice = product.discountedPrice || product.discountedTotalAmount;
          const discountedPriceFormatted = product.isDiscounted ? currencyFormatter(discountPrice) : null;

          return (
            <Product
              image={product?.picURL?.[getLangKey()]}
              name={product?.name?.[getLangKey()]}
              price={`${currencyFormatter(product?.price)}`}
              discountedPrice={discountedPriceFormatted}
            />
          );
        },
      },
      {
        title: t('AGENT_ACTIONS.MODAL.REFUND.TABLE.QTY_ORDER'),
        key: 'count',
        dataIndex: 'count',
        width: 136,
        render: (_, product) => {
          return (
            <div
              className={styles.amount}
              data-testid="refund-market-order-table-quantity-ordered"
            >
              {product?.count}
            </div>
          );
        },
      },
      {
        title: t('AGENT_ACTIONS.MODAL.REFUND.TABLE.QTY_REFUND'),
        key: 'refunded',
        dataIndex: 'refunded',
        width: 136,
        render: (_, product) => {
          return (
            <div
              className={styles.amount}
              data-testid="refund-market-order-table-quantity-refunded"
            >
              {product?.refunded}
            </div>
          );
        },
      },
      {
        title: t('AGENT_ACTIONS.MODAL.REFUND.TABLE.QTY_REMAINING'),
        key: 'count',
        dataIndex: 'count',
        width: 136,
        render: (_, product) => {
          const maxToRefund = Number(product.count - product.refunded);
          const productPrice = product.isDiscounted ? product.discountedPrice : product.price;
          const initialValue =
            partialRefundList.find(
              refund => refund.productId === product.product,
            )?.count || 0;
          if (maxToRefund <= 0) {
            return (
              <Alert
                data-testid="refund-market-order-table-quantity-to-refund-alert"
                message={t(
                  'AGENT_ACTIONS.MODAL.REFUND.TABLE.ALERT_FULLY_REFUNDED',
                )}
                showIcon
                type="success"
              />
            );
          }

          const count = partialRefundList.find(refund => refund.productId === product.product)?.count;
          const productIsFresh = product.type === PRODUCT_TYPES.WEIGHT;
          const fieldError = (count !== undefined && !productIsFresh) ? !isInteger(count) : false;

          return (
            <Form.Item validateStatus={fieldError ? 'error' : undefined}>
              <InputNumber
                data-testid="refund-market-order-table-quantity-to-refund-input"
                aria-label={`refund-market-order-table-quantity-to-refund-input-${product.product}`}
                min={0}
                max={maxToRefund}
                defaultValue={0}
                value={isWholeRefund ? maxToRefund : initialValue}
                disabled={isFeedbackDetails || isWholeRefund || productPrice === 0}
                onChange={value => onInputChange(value, product)}
              />
            </Form.Item>
          );
        },
      },
      {
        title: t('AGENT_ACTIONS.MODAL.REFUND.TABLE.AMOUNT'),
        key: 'amount',
        dataIndex: 'price',
        width: 136,
        render: (_, product) => {
          const discountedPrice = product.discountedPrice || product.discountedTotalAmount;
          const productPrice = product.isDiscounted ? discountedPrice : product.price;

          const toRefund =
            partialRefundList.find(
              refund => refund.productId === product.product,
            )?.count || 0;
          const amount =
            product.refunded * productPrice + productPrice * toRefund;

          return (
            <div
              className={styles.amount}
              data-testid="refund-market-order-table-amount"
            >
              {`${currencyFormatter(amount.toFixed(2))}`}
            </div>
          );
        },
      },
    ],
    [isWholeRefund, styles.amount, t, onInputChange, partialRefundList, isFeedbackDetails, currencyFormatter],
  );

  const renderFooter = () => (
    <RefundTableFooter
      handleCheckbox={handleCheckbox}
      handleWholeRefundList={handleWholeRefundList}
      isWholeRefund={isWholeRefund}
      setIsWholeRefund={setIsWholeRefund}
      formValues={formValues}
    />
  );

  return (
    <Table
      className={styles.table}
      size="middle"
      columns={columns}
      dataSource={products}
      pagination={false}
      expandable={{ defaultExpandAllRows: true }}
      data-testid="refund-market-order-modal-products-list"
      footer={renderFooter}
    />
  );
};

export default RefundTable;
