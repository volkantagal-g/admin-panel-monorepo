import { memo, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Divider, Form, Radio, Row, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { find } from 'lodash';

import {
  validationSchema,
  getInitialValues,
  manipulateCancelOptions,
  manipulateValuesAfterSubmit,
} from './formHelper';
import {
  cancelOrderSelector,
  orderCancelOptionsSelector,
  orderDetailSelector,
} from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { validate } from '@shared/yup';
import { getSelectFilterOption, isNullOrEmpty } from '@shared/utils/common';
import { GETIR_DOMAIN_TYPES, MARKET_ORDER_STATUS } from '@shared/shared/constants';
import { Button, Modal, Select, TextArea } from '@shared/components/GUI';
import { useGetUrlQueryParamsMap } from '@shared/hooks';
import { INTEGRATION_CHANNELS, marketOrderActions } from '../../constants';
import { handleSalesforceNotification } from '../../utils';
import { marketOrderPaymentStatuses, paymentMethods } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { currencyFormat } from '@shared/utils/localization';
import { orderCancelSources } from './constants';

const CancelMarketOrderModal = () => {
  const { t } = useTranslation('marketOrderPage');
  const dispatch = useDispatch();
  const cancelOptions = useSelector(orderCancelOptionsSelector.getData);
  const isCancelOptionsPending = useSelector(
    orderCancelOptionsSelector.getIsPending,
  );
  const isCancelPending = useSelector(cancelOrderSelector.getIsPending);
  const isModalVisible = useSelector(
    cancelOrderSelector.isCancelOrderModalVisible,
  );

  const orderDetail = useSelector(orderDetailSelector.getData);
  const { _id: orderId, domainType, status, payment, basket, country } = orderDetail;
  const isoCountryCode = country?.currency?.code?.alpha ?? 'TRY';
  const { format: currencyFormatter } = currencyFormat({
    currency: isoCountryCode,
    maxDecimal: 4,
  });

  const [form] = Form.useForm();

  const queryParamsMap = useGetUrlQueryParamsMap() || {};
  const { reason: reasonId, note, action, channel } = queryParamsMap;

  useEffect(() => {
    if (isModalVisible) {
      dispatch(
        Creators.getOrderCancelOptionsRequest({ id: orderId, domainType }),
      );
    }
  }, [orderId, domainType, isModalVisible, dispatch]);

  const onCancelOrderSuccess = () => {
    handleCloseModal();
    if (channel && channel === INTEGRATION_CHANNELS.salesforce) {
      const paymentStatus =
      marketOrderPaymentStatuses[payment?.status]?.[getLangKey()];
      const paymentMethod = paymentMethods[payment?.method]?.[getLangKey()];
      handleSalesforceNotification({
        message: `Order with id ${orderId} has successfully been cancelled`,
        status: 'success',
        action,
        refundStatus: `${paymentStatus} (${paymentMethod})`,
        refundedAmount: currencyFormatter(basket?.calculation?.totalChargedAmount),
      });
    }
  };

  const isOrderDeliveredOrCancelled = status >= MARKET_ORDER_STATUS.DELIVERED;

  useEffect(() => {
    if (
      action === marketOrderActions.cancel &&
      channel === INTEGRATION_CHANNELS.salesforce &&
      !isOrderDeliveredOrCancelled
    ) {
      dispatch(Creators.toggleCancelOrderModal({ isVisible: true }));
    }
  }, [action, dispatch, channel, isOrderDeliveredOrCancelled]);

  const initialValues = useMemo(
    () => getInitialValues({ cancelReasonId: reasonId, cancelNote: note }),
    [reasonId, note],
  );

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues,
    onSubmit: values => {
      if (
        isNullOrEmpty(values.cancelNote) ||
        isNullOrEmpty(values.cancelReasonId)
      ) {
        return dispatch(
          ToastCreators.error({ message: t('ERRORS.CANCEL_SHOP') }),
        );
      }
      if (isOrderDeliveredOrCancelled) {
        return dispatch(
          ToastCreators.error({ message: t('ERRORS.CANCEL_ERROR_MESSAGE') }),
        );
      }
      const body = manipulateValuesAfterSubmit(values);
      return dispatch(
        Creators.cancelOrderRequest({
          id: orderId,
          ...body,
          onSuccess: onCancelOrderSuccess,
          channel,
          action,
        }),
      );
    },
  });

  const { handleSubmit, values, setFieldValue, errors, isValid } = formik;

  function handleCloseModal() {
    formik.resetForm();
    form.resetFields();
    dispatch(Creators.toggleCancelOrderModal({ isVisible: !isModalVisible }));
  }
  const { cancelReasonId, cancelNote, cancelSource } = values;
  useEffect(() => {
    const resetFields = () => {
      setFieldValue('domainSelectedType', domainType);
    };
    if (cancelReasonId) {
      const selectedOption =
        find(manipulateCancelOptions(cancelOptions), { value: cancelReasonId }) || {};
      setFieldValue('cancelReasonName', selectedOption.label || '');
    }

    return resetFields;
  }, [cancelOptions, cancelReasonId, domainType, setFieldValue]);

  useEffect(() => {
    form.setFieldsValue({ cancelReasonId, cancelNote });
  }, [cancelNote, cancelReasonId, form]);

  const onCancelSourceChange = e => {
    setFieldValue('cancelReasonId', null);
    setFieldValue('cancelSource', e.target.value);
  };

  const onCancelReasonChange = e => {
    setFieldValue('cancelReasonId', e.target.value);
  };

  const convertCancelReason = ({ value, label }) => (
    <Col key={value} span={12}>
      <Radio key={value} value={value}>
        {label}
      </Radio>
    </Col>
  );

  return (
    <Modal
      title={t('ACTION.CANCEL_ORDER')}
      visible={isModalVisible}
      onCancel={handleCloseModal}
      width={600}
      footer={(
        <Space>
          <Button
            size="small"
            data-testid="exit-cancel-order"
            color="secondary"
            key="back"
            onClick={handleCloseModal}
          >
            {t('button:CANCEL')}
          </Button>
          <Button
            key="submit"
            type="primary"
            form="cancel-shop-order-modal"
            htmlType="submit"
            disabled={!isValid || isCancelOptionsPending}
            loading={isCancelPending}
            size="small"
          >
            {t('button:SAVE')}
          </Button>
        </Space>
      )}
    >
      <Form
        form={form}
        id="cancel-shop-order-modal"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Space
          data-testid="cancel-shop-order-modal"
          size={[8, 16]}
          direction="vertical"
          className="w-100"
        >
          {domainType === GETIR_DOMAIN_TYPES.VOYAGER ? (
            <Select
              disabled={isCancelOptionsPending}
              value={cancelReasonId}
              optionsData={manipulateCancelOptions(cancelOptions)}
              dataTestId="cancel-shop-order-modal-select"
              onChange={reason => {
                setFieldValue('cancelReasonId', reason);
              }}
              allowClear
              showSearch
              label={t('MODAL.CANCEL_ORDER.CANCEL_REASON')}
              filterOption={getSelectFilterOption}
              name="cancelReasonId"
              errors={errors}
              hasForm
            />
          ) : (
            <>
              <Form.Item
                name="cancelSource"
                label={t('MODAL.CANCEL_ORDER.CANCEL_SOURCE')}
                rules={[{ required: true, message: t('error:REQUIRED') }]}
                className="mb-2"
              >
                <Radio.Group
                  options={orderCancelSources}
                  onChange={onCancelSourceChange}
                  value={cancelSource}
                />
              </Form.Item>
              {typeof cancelSource === 'number' && (
                <>
                  <Divider className="m-0" />
                  <Form.Item
                    name="cancelReasonId"
                    label={t('MODAL.CANCEL_ORDER.CANCEL_REASON')}
                    rules={[{ required: true, message: t('error:REQUIRED') }]}
                    className="mb-2"
                  >
                    <Radio.Group onChange={onCancelReasonChange} value={cancelReasonId}>
                      <Row>
                        {manipulateCancelOptions(cancelOptions, cancelSource)
                          .map(item => convertCancelReason(item))}
                      </Row>
                    </Radio.Group>
                  </Form.Item>
                  <Divider className="m-0" />
                </>
              )}
            </>
          )}
          {(domainType === GETIR_DOMAIN_TYPES.VOYAGER || typeof cancelSource === 'number') && (
          <TextArea
            disabled={isCancelOptionsPending}
            value={cancelNote}
            data-testid="cancel-shop-order-modal-note-input"
            onChange={event => {
              setFieldValue('cancelNote', event?.target.value);
            }}
            label={t('MODAL.CANCEL_ORDER.NOTE')}
            hasForm
            name="cancelNote"
            errors={errors}
          />
          )}
        </Space>
      </Form>
    </Modal>
  );
};

export default memo(CancelMarketOrderModal);
