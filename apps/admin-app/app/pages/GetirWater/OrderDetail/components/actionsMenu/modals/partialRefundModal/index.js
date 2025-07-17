import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Modal, Divider, Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useLocation, useParams } from 'react-router';

import {
  validationSchema,
  getInitialValues,
  getPartialRefundOptions,
  getRefundProductCountOptions,
} from './formHelper';
import { validate } from '@shared/yup';
import {
  isPartialRefundModalVisibleSelector,
  orderDetailSelector,
} from '@app/pages/GetirWater/OrderDetail/redux/selectors';
import AntSelect from '@shared/components/UI/AntSelect';
import { getUser } from '@shared/redux/selectors/auth';
import { Creators } from '@app/pages/GetirWater/OrderDetail/redux/actions';

import useStyles from './styles';

const PartialRefundModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const orderDetail = useSelector(orderDetailSelector.getData);
  const location = useLocation();
  const user = getUser();
  const { t } = useTranslation('waterOrderDetailModal');
  const [form] = Form.useForm();
  const isModalVisible = useSelector(isPartialRefundModalVisibleSelector);

  const { waterOrderId } = useParams();

  const formik = useFormik({
    enableReinitialize: true,

    validate: validate(validationSchema),
    initialValues: getInitialValues(),
    onSubmit: values => {
      const returnedPrice = values.productReturnItemList.reduce((acc, item) => {
        const product = orderDetail?.products?.find(p => p.id === item.productId);
        return acc + product.price * item.count;
      }, 0);

      dispatch(
        Creators.productReturnRequest({
          productReturnItemList: values.productReturnItemList,
          orderId: waterOrderId,
          returnReason: values.selectedRefundReasonId,
          returnedBy: user._id,
          totalRefundAmount: returnedPrice,
        }),
      );

      return handleCancel();
    },
  });

  const { handleSubmit, values, setFieldValue, errors } = formik;

  const closeModal = () => {
    dispatch(
      Creators.setIsPartialRefundModalVisible({ isPartialRefundModalVisible: false }),
    );
  };

  function handleCancel() {
    formik.resetForm();
    form.resetFields();
    closeModal();
  }

  const showModal = () => {
    dispatch(
      Creators.setIsPartialRefundModalVisible({ isPartialRefundModalVisible: true }),
    );
  };

  const handleOk = () => {
    closeModal();
  };

  useEffect(() => {
    const mappedValues = {
      selectedRefundReasonId: values.selectedRefundReasonId,
      productReturnItemList: values.productReturnItemList,
    };
    if (values.productReturnItemList?.length > 0) {
      mappedValues.productReturnItemList = {};
      values.productReturnItemList.forEach(item => {
        mappedValues[`productReturnItemList.${item.productId}.count`] = item.count;
      });
    }

    form.setFieldsValue(mappedValues);
  }, [form, values]);

  useEffect(() => {
    const searchQuerys = location.search
      ? new URLSearchParams(location.search)
      : null;
    if (!searchQuerys) {
      return;
    }

    const queryReason = searchQuerys.get('reason') ?? undefined;
    const reason = Number(queryReason);

    if (!Number.isNaN(reason) && getPartialRefundOptions().find(option => option.value === reason)) {
      setFieldValue('selectedRefundReasonId', reason);
    }

    try {
      const selectedProductJSON = searchQuerys.get('products');
      const products = JSON.parse(selectedProductJSON);

      if (products) {
        const refundArray = products
          .map(product => {
            const orderDetailProduct = orderDetail?.products.find(
              item => item.id === product.id,
            );
            if (!orderDetailProduct) {
              return undefined;
            }
            const { quantity, id } = product;

            if (quantity > orderDetailProduct.count) {
              return undefined;
            }
            const refundObject = { count: Number(quantity), productId: id };
            return refundObject;
          })
          .filter(item => item);

        setFieldValue('productReturnItemList', refundArray);
        form.setFieldsValue({ productReturnItemList: refundArray });
      }
    }
    catch (error) { /* empty */ }
  }, [form, location, orderDetail, setFieldValue]);

  const refundItemList = useMemo(() => {
    return orderDetail?.products &&
      orderDetail?.products.map((item, index) => {
        return (
          <Row key={item.id}>
            <Col span={8} index={index}>
              <b>{item.name}</b>
            </Col>
            <Col span={16} key={item.id}>
              <Form.Item
                help={_.get(errors, 'count')}
                validateStatus={
                  _.get(errors, 'count') ? 'error' : 'success'
                }
                name={`productReturnItemList.${item.id}.count`}
              >
                <AntSelect
                  options={getRefundProductCountOptions(item.count)}
                  onChange={value => {
                    if (value) {
                      const refundObject = {
                        count: Number(value),
                        productId: item.id,
                      };
                      const refundCountFiltred =
                        values.productReturnItemList.filter(
                          refund => refund.productId !== item.id,
                        );
                      const refundCountArray = [
                        ...refundCountFiltred,
                        refundObject,
                      ];
                      setFieldValue(
                        'productReturnItemList',
                        refundCountArray,
                      );
                    }
                    else {
                      const refundCountFiltred =
                        values.productReturnItemList.filter(
                          refund => refund.productId !== item.id,
                        );
                      setFieldValue(
                        'productReturnItemList',
                        refundCountFiltred,
                      );
                    }
                  }}
                  autoComplete="off"
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>
        );
      });
  }, [errors, orderDetail, setFieldValue, values]);

  return (
    <>
      <Modal
        title={t('ACTION.PARTIAL_REFUND')}
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
            form="partial-refund-modal"
            htmlType="submit"
          >
            {t('ACTION.REFUND')}
          </Button>,
        ]}
      >
        <Form
          form={form}
          id="partial-refund-modal"
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Col span={24}>
            <Row>
              <Col span={8}>
                <b>{t('CANCEL_ORDER.REFUND_REASON')}</b>
              </Col>
              <Col span={16}>
                <Form.Item
                  help={_.get(errors, 'selectedRefundReasonId')}
                  validateStatus={
                    _.get(errors, 'selectedRefundReasonId')
                      ? 'error'
                      : 'success'
                  }
                  name="selectedRefundReasonId"
                >
                  <AntSelect
                    value={values.selectedRefundReasonId}
                    options={getPartialRefundOptions()}
                    onChange={selectedRefundReasonId => {
                      setFieldValue(
                        'selectedRefundReasonId',
                        selectedRefundReasonId,
                      );
                    }}
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={8}>
                <b>{t('CANCEL_ORDER.PRODUCT')}</b>
              </Col>
              <Col span={16}>
                <b>{t('CANCEL_ORDER.COUNT')}</b>
              </Col>
              <Divider />
            </Row>
            {refundItemList}
          </Col>
        </Form>
      </Modal>
      <Button className={classes.buttonStyle} key="3" onClick={showModal}>
        {t('ACTION.PARTIAL_REFUND')}
      </Button>
    </>
  );
};

export default PartialRefundModal;
