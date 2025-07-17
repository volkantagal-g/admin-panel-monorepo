import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col, Modal, Button, Divider, Form, Input } from 'antd';
import { useFormik } from 'formik';
import _ from 'lodash';

import {
  validationSchema,
  getInitialValues,
} from './formHelper';
import AntTextArea from '@shared/components/UI/AntTextArea';
import { orderDetailSelector } from '../../../../redux/selectors';
import { Creators } from '../../../../redux/actions';
import { validate } from '@shared/yup';
import useStyles from '@app/pages/ArtisanOrder/Detail/components/actionsMenu/modals/shopPaybackModal/styles';
import { MANUAL_TYPES } from '@app/pages/GetirFood/RestaurantExternalTransaction/constants';
import { MANUAL_CATEGORIES } from '@app/pages/GetirFood/RestaurantExternalTransaction/components/SingleTransaction/components/TransactionModal/constants';

const ShopPaybackModal = () => {
  const classes = useStyles();
  const { t } = useTranslation('artisanOrderPage');
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const currentSupplierNetRevenue = _.get(orderDetail, 'financial.supplierNetRevenue', 0);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    closeModal();
  };

  const handleCancel = resetForm => {
    resetForm();
    form.resetFields();
    handleOk();
  };

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(),
    onSubmit: (values, formikHelpers) => {
      const body = {
        shopId: orderDetail.shop.id,
        supplierNetRevenue: Number(values.supplierNetRevenue),
        orderId: orderDetail._id,
        category: MANUAL_CATEGORIES.Other,
        noteToShop: values.noteToShop,
        manualType: MANUAL_TYPES.NEGATIVE,
      };
      dispatch(Creators.createExternalTransactionRequest({ body }));
      return handleCancel(formikHelpers.resetForm);
    },
  });

  const { handleSubmit, values, setFieldValue, errors, handleChange } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

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
          <Button
            key="submit"
            type="primary"
            form="shop-payback-modal"
            htmlType="submit"
            loading={isPending}
          >
            {t('button:SAVE')}
          </Button>]}
      >
        <Form
          form={form}
          id="shop-payback-modal"
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Col span={24}>
            <Row>
              <Col className={classes.space} span={24}>
                <b className={classes.amount}>
                  {t('MODAL.CANCEL_LOCALS_ORDER.AMOUNT')} ({t('ACTION.SUPPLIER_NET_REVENUE')} {currentSupplierNetRevenue.toFixed(2)})
                </b>
                <Button onClick={() => setFieldValue('supplierNetRevenue', currentSupplierNetRevenue.toString())}>
                  {t('MODAL.CANCEL_LOCALS_ORDER.COPY')}
                </Button>
              </Col>
              <Col span={24}>
                <Form.Item
                  help={_.get(errors, 'supplierNetRevenue')}
                  validateStatus={_.get(errors, 'supplierNetRevenue') ? 'error' : 'success'}
                  name="supplierNetRevenue"
                >
                  <Input
                    type="number"
                    value={values.supplierNetRevenue}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={24}>
                <b className={classes.title}>{t('MODAL.CANCEL_LOCALS_ORDER.NOTE')}</b>
              </Col>
              <Col span={24}>
                <Form.Item
                  help={_.get(errors, 'noteToShop')}
                  validateStatus={_.get(errors, 'noteToShop') ? 'error' : 'success'}
                  name={['noteToShop']}
                >
                  <AntTextArea
                    value={values.noteToShop}
                    onChange={event => {
                      const value = _.get(event, 'target.value', '');
                      setFieldValue('noteToShop', value);
                    }}
                    disabled={false}
                    autoComplete="off"
                    showCount
                    maxLength={1000}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Form>
      </Modal>
      <Button
        className={classes.buttonStyle}
        key="4"
        onClick={showModal}
      >
        {t('ACTION.PAYBACK_ENTRY')}
      </Button>
    </>
  );
};

export default ShopPaybackModal;
