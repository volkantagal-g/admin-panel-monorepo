import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { values as objToArr, has, get } from 'lodash';

import { useSearchParams } from 'react-router-dom';

import { setInquirySelector, orderDetailSelector, productsSelector } from '@app/pages/GetirFood/OrderDetail/redux/selectors';
import { Creators } from '@app/pages/GetirFood/OrderDetail/redux/actions';
import RefundSection from './components/RefundSection';
import ReasonSection from './components/ReasonSection';
import ConfirmPhase from './components/ConfirmPhase';

import {
  IN_PRODUCT_REFUND,
  FULL_REFUND,
  REFUND_TYPE_VALUES,
  PARTIAL_REFUND,
  getValidUntilDates,
} from './formHelper';
import useStyles from './styles';
import PromoSection from './components/PromoSection';
import { COUNTRY_CODES, FOOD_PROMO_STATUS, GETIR_FOOD_DOMAIN_TYPE } from '@shared/shared/constants';
import { multiLangTitles, pushNotificationData } from './components/PromoSection/utils';
import { currency } from '@shared/utils/common';
import { handleSalesforceNotification } from '@app/pages/MarketOrder/OrderDetail/utils';
import { PROMO_TARGET, PromoUsageType } from '@app/pages/Promo/constantValues';

const ComplaintRefundModal = () => {
  const { t } = useTranslation('foodOrderPage');
  const dispatch = useDispatch();
  const isSetInquiryPending = useSelector(setInquirySelector.getIsPending);
  const [form] = Form.useForm();
  const classes = useStyles();
  const [params] = useSearchParams();

  const orderDetail = useSelector(orderDetailSelector.getData);
  const products = useSelector(productsSelector.getData);

  const [submittedValues, setSubmittedValues] = useState();
  const [isConfirmPhase, setIsConfirmPhase] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refundType, setRefundType] = useState();
  const [hasComplaint, setHasComplaint] = useState(false);
  const [hasPromo, setHasPromo] = useState(false);

  const foodOrderId = get(orderDetail, '_id', null);
  const clientId = get(orderDetail, ['client', '_id']);
  const hasPersonalPromoInOrder = get(orderDetail, ['personalPromoId'], false);
  const isIframe = params.get('action') === 'refund';

  const showModal = () => {
    dispatch(Creators.getMainReasonsRequest());
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (foodOrderId && isIframe && !isModalVisible) {
      showModal();
      const id = params.get('subReason');
      if (id) {
        dispatch(Creators.getSubReasonRequest({ id }));
      }
    }
    if (foodOrderId && isModalVisible) {
      dispatch(Creators.getRefundSourcesRequest({ foodOrderId }));
      if (clientId) {
        const body = {
          clientId,
          country: COUNTRY_CODES[get(orderDetail, 'country')],
          domain: GETIR_FOOD_DOMAIN_TYPE,
        };

        dispatch(Creators.getClientTrustScoreRequest({ body }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, foodOrderId, isModalVisible]);

  const closeModal = () => {
    if (isIframe) {
      handleSalesforceNotification({ action: 'refund', message: 'Close Refund Modal', status: 'cancel' });
      return;
    }
    form.resetFields();
    setIsModalVisible(false);
    setIsConfirmPhase(false);
    setRefundType(null);
    setHasComplaint(false);
    setSubmittedValues(null);
  };

  const handleCancel = () => {
    if (isConfirmPhase) {
      setIsConfirmPhase(false);
      return;
    }
    closeModal();
  };

  const handleOk = () => {
    form.submit();
  };
  const formatValues = values => {
    const result = {
      channel: values.channel,
      mainReason: values.mainReason,
      subReason: values.subReason,
      client: orderDetail?.client?._id,
      order: orderDetail?._id,
      restaurant: orderDetail?.restaurant?.id,
      channelOptionText: values.channelOptionText,
      subReasonText: values.subReasonText,
      isRestaurantReached: values.isRestaurantReached,
      isRefundApprovedByRestaurant: values.isRefundApprovedByRestaurant,
      changedSuggestedRefundSource: values.changedSuggestedRefundSource,
    };
    if (hasComplaint) {
      result.complaint = { description: values.complaintDescription };
    }
    if (refundType) {
      result.refund = {
        description: values.refundDescription,
        source: values.refundSource,
        products: [],
      };
      if (refundType === FULL_REFUND) {
        result.refund.products = undefined;
        result.refund.refundType = REFUND_TYPE_VALUES[FULL_REFUND];
      }
      else if (refundType === PARTIAL_REFUND) {
        let isFakePartial = true;

        objToArr(values.refundedProducts).forEach((p, idx) => {
          if (!p.checked) {
            isFakePartial = false;
            return;
          }

          const id = products?.[idx]?._id;
          const product = { id };
          if (p.refundType === IN_PRODUCT_REFUND) {
            product.amount = p.amount;
            isFakePartial = false;
          }
          else if (p.refundType === FULL_REFUND) {
            product.count = 1;
          }
          result.refund.products.push(product);
        });

        result.refund.refundType = isFakePartial ? REFUND_TYPE_VALUES[FULL_REFUND] : REFUND_TYPE_VALUES[PARTIAL_REFUND];
      }
    }
    if ((result?.refund?.refundType === REFUND_TYPE_VALUES[FULL_REFUND]) && has(result, 'refund.products')) {
      delete result.refund.products;
    }
    if (hasPromo) {
      const { promo } = values;
      const { startTime, endTime } = getValidUntilDates(promo.validDayAmount);
      result.promo = promo;
      const { promo: body } = result;
      body.domainTypes = [GETIR_FOOD_DOMAIN_TYPE];
      body.title = multiLangTitles(currency(), promo.discountAmount);
      body.description = multiLangTitles(currency(), promo.discountAmount);
      body.client = result.client;
      body.isBalanceEnabled = false;
      body.promoUsageType = PromoUsageType.PERSONAL;
      body.status = FOOD_PROMO_STATUS.ACTIVE;
      body.promoTarget = PROMO_TARGET.GETIR_FOOD;
      body.validFrom = startTime;
      body.validUntil = endTime;
      body.validRanges = [{ start: startTime, end: endTime }];
      body.pushData = {
        clientId: result.client,
        notificationType: 'TXN',
        notificationData: pushNotificationData(currency(), promo.discountAmount),
        notificationInterruptionLevel: 'ACTIVE',
      };
      delete body.validDayAmount;
      delete body.countryCode;
    }
    result.hasRefundOrCompliant = hasComplaint || refundType;
    result.orderId = orderDetail._id;

    return result;
  };

  const handleFinish = () => {
    if (isConfirmPhase) {
      dispatch(Creators.setInquiryRequest({ body: formatValues(submittedValues) }));
      closeModal();
      return;
    }
    setSubmittedValues(form.getFieldsValue(true));
    setIsConfirmPhase(true);
  };

  return (
    <>
      <Modal
        title={t('COMPLAINT_REFUND_MODAL.TITLE')}
        visible={isModalVisible}
        onCancel={closeModal}
        data-testid="food-order-detail-complaint-refund-modal"
        zIndex={9999}
        width={600}
        centered
        footer={[
          <Button
            type="primary"
            onClick={handleOk}
            loading={isSetInquiryPending}
            disabled={!(form.getFieldValue('subReason') && ((hasPromo && !hasPersonalPromoInOrder) || refundType))}
          >
            {isConfirmPhase ? t('button:CONFIRM') : t('button:SAVE')}
          </Button>,
          <Button onClick={handleCancel}>
            {isConfirmPhase ? t('COMPLAINT_REFUND_MODAL.BACK') : t('button:CANCEL')}
          </Button>,
        ]}
      >
        <Form
          onFinish={handleFinish}
          requiredMark={false}
          className={classes.form}
          form={form}
          colon={false}
          layout="horizontal"
          labelCol={{ span: 6 }}
          labelAlign="left"
          labelWrap={false}
        >
          {isConfirmPhase ? (
            <ConfirmPhase
              values={submittedValues}
              hasComplaint={hasComplaint}
              refundType={refundType}
              hasPromo={hasPromo}
            />
          ) : (
            <>
              <ReasonSection form={form} />
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.subReason !== currentValues.subReason}
              >
                {({ getFieldValue }) => getFieldValue('subReason') && (
                  <>
                    <RefundSection
                      form={form}
                      refundType={refundType}
                      setRefundType={setRefundType}
                    />
                    <PromoSection
                      form={form}
                      hasPromo={hasPromo}
                      setHasPromo={setHasPromo}
                      orderDetail={orderDetail}
                    />
                  </>
                )}
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
      <Button
        key="1"
        className={classes.buttonStyle}
        onClick={showModal}
      >
        {t('ACTION.COMPLAINT_REFUND')}
      </Button>
    </>
  );
};

export default ComplaintRefundModal;
