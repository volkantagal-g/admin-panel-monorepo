import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Modal, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useLocation, useParams } from 'react-router';

import AntSelect from '@shared/components/UI/AntSelect';
import { validate } from '@shared/yup';
import { getUser } from '@shared/redux/selectors/auth';
import { Creators } from '@app/pages/GetirWater/OrderDetail/redux/actions';

import { isOrderRefundModalVisibleSelector, orderDetailSelector } from '@app/pages/GetirWater/OrderDetail/redux/selectors';

import { validationSchema, getInitialValues, getRefundOptions } from './formHelper';
import useStyles from './styles';

const ShopRefundModal = () => {
  const classes = useStyles();
  const { t } = useTranslation('waterOrderDetailModal');
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const user = getUser();
  const isOrderDetailPending = useSelector(orderDetailSelector.getIsPending);
  const orderDetail = useSelector(orderDetailSelector.getData);
  const isModalVisible = useSelector(isOrderRefundModalVisibleSelector);
  const location = useLocation();
  const { waterOrderId } = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(),
    onSubmit: values => {
      dispatch(
        Creators.returnOrderRequest({
          ...values,
          returnedBy: user._id,
          orderId: waterOrderId,
          totalRefundAmount: orderDetail.totalChargedAmount,
        }),
      );

      handleOk();
    },
  });

  const { handleSubmit, values, setFieldValue, errors } = formik;
  const closeModal = () => {
    dispatch(Creators.setIsOrderRefundModalVisible({ isOrderRefundModalVisible: false }));
  };

  const handleCancel = () => {
    formik.resetForm();
    form.resetFields();
    closeModal();
  };

  function handleOk() {
    closeModal();
  }

  const showModal = () => {
    dispatch(Creators.setIsOrderRefundModalVisible({ isOrderRefundModalVisible: true }));
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  useEffect(() => {
    const searchQuerys = location.search
      ? new URLSearchParams(location.search)
      : null;
    if (!searchQuerys) {
      return;
    }

    const queryReason = searchQuerys.get('reason') ?? undefined;
    const value = Number(queryReason);

    if (!Number.isNaN(value) && getRefundOptions().find(option => option.value === value)) {
      setFieldValue('returnReason', value);
    }
  }, [location, setFieldValue]);

  return (
    <>
      <Modal
        title={t('ACTION.REFUND_ORDER')}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t('button:CANCEL')}
          </Button>,
          <Button key="submit" type="primary" form="shop-refund-modal" htmlType="submit" loading={isOrderDetailPending}>
            {t('ACTION.REFUND')}
          </Button>,
        ]}
      >
        <Form form={form} id="shop-refund-modal" onFinish={handleSubmit} layout="vertical">
          <Row>
            <Col span={8}>
              <b>{t('CANCEL_ORDER.REFUND_REASON')}</b>
            </Col>
            <Col span={16}>
              <Form.Item
                help={_.get(errors, 'refundReasonId')}
                validateStatus={_.get(errors, 'refundReasonId') ? 'error' : 'success'}
                name="returnReason"
              >
                <AntSelect
                  value={values.refundReasonId}
                  options={getRefundOptions()}
                  onChange={refundReasonId => {
                    setFieldValue('returnReason', refundReasonId);
                  }}
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Button className={classes.buttonStyle} key="2" onClick={showModal}>
        {t('ACTION.REFUND_ORDER')}
      </Button>
    </>
  );
};

export default ShopRefundModal;
