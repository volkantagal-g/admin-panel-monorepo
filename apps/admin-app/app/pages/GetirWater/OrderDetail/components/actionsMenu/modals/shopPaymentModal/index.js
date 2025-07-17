import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col, Modal, Button, Divider, Form, Input } from 'antd';
import _ from 'lodash';
import { useFormik } from 'formik';
import { useParams } from 'react-router';

import { validationSchema, getInitialValues } from './formHelper';
import AntTextArea from '@shared/components/UI/AntTextArea';
import { orderDetailSelector } from '@app/pages/GetirWater/OrderDetail/redux/selectors';
import { validate } from '@shared/yup';
import { Creators } from '@app/pages/GetirWater/OrderDetail/redux/actions';

import useStyles from './styles';

const ShopPaymentModal = () => {
  const classes = useStyles();
  const { t } = useTranslation('waterOrderDetailModal');
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const _supplierNetRevenueCalculation = _.get(orderDetail, 'financial.supplierNetRevenue', 0);
  const { waterOrderId } = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(),
    onSubmit: values => {
      dispatch(
        Creators.payAmountRequest({
          note: values.paymentNote,
          amount: values.paymentRevenue,
          orderId: waterOrderId,
        }),
      );
      return handleCancel();
    },
  });

  const { handleSubmit, values, setFieldValue, errors, handleChange } = formik;

  const handleCancel = () => {
    formik.resetForm();
    form.resetFields();
    handleOk();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    closeModal();
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values]);

  return (
    <>
      <Modal
        title={t('ACTION.PAYMENT_ENTRY')}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={closeModal}
        width={600}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t('button:CANCEL')}
          </Button>,
          <Button key="submit" type="primary" form="shop-payment-modal" htmlType="submit" loading={isPending}>
            {t('button:SAVE')}
          </Button>,
        ]}
      >
        <Form form={form} id="shop-payment-modal" onFinish={handleSubmit} layout="vertical">
          <Col span={24}>
            <Row>
              <Col className={classes.space} span={24}>
                <b className={classes.amount}>
                  {t('CANCEL_ORDER.AMOUNT')}({t('ACTION.SUPPLIER_NET_REVENUE')}
                  {_supplierNetRevenueCalculation.toFixed(2)})
                </b>
                <Button onClick={() => setFieldValue('paymentRevenue', _supplierNetRevenueCalculation.toString())}>
                  {t('CANCEL_ORDER.COPY')}
                </Button>
              </Col>
              <Col span={24}>
                <Form.Item
                  help={_.get(errors, 'paymentRevenue')}
                  validateStatus={_.get(errors, 'paymentRevenue') ? 'error' : 'success'}
                  name="paymentRevenue"
                >
                  <Input type="number" value={values.paymentRevenue} onChange={handleChange} />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={24}>
                <b className={classes.title}>{t('CANCEL_ORDER.NOTE')}</b>
              </Col>
              <Col span={24}>
                <Form.Item
                  help={_.get(errors, 'paymentNote')}
                  validateStatus={_.get(errors, 'paymentNote') ? 'error' : 'success'}
                  name={['paymentNote']}
                >
                  <AntTextArea
                    value={values.paymentNote}
                    onChange={event => {
                      const value = _.get(event, 'target.value', '');
                      setFieldValue('paymentNote', value);
                    }}
                    disabled={false}
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Form>
      </Modal>
      <Button className={classes.buttonStyle} key="5" onClick={showModal}>
        {t('ACTION.PAYMENT_ENTRY')}
      </Button>
    </>
  );
};

export default ShopPaymentModal;
