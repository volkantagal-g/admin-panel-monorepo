import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col, Modal, Button, Divider, Form, Input } from 'antd';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useParams } from 'react-router';

import { validationSchema, getInitialValues } from './formHelper';
import AntTextArea from '@shared/components/UI/AntTextArea';
import { orderDetailSelector } from '@app/pages/GetirWater/OrderDetail/redux/selectors';
import { validate } from '@shared/yup';
import { Creators } from '@app/pages/GetirWater/OrderDetail/redux/actions';

import useStyles from './styles';
// import { getUser } from '@shared/redux/selectors/auth';

const ShopPaybackModal = () => {
  const classes = useStyles();
  const { t } = useTranslation('waterOrderDetailModal');
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  // const user = getUser();
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const _supplierNetRevenueCalculation = _.get(orderDetail, 'financial.supplierNetRevenue', 0);
  const { waterOrderId } = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(),
    onSubmit: values => {
      dispatch(
        Creators.takeAmountRequest({
          ...values,
          orderId: waterOrderId,
        }),
      );
      handleOk();
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
        title={t('ACTION.PAYBACK_ENTRY')}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={closeModal}
        width={600}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t('button:CANCEL')}
          </Button>,
          <Button key="submit" type="primary" form="shop-payback-modal" htmlType="submit" loading={isPending}>
            {t('button:SAVE')}
          </Button>,
        ]}
      >
        <Form form={form} id="shop-payback-modal" onFinish={handleSubmit} layout="vertical">
          <Col span={24}>
            <Row>
              <Col className={classes.space} span={24}>
                <b className={classes.amount}>
                  {t('CANCEL_ORDER.AMOUNT')} ({t('CANCEL_ORDER.TOTAL_AMOUNT')} {orderDetail.totalPrice.toFixed(2)})
                </b>
                <Button onClick={() => setFieldValue('amount', orderDetail.totalPrice.toString())}>{t('CANCEL_ORDER.COPY')}</Button>
              </Col>
              <Col span={24}>
                <Form.Item help={_.get(errors, 'amount')} validateStatus={_.get(errors, 'amount') ? 'error' : 'success'} name="amount">
                  <Input type="number" value={values.amount} onChange={handleChange} />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={24}>
                <b className={classes.title}>{t('CANCEL_ORDER.NOTE')}</b>
              </Col>
              <Col span={24}>
                <Form.Item help={_.get(errors, 'note')} validateStatus={_.get(errors, 'note') ? 'error' : 'success'} name={['note']}>
                  <AntTextArea
                    value={values.note}
                    onChange={event => {
                      const value = _.get(event, 'target.value', '');
                      setFieldValue('note', value);
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
      <Button className={classes.buttonStyle} key="4" onClick={showModal}>
        {t('ACTION.PAYBACK_ENTRY')}
      </Button>
    </>
  );
};

export default ShopPaybackModal;
