import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { MARKET_ORDER_REFUND, MARKET_ORDER_REFUND_TYPE_MAP } from '@app/pages/MarketOrder/OrderDetail/constants';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import GroupReasons from '../components/GroupReasons';
import RefundTable from '../components/RefundTable';
import { MARKET_ORDER_STATUS } from '@shared/shared/constants';

const RefundFlow = ({ formValues, handleFormValue, isFeedbackDetails, orderStatus }) => {
  const { t } = useTranslation('marketOrderPage');
  const dispatch = useDispatch();
  const { refundType } = formValues;

  const handleRefund = (value, { product: productId, count: orderCount }) => {
    const refundCountFiltered = formValues.partialRefundList.filter(refund => refund.productId !== productId);
    let partialRefundList = refundCountFiltered;

    if (value) {
      partialRefundList = [...refundCountFiltered, {
        productId,
        count: value,
        orderCount,
      }];
    }

    handleFormValue('partialRefundList', partialRefundList);
    handleFormValue('products', partialRefundList.map(pr => ({ count: pr.count, product: pr.productId })));
  };

  const handleWholeRefund = productList => {
    handleFormValue('partialRefundList', productList);
    handleFormValue('products', productList.map(product => ({ count: product.count, product: product.productId })));
  };

  const handleRadioChange = refundTypeSelected => {
    if (refundTypeSelected === MARKET_ORDER_REFUND && orderStatus < MARKET_ORDER_STATUS.DELIVERED) {
      dispatch(
        ToastCreators.error({ message: t('AGENT_ACTIONS.MODAL.REFUND.REFUND_ORDER_STATUS_ERROR') }),
      );
      return;
    }
    handleFormValue('refundType', refundTypeSelected);
  };

  return (
    <>
      <GroupReasons
        title={t('AGENT_ACTIONS.MODAL.REFUND.TITLE')}
        isFeedbackDetails={isFeedbackDetails}
        handleRadioChange={handleRadioChange}
        reasons={[
          ...MARKET_ORDER_REFUND_TYPE_MAP,
          {
            id: null,
            key: 'NONE_REFUND',
            en: 'None',
            tr: 'None',
          },
        ]}
        selected={refundType}
      />

      {refundType && (
        <RefundTable
          isFeedbackDetails={isFeedbackDetails}
          formValues={formValues}
          onInputChange={handleRefund}
          handleWholeRefundList={productsList => handleWholeRefund(productsList)}
          handleCheckbox={event => {
            handleFormValue(event.target.name, event.target.checked);
          }}
          setIsWholeRefund={value => {
            handleFormValue('isWholeRefund', value);
          }}
        />
      )}
    </>
  );
};

export default RefundFlow;
