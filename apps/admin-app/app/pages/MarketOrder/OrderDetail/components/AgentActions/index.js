import { Button, Form, Modal } from 'antd';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import { validate } from '@shared/yup';
import { useGetUrlQueryParamsMap, usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { Creators } from '@app/pages/MarketOrder/OrderDetail/redux/actions';
import { FEEDBACK_STATUSES } from '@shared/shared/constants';

import {
  orderDetailSelector,
  orderRefundReasonsSelector,
} from '../../redux/selectors';
import {
  INTEGRATION_CHANNELS,
  MARKET_ORDER_REFUND,
  marketOrderActions,
} from '../../constants';
import {
  validationSchema,
  getInitialValues,
  manipulateValuesAfterSubmit,
} from './formHelper';
import { FeedbackFlowForm } from './flows';
import ModalTitle from './components/ModalTitle';
import useStyles from './styles';
import useProducts from './hooks/useProducts';
import { getObjectMapFromArr, handleSalesforceNotification } from '../../utils';
import { calculateTotalRefundedAmount } from '../utils';
import { currencyFormat } from '@shared/utils/localization';

const AgentActions = ({ isFeedbackDetails, feedback }) => {
  const { Can } = usePermission();
  const { t } = useTranslation('marketOrderPage');
  const dispatch = useDispatch();
  const { products } = useProducts();
  const styles = useStyles();

  const orderDetail = useSelector(orderDetailSelector.getData);
  const { domainType, _id: orderId, basket, country } = orderDetail;
  const hasFetchedRefundReasons = useSelector(
    orderRefundReasonsSelector.hasFetchedRefundReasons,
  );
  const { mainReasons, subReasons } = useSelector(
    orderRefundReasonsSelector.getData,
  );
  const subReasonsMap = getObjectMapFromArr(subReasons);
  const mainReasonsMap = getObjectMapFromArr(mainReasons);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const queryParamsMap = useGetUrlQueryParamsMap() || {};
  const isoCountryCode = country?.currency?.code?.alpha ?? 'TRY';
  const { format: currencyFormatter } = currencyFormat({
    currency: isoCountryCode,
    maxDecimal: 4,
  });
  const {
    action,
    products: queryProducts,
    source,
    reason,
    note,
    channel,
    refundAmount: refundAmountList,
    discountAmount: discountAmountQuery,
    discountHasDeliveryFee,
    discountHasMinBasketSize,
    discountDeliveryFeeAmount,
    discountExpiry,
  } = queryParamsMap;

  const discountFields = {
    amount: discountAmountQuery,
    hasDeliveryFee: discountHasDeliveryFee,
    hasMinBasketSize: discountHasMinBasketSize,
    deliveryFeeAmount: discountDeliveryFeeAmount,
    expiry: discountExpiry,
  };

  const dispatchFeedbackOrCreateDiscount = ({
    discountPayload,
    feedbackPayload,
  }) => {
    if (!feedbackPayload.hasDiscount) {
      return dispatch(
        Creators.createMarketOrderFeedbackRequest({ data: { ...feedbackPayload } }),
      );
    }
    return dispatch(
      Creators.createPromoRequest({
        data: {
          ...discountPayload,
          channel,
          action,
          onSuccess: discountResponse => {
            if (channel && channel === INTEGRATION_CHANNELS.salesforce) {
              const { validDayAmount, discountAmount = 0, deliveryFee, doNotApplyMinimumBasketSize } = discountPayload ?? {};

              handleSalesforceNotification({
                message: `A discount of ${
                  discountAmount
                } for OrderId: ${orderId} has been given`,
                status: 'success',
                action,
                discountAmount: currencyFormatter(discountAmount),
                expiry: validDayAmount,
                doNotApplyMinimumBasketSize: !!doNotApplyMinimumBasketSize,
                doNotChargeDeliveryFee: !!deliveryFee?.doNotCharge,
                newPromoId: discountResponse._id,
                DoNotChargeOnFranchise: !feedbackPayload?.isFranchiseFault,
                isProductsExchanged: feedbackPayload?.isProductsExchanged,
              });
            }
            dispatch(
              Creators.createMarketOrderFeedbackRequest({
                data: {
                  ...feedbackPayload,
                  discountCode: discountResponse._id,
                },
              }),
            );
          },
        },
      }),
    );
  };

  const productsMap = products?.reduce(
    (productMap, product) => ({
      ...productMap,
      [product?.product]: product,
    }),
    {},
  );

  const [form] = Form.useForm();
  const {
    handleSubmit,
    setFieldValue,
    validateForm,
    resetForm,
    isValid: isFormValid,
    values: formValues,
    errors: formErrors,
  } = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues({
      orderDetail,
      isFeedbackDetails,
      feedback,
      productsMap,
      queryProducts,
      refundAmountList,
      note,
      source,
      action,
      reason,
      subReasonsMap,
      mainReasonsMap,
      discountFields,
    }),
    onSubmit: submittedFormValues => {
      if (isFeedbackDetails) return false;
      const isPartialRefund =
        submittedFormValues.refundType === MARKET_ORDER_REFUND;

      const {
        feedbackPayload,
        partialRefundPayload,
        discountPayload,
        stockPayload,
      } = manipulateValuesAfterSubmit(submittedFormValues, orderDetail);

      if (!isPartialRefund) {
        dispatchFeedbackOrCreateDiscount({ feedbackPayload, discountPayload });
      }

      dispatchCreateRefund({
        isPartialRefund,
        feedbackPayload,
        partialRefundPayload,
        discountPayload,
        stockPayload,
      });

      return handleCancel();
    },
    onReset: async (values, actions) => {
      await actions.validateForm(values);
    },
  });

  function dispatchCreateRefund({
    isPartialRefund,
    discountPayload,
    partialRefundPayload,
    feedbackPayload,
    stockPayload,
  }) {
    if (!isPartialRefund) return;
    dispatch(
      Creators.partialRefundOrderCustomerRequest({
        ...partialRefundPayload,
        onSuccess: () => {
          const totalRefundedAmount = calculateTotalRefundedAmount({
            ...formValues,
            basket,
            productsMap,
          });
          if (channel && channel === INTEGRATION_CHANNELS.salesforce) {
            const { refundServiceFee, refundBagFee, refundDeliveryFee } = partialRefundPayload;
            handleSalesforceNotification({
              message: `Partial Refund of ${totalRefundedAmount} for OrderId: ${orderId} is successful`,
              status: 'success',
              action,
              refundAmount: currencyFormatter(totalRefundedAmount),
              refundType: 'Partial',
              fullRefund: false,
              refundBagFee,
              refundDeliveryFee,
              refundServiceFee,
            });
          }
          dispatchFeedbackOrCreateDiscount({
            feedbackPayload,
            discountPayload,
          });

          if (stockPayload?.refundProducts?.length > 0) {
            dispatch(
              Creators.createStockRefundOrderRequest({
                ...stockPayload,
                orderId,
              }),
            );
          }
        },
        channel,
        action,
      }),
    );
  }

  useEffect(() => {
    if ((action === marketOrderActions.refund || action === marketOrderActions.discount) && !isFeedbackDetails) {
      setIsModalVisible(true);
      setFieldValue('refundType', 'refund');
    }

    return () => setIsModalVisible(false);
  }, [action, isFeedbackDetails, setFieldValue]);

  useEffect(() => {
    if (!hasFetchedRefundReasons && isModalVisible) {
      dispatch(Creators.getOrderPartialRefundReasonsRequest({ domainType }));
    }
  }, [dispatch, hasFetchedRefundReasons, isModalVisible, domainType]);

  const onToggleRefundModal = () => {
    setIsModalVisible(prevState => !prevState);
  };

  const handleOk = () => {
    onToggleRefundModal();
  };

  function handleCancel() {
    form.resetFields();
    resetForm();
    handleOk();
  }

  const openModal = () => {
    onToggleRefundModal();
    validateForm();
  };

  const formatCreatedAt = createdAt => {
    return new Date(createdAt).toDateString();
  };

  return (
    <Can permKey={permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_CS_ACTIONS}>
      {isFeedbackDetails ? (
        <Button
          size="small"
          onClick={openModal}
          data-testid="market-order-feedback-detail"
        >
          {feedback?.status === FEEDBACK_STATUSES.RESOLVED
            ? t('global:DETAIL')
            : t('global:RESOLVE')}
        </Button>
      ) : (
        <Button
          danger
          aria-label="market-order-detail-agent-actions-button"
          type="primary"
          className={styles.feedbackTitle}
          onClick={openModal}
        >
          {t('AGENT_ACTIONS.ADD_ORDER_FEEDBACK')}
        </Button>
      )}
      <Modal
        destroyOnClose
        data-testid="market-order-detail-agent-actions-modal"
        title={(
          <ModalTitle
            title={t('AGENT_ACTIONS.MODAL.TITLE')}
            status={feedback?.status}
            isFeedbackDetails={isFeedbackDetails}
            className={styles.modalTitleResolveText}
          />
        )}
        visible={isModalVisible}
        onCancel={handleCancel}
        width={900}
        footer={[
          <Button
            key="cancel-modal"
            aria-label="market-order-detail-agent-actions-modal-cancel"
            danger
            onClick={handleCancel}
          >
            {t('button:CANCEL')}
          </Button>,
          !isFeedbackDetails ? (
            <Button
              key="submit-modal"
              form="market-order-feedback-refund-discount-form"
              htmlType="submit"
              disabled={!isFormValid}
              aria-label="market-order-detail-agent-actions-modal-submit"
              type="primary"
            >
              {t('button:SAVE')}
            </Button>
          ) : null,
        ]}
      >
        {isFeedbackDetails && (
          <h5
            className={styles.createdDetailsText}
            data-testid="market-order-detail-agent-actions-modal-feedback-createdBy"
          >
            {t('AGENT_ACTIONS.MODAL.FEEDBACK.CREATED_DETAILS', {
              createdBy: feedback?.interestedUser?.name,
              createdAt: formatCreatedAt(feedback?.createdAt),
            })}
          </h5>
        )}
        <FeedbackFlowForm
          isFeedbackDetails={isFeedbackDetails}
          form={form}
          formValues={formValues}
          handleSubmit={handleSubmit}
          orderDetail={orderDetail}
          setFieldValue={setFieldValue}
          formErrors={formErrors}
          queryProducts={queryProducts}
          action={action}
        />
      </Modal>
    </Can>
  );
};

export default memo(AgentActions);
