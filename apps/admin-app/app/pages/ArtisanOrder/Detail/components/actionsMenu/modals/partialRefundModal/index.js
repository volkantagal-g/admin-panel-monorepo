import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Modal, Divider, Form, Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';

import {
  validationSchema,
  getInitialValues,
  manipulateRefundOptions,
} from './formHelper';
import { validate } from '@shared/yup';
import {
  orderDetailSelector,
  orderShopRefundOptionSelector,
} from '../../../../redux/selectors';
import AntSelect from '@shared/components/UI/AntSelect';
import { getLangKey } from '@shared/i18n';
import { Creators } from '../../../../redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getUser } from '@shared/redux/selectors/auth';
import useStyles from '@app/pages/ArtisanOrder/Detail/components/actionsMenu/modals/partialRefundModal/styles';
import { ALLOWED_REFUND_REASONS } from './constants';

const PartialRefundModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const refundOption = useSelector(orderShopRefundOptionSelector.getData);
  const refundReasons = refundOption?.filter(option => ALLOWED_REFUND_REASONS.includes(option?._id));
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const user = getUser();
  const isRefundOptionPending = useSelector(
    orderShopRefundOptionSelector.getIsPending,
  );
  const { t } = useTranslation('artisanOrderPage');
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [localRefundCount, setLocalRefundCount] = useState([]);
  const { products = [], partialRefunds = [] } = orderDetail;
  let formik = useFormik({});

  const refundMap = {};
  _.forEach(products, product => {
    refundMap[product._id] = {
      productName: product.name,
      orderedCount: product.count,
      refundedCount: 0,
      refundCount:
        localRefundCount?.find(x => x.id === product._id)?.count ?? 0,
    };
  });

  _.forEach(partialRefunds, partialRefund => {
    const { partialRefundItems = [] } = partialRefund;
    _.forEach(partialRefundItems, partialRefundItem => {
      const { count = 0, item } = partialRefundItem;
      refundMap[item].refundedCount += count;
    });
  });

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    closeModal();
  };

  const handleCancel = () => {
    formik.resetForm();
    form.resetFields();
    handleOk();
  };

  formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(),
    onSubmit: values => {
      if (!values.selectedRefundReasonId) {
        return dispatch(
          ToastCreators.error({ message: t('ERRORS.CANCEL_SHOP') }),
        );
      }

      const filteredRefundCount = values.refundCount.filter(
        item => item.count !== 0,
      );
      const errItems = [];

      _.forEach(refundMap, refundItem => {
        if (refundItem.refundCount) {
          if (
            refundItem.refundedCount + refundItem.refundCount >
              refundItem.orderedCount ||
            refundItem.refundCount < 0
          ) {
            errItems.push(refundItem.productName[getLangKey()]);
          }
        }
      });

      if (errItems.length > 0) {
        const errItemsMessage = errItems.map(item => item.toString());
        const errorCheckCountsFor = t('ERRORS.CHECK_COUNTS_FOR');
        return dispatch(
          ToastCreators.error({ message: `error:${errItemsMessage} ${errorCheckCountsFor}` }),
        );
      }

      if (!(filteredRefundCount.length > 0)) {
        return dispatch(
          ToastCreators.error({ message: t('ERRORS.NO_ITEM_SELECTED') }),
        );
      }

      if (filteredRefundCount && filteredRefundCount.length) {
        const body = {
          userId: _.get(user, '_id', ''),
          refundReasonId: values.selectedRefundReasonId,
          items: filteredRefundCount,
        };

        dispatch(
          Creators.getOrderRefundRequest({
            orderDetailId: orderDetail._id,
            body,
          }),
        );
      }

      return handleCancel();
    },
  });

  const { handleSubmit, values, setFieldValue, errors } = formik;

  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

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
            loading={isRefundOptionPending}
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
                <b>{t('MODAL.CANCEL_LOCALS_ORDER.REFUND_REASON')}</b>
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
                    options={manipulateRefundOptions(refundReasons)}
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
                <b>{t('MODAL.CANCEL_LOCALS_ORDER.PRODUCT')}</b>
              </Col>
              <Col span={16}>
                <b>{t('MODAL.CANCEL_LOCALS_ORDER.COUNT')}</b>
              </Col>
              <Divider />
            </Row>
            {orderDetail.products &&
              orderDetail.products.map((item, index) => {
                return (
                  <Row key={item._id}>
                    <Col span={8} index={index}>
                      <b>{item.name[getLangKey()]}</b>
                    </Col>
                    <Col span={16} key={item._id}>
                      <Form.Item
                        key={item._id}
                        help={_.get(errors, 'count')}
                        validateStatus={
                          _.get(errors, 'count') ? 'error' : 'success'
                        }
                        name={`refundCount.${index}.count`}
                      >
                        <Input
                          type="number"
                          key={item._id}
                          defaultValue={0}
                          value={values.refundCount}
                          onChange={event => {
                            const value = _.get(event, 'target.value', '');
                            if (value) {
                              const refundObject = {
                                count: Number(value),
                                id: item._id,
                              };
                              const refundCountFiltred =
                                values.refundCount.filter(
                                  refund => refund.id !== item._id,
                                );
                              const refundCountArray = [
                                ...refundCountFiltred,
                                refundObject,
                              ];
                              setFieldValue('refundCount', refundCountArray);
                              setLocalRefundCount(refundCountArray);
                            }
                          }}
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}
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
