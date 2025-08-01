import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Checkbox, Space } from 'antd';

import { orderDetailSelector } from '@app/pages/MarketOrder/OrderDetail/redux/selectors';

import useProducts from '../hooks/useProducts';
import useStyles from './RefundTable.styles';

import CheckboxFee from './CheckboxFee';
import useCurrency from '../hooks/useCurrency';
import FinancialOrderItem from './FinancialOrderItem';

const RefundTableFooter = ({
  handleWholeRefundList,
  handleCheckbox,
  isWholeRefund,
  setIsWholeRefund,
  formValues,
  isFeedbackDetails,
}) => {
  const { t } = useTranslation('marketOrderPage');
  const { products, productsWithRefunds, allProductsRefunded } = useProducts();
  const { format: currencyFormatter } = useCurrency();
  const orderDetail = useSelector(orderDetailSelector.getData) || {};

  const styles = useStyles();

  const {
    partialRefundList,
    bagFee: bagFeeFormValue,
    deliveryFee: deliveryFeeFormValue,
    serviceFee: serviceFeeFormValue,
  } = formValues;

  const bagFee = orderDetail.basket.calculation?.totalBagFee || 0;
  const deliveryFee = orderDetail.basket.calculation?.totalDeliveryFee || 0;
  const serviceFee = orderDetail.basket.serviceFee?.applied || 0;
  const promosApplied = orderDetail.promo?.applied || [];

  const {
    bagFeeRefundStatus,
    deliveryFeeRefundStatus,
    serviceFeeRefundStatus,
  } = orderDetail;

  const bagFeeRefunded = bagFeeRefundStatus?.isRefunded;
  const deliveryFeeRefunded = deliveryFeeRefundStatus?.isRefunded;
  const serviceFeeRefunded = serviceFeeRefundStatus?.isRefunded;

  const onWholeRefund = wholeRefundChecked => {
    if (wholeRefundChecked) {
      handleWholeRefundList(products.filter(product => ((product.count - product.refunded) !== 0)).map(product => ({
        productId: product.product,
        count: product.count - product.refunded,
      })));

      handleCheckbox({ target: { name: 'bagFee', checked: bagFee !== 0 } });
      handleCheckbox({ target: { name: 'deliveryFee', checked: deliveryFee !== 0 } });
      handleCheckbox({ target: { name: 'serviceFee', checked: serviceFee !== 0 } });

      setIsWholeRefund(true);

      return;
    }

    handleWholeRefundList([]);
    handleCheckbox({ target: { name: 'bagFee', checked: false } });
    handleCheckbox({ target: { name: 'deliveryFee', checked: false } });
    handleCheckbox({ target: { name: 'serviceFee', checked: false } });

    setIsWholeRefund(false);
  };

  const productRefunds = useMemo(() => {
    return products?.reduce((total, product) => {
      const discountedPrice = product.discountedPrice || product.discountedTotalAmount;
      const productPrice = product.isDiscounted ? discountedPrice : product.price;
      const toRefund = partialRefundList.find(refund => refund.productId === product.product)?.count || 0;
      const refunded = productsWithRefunds[product.product] || 0;
      const amount = (refunded * productPrice) + (productPrice * toRefund);
      return total + amount;
    }, 0);
  }, [products, partialRefundList, productsWithRefunds]);

  const totalRefundAmount = useMemo(() => {
    const deliveryFeeToRefund = (deliveryFeeFormValue || deliveryFeeRefunded) ? deliveryFee : 0;
    const bagFeeToRefund = (bagFeeFormValue || bagFeeRefunded) ? bagFee : 0;
    const serviceFeeToRefund = (serviceFeeFormValue || serviceFeeRefunded) ? serviceFee : 0;

    return (productRefunds + deliveryFeeToRefund + bagFeeToRefund + serviceFeeToRefund).toFixed(2);
  }, [
    productRefunds,
    deliveryFeeFormValue,
    bagFeeFormValue,
    serviceFeeFormValue,
    deliveryFee,
    bagFee,
    serviceFee,
    bagFeeRefunded,
    deliveryFeeRefunded,
    serviceFeeRefunded,
  ]);

  return (
    <>
      <Space data-testid="refund-market-order-table-footer-footer-fees" className={styles.feeContainer} direction="vertical" size="middle">
        <Checkbox
          key="REFUND_TABLE_FOOTER_ALL_PRODUCTS_REFUNDED_CHECKBOX"
          onChange={evt => onWholeRefund(evt.target.checked)}
          disabled={allProductsRefunded}
          defaultChecked={isWholeRefund}
        >
          <span className={styles.feeLabel}>{t('AGENT_ACTIONS.MODAL.REFUND.TABLE.FULL_REFUND')}</span>
        </Checkbox>

        <CheckboxFee
          key="REFUND_TABLE_FOOTER_BAG_FEE_CHECKBOX"
          name="bagFee"
          refunded={bagFeeRefunded}
          isFullRefund={isWholeRefund}
          feeAmount={bagFee}
          feeAmountFromInput={bagFeeFormValue}
          fromFeedbackDetail={isFeedbackDetails}
          feeLabel={t('AGENT_ACTIONS.MODAL.REFUND.TABLE.REFUND_BAG_FEE')}
          alertLabel={t('AGENT_ACTIONS.MODAL.REFUND.TABLE.ALERT_BAG_FEE_REFUNDED')}
          handleCheckbox={handleCheckbox}
        />

        <CheckboxFee
          key="REFUND_TABLE_FOOTER_DELIVERY_FEE_CHECKBOX"
          name="deliveryFee"
          refunded={deliveryFeeRefunded}
          isFullRefund={isWholeRefund}
          feeAmount={deliveryFee}
          feeAmountFromInput={deliveryFeeFormValue}
          fromFeedbackDetail={isFeedbackDetails}
          feeLabel={t('AGENT_ACTIONS.MODAL.REFUND.TABLE.REFUND_DELIVERY_FEE')}
          alertLabel={t('AGENT_ACTIONS.MODAL.REFUND.TABLE.ALERT_DELIVERY_FEE_REFUNDED')}
          handleCheckbox={handleCheckbox}
        />

        <CheckboxFee
          key="REFUND_TABLE_FOOTER_SERVICE_FEE_CHECKBOX"
          name="serviceFee"
          refunded={serviceFeeRefunded}
          isFullRefund={isWholeRefund}
          feeAmount={serviceFee}
          feeAmountFromInput={serviceFeeFormValue}
          fromFeedbackDetail={isFeedbackDetails}
          feeLabel={t('AGENT_ACTIONS.MODAL.REFUND.TABLE.REFUND_SERVICE_FEE')}
          alertLabel={t('AGENT_ACTIONS.MODAL.REFUND.TABLE.ALERT_SERVICE_FEE_REFUNDED')}
          handleCheckbox={handleCheckbox}
        />

      </Space>
      <div className={styles.financialDetails}>
        {
          (isWholeRefund || productRefunds > 0) && (
            <FinancialOrderItem
              key="REFUND_TABLE_FOOTER_FINANCIAL_ORDER_ITEM_BASKET_AMOUNT"
              label={t('BASKET_AMOUNT')}
              amount={currencyFormatter(productRefunds)}
            />
          )
        }
        {
          (isWholeRefund || bagFeeFormValue || bagFeeRefunded) && (
            <FinancialOrderItem
              key="REFUND_TABLE_FOOTER_FINANCIAL_ORDER_ITEM_BAG_PRICE"
              label={t('BAG_PRICE')}
              amount={currencyFormatter(bagFee)}
            />
          )
        }
        {
          (isWholeRefund || deliveryFeeFormValue || deliveryFeeRefunded) && (
            <FinancialOrderItem
              key="REFUND_TABLE_FOOTER_FINANCIAL_ORDER_ITEM_DELIVERY_FEE"
              label={t('DELIVERY_FEE')}
              amount={currencyFormatter(deliveryFee)}
            />
          )
        }
        {
          (isWholeRefund || serviceFeeFormValue || serviceFeeRefunded) && (
            <FinancialOrderItem
              key="REFUND_TABLE_FOOTER_FINANCIAL_ORDER_ITEM_SERVICE_FEE"
              label={t('SERVICE_FEE')}
              amount={currencyFormatter(serviceFee)}
            />
          )
        }

        {
          promosApplied.length > 0 && (
            <>
              {
                promosApplied.map(applied => (
                  <FinancialOrderItem
                    key={`REFUND_TABLE_FOOTER_PROMOS_APPLIED_FINANCIAL_ORDER_ITEM_FOR_PROMO_${applied.promo.promoCode}`}
                    label={t('PROMO')}
                    promoCode={applied.promo.promoCode}
                    promoId={applied.promo._id}
                  />
                ))
              }
            </>
          )
        }

        <FinancialOrderItem
          key="REFUND_TABLE_FOOTER_FINANCIAL_ORDER_ITEM_TOTAL_PRODUCT_REFUND_AMOUNT"
          label={t('AGENT_ACTIONS.MODAL.REFUND.TABLE.TOTAL_PRODUCT_REFUND_AMOUNT')}
          amount={currencyFormatter(totalRefundAmount)}
        />
      </div>
    </>
  );
};

export default RefundTableFooter;
