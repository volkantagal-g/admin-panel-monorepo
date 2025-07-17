import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Modal, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';
import moment from 'moment-timezone';

import {
  validationSchema,
  getInitialValues,
  manipulateRefundOptions,
} from './formHelper';
import { orderDetailSelector, orderShopRefundOptionSelector } from '../../../../redux/selectors';
import { Creators } from '../../../../redux/actions';
import {
  ARTISAN_ORDER_REFUND_TIMEOUT_LIMIT_AS_SECONDS,
  ARTISAN_ORDER_STATUS,
  FOOD_ORDER_PAYMENT_STATUS,
} from '@shared/shared/constants';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import AntSelect from '@shared/components/UI/AntSelect';
import { validate } from '@shared/yup';
import { getUser } from '@shared/redux/selectors/auth';
import useStyles from '@app/pages/ArtisanOrder/Detail/components/actionsMenu/modals/shopRefundModal/styles';
import { ALLOWED_REFUND_REASONS } from '../partialRefundModal/constants';

const ShopRefundModal = () => {
  const classes = useStyles();
  const { t } = useTranslation('artisanOrderPage');
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const user = getUser();
  const refundOption = useSelector(orderShopRefundOptionSelector.getData);
  const refundReasons = refundOption?.filter(option => ALLOWED_REFUND_REASONS.includes(option?._id));
  const isOrderDetailPending = useSelector(orderDetailSelector.getIsPending);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const elapsedTimeAfterDelivery = moment().diff(moment(orderDetail.deliverDate), 'seconds');
  const refundTimeoutLimit = ARTISAN_ORDER_REFUND_TIMEOUT_LIMIT_AS_SECONDS;
  const refundButtonDisabled = elapsedTimeAfterDelivery > refundTimeoutLimit || orderDetail.status < ARTISAN_ORDER_STATUS.DELIVERED;
  const refundButtonActive = elapsedTimeAfterDelivery <= refundTimeoutLimit && orderDetail.status >= ARTISAN_ORDER_STATUS.DELIVERED;

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(),
    onSubmit: values => {
      if (
        (elapsedTimeAfterDelivery <= refundTimeoutLimit && orderDetail.status >=
          ARTISAN_ORDER_STATUS.DELIVERED) ||
        orderDetail.paymentStatus === FOOD_ORDER_PAYMENT_STATUS.PENDING_REFUND
      ) {
        if (!values.refundReasonId) {
          return dispatch(ToastCreators.error({
            message:
              t('MODAL.CANCEL_LOCALS_ORDER.REFUND_REASON'),
          }));
        }
        const body = {
          refundReasonId: values.refundReasonId,
          userId: user._id.trim(),
        };
        dispatch(Creators.getOrderRefundRequest({ orderDetailId: orderDetail._id, body }));
        // eslint-disable-next-line no-use-before-define
        return handleCancel();
      }

      return dispatch(ToastCreators.error({
        message:
          t('MODAL.CANCEL_LOCALS_ORDER.REFUND_REASON'),
      }));
    },
  });

  const { handleSubmit, values, setFieldValue, errors } = formik;

  const handleCancel = () => {
    formik.resetForm();
    form.resetFields();
    // eslint-disable-next-line no-use-before-define
    handleOk();
  };

  const handleOk = () => {
    // eslint-disable-next-line no-use-before-define
    closeModal();
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    form.setFieldsValue(values);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <>
      <Modal
        title={t('ACTION.REFUND_FOOD_ORDER')}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t('button:CANCEL')}
          </Button>,
          <Button
            key="submit"
            type="primary"
            form="shop-refund-modal"
            htmlType="submit"
            loading={isOrderDetailPending}
          >
            {t('ACTION.REFUND')}
          </Button>,
        ]}
      >
        <Form
          form={form}
          id="shop-refund-modal"
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Row>
            <Col span={8}>
              <b>{t('MODAL.CANCEL_LOCALS_ORDER.REFUND_REASON')}</b>
            </Col>
            <Col span={16}>
              <Form.Item
                help={_.get(errors, 'refundReasonId')}
                validateStatus={_.get(errors, 'refundReasonId') ? 'error' : 'success'}
                name="refundReasonId"
              >
                <AntSelect
                  value={values.refundReasonId}
                  options={manipulateRefundOptions(refundReasons)}
                  onChange={refundReasonId => {
                    setFieldValue('refundReasonId', refundReasonId);
                  }}
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      {refundButtonDisabled &&
        <Button key="1" className={classes.disabledButton} disabled>{t('ACTION.REFUND_FOOD_ORDER')}</Button>}
      {refundButtonActive && (
        <Button
          className={classes.buttonStyle}
          key="2"
          onClick={showModal}
        >
          {t('ACTION.REFUND_FOOD_ORDER')}
        </Button>
      )}
    </>
  );
};

export default ShopRefundModal;
