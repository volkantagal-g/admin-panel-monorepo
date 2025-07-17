import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Col, Divider, Form, Modal, Radio, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';

import {
  validationSchema,
  getInitialValues,
  manipulateCancelOptions,
  manipulateValuesAfterSubmit,
  selectProductsFromOrder,
} from './formHelper';
import { orderCancelOptionSelector, orderDetailSelector } from '../../../../redux/selectors';
import { Creators } from '../../../../redux/actions';
import { artisanOrderCancelReasonSource } from '@shared/shared/constantValues';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import AntSelect from '@shared/components/UI/AntSelect';
import { validate } from '@shared/yup';
import AntTextArea from '@shared/components/UI/AntTextArea';
import { isNullOrEmpty } from '@shared/utils/common';
import { LOCALS_ORDER_STATUS } from '@shared/shared/constants';
import useStyles from '@app/pages/ArtisanOrder/Detail/components/actionsMenu/modals/cancelShopOrderModal/styles';
import { CANCEL_ACTION_TYPE, PRODUCT_CLOSING_WARNING_MESSAGE } from './constants';

const CancelShopOrderModal = () => {
  const { t } = useTranslation('artisanOrderPage');
  const dispatch = useDispatch();
  const cancelOptions = useSelector(orderCancelOptionSelector.getData);
  const isCancelPending = useSelector(orderCancelOptionSelector.getIsPending);
  const orderDetail = useSelector(orderDetailSelector.getData);
  const isRetailFlag = orderDetail?.isShopRetail;
  const [form] = Form.useForm();
  let formik;
  const classes = useStyles();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [localCancelOptions, setLocalCancelOptions] = useState(cancelOptions);
  const [localDomainSelectedType, setLocalDomainSelectedType] = useState(artisanOrderCancelReasonSource.GETIR);
  const [localIsPrepared, setLocalIsPrepared] = useState(null);
  const [localChangeOption, setLocalChangeOption] = useState();
  const [productsToClose, setProductsToClose] = useState([]);

  const isCancellationDisabled = orderDetail.status >= LOCALS_ORDER_STATUS.DELIVERED;

  useEffect(() => {
    if (isRetailFlag) setLocalIsPrepared(false);
  }, [isRetailFlag]);

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

  const getActionType = id => {
    const cancelOption = cancelOptions?.find(option => option._id === id);
    return cancelOption?.actionType;
  };

  formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(),
    onSubmit: values => {
      if (getActionType(localChangeOption) === CANCEL_ACTION_TYPE.CLOSE_PRODUCT && productsToClose?.length === 0) {
        dispatch(ToastCreators.error({ message: t('CANCELLATION_PRODUCT_NOT_SELECTED_ERROR_MESSAGE') }));
        return null;
      }

      if (isNullOrEmpty(values.cancelNote) || isNullOrEmpty(values.cancelReasonId) || isNullOrEmpty(values.isPrepared)) {
        return dispatch(ToastCreators.error({
          message:
            t('ERRORS.CANCEL_SHOP'),
        }));
      }

      const body = manipulateValuesAfterSubmit(values);

      dispatch(Creators.getOrderCancelRequest({ id: orderDetail._id, body }));
      return handleCancel();
    },
  });

  const { handleSubmit, values, setFieldValue, errors } = formik;

  const handleRadioGroupChange = event => {
    setLocalChangeOption(null);
    setLocalDomainSelectedType(event.target.value);
  };

  const handleRadioGroupChangePrepared = event => {
    setLocalIsPrepared(event.target.value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    setFieldValue('domainSelectedType', localDomainSelectedType);
    setFieldValue('isPrepared', localIsPrepared);
    setFieldValue('cancelReasonId', localChangeOption);
    setFieldValue('products', productsToClose);
    setLocalCancelOptions(_.filter(cancelOptions, cancelOption => cancelOption.cancelSource === localDomainSelectedType));
  }, [localDomainSelectedType, localIsPrepared, localChangeOption, cancelOptions, productsToClose, setFieldValue]);

  useEffect(() => {
    if (!isModalVisible && !isRetailFlag) setLocalIsPrepared(null);
  }, [isModalVisible, isRetailFlag]);

  const products = selectProductsFromOrder(orderDetail);

  return (
    <>
      <Modal
        title={t('ACTION.CANCEL_LOCALS_ORDER')}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={closeModal}
        width={600}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t('global:CANCEL')}
          </Button>,
          <Button
            key="submit"
            type="primary"
            form="cancel-shop-order-modal"
            htmlType="submit"
            loading={isCancelPending}
          >
            {t('button:SAVE')}
          </Button>,
        ]}
      >
        <Form
          form={form}
          id="cancel-shop-order-modal"
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Row>
            <Col span={24}>
              <b className={classes.title}>{t('MODAL.CANCEL_LOCALS_ORDER.IS_PREPARED')}</b>
            </Col>
            <Col span={24}>
              <Radio.Group
                disabled={isRetailFlag}
                onChange={handleRadioGroupChangePrepared}
                value={localIsPrepared}
              >
                <Row>
                  <Col span={12}>
                    <Radio value>
                      {t('MODAL.CANCEL_LOCALS_ORDER.YES')}
                    </Radio>
                  </Col>
                  <Col span={12}>
                    <Radio value={false}>
                      {t('MODAL.CANCEL_LOCALS_ORDER.NO')}
                    </Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Col>
            <Divider />
            <Col span={24}>
              <b className={classes.title}>{t('MODAL.CANCEL_LOCALS_ORDER.CANCEL_REASON_SOURCE')}</b>
            </Col>
            <Col span={24}>
              <Radio.Group
                value={values.domainSelectedType}
                onChange={handleRadioGroupChange}
              >
                <Row>
                  <Col span={8}>
                    <Radio value={artisanOrderCancelReasonSource.GETIR}>
                      {t('MODAL.CANCEL_LOCALS_ORDER.GETIR')}
                    </Radio>
                  </Col>
                  <Col span={8}>
                    <Radio value={artisanOrderCancelReasonSource.CLIENT}>
                      {t('MODAL.CANCEL_LOCALS_ORDER.CLIENT')}
                    </Radio>
                  </Col>
                  <Col span={8}>
                    <Radio value={artisanOrderCancelReasonSource.RESTAURANT}>
                      {t('MODAL.CANCEL_LOCALS_ORDER.ARTISAN')}
                    </Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Col>
            <Divider />

            <Col span={24}>
              <Row>
                <Col span={24}>
                  <Form.Item
                    help={_.get(errors, 'cancelReasonId')}
                    validateStatus={_.get(errors, 'cancelReasonId') ? 'error' : 'success'}
                    name="cancelReasonId"
                    label={t('MODAL.CANCEL_LOCALS_ORDER.CANCEL_REASON')}
                  >
                    <AntSelect
                      value={localChangeOption}
                      options={manipulateCancelOptions(localCancelOptions)}
                      onChange={cancelReasonId => {
                        setLocalChangeOption(cancelReasonId);
                      }}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {getActionType(localChangeOption) === CANCEL_ACTION_TYPE.CLOSE_PRODUCT && (
            <Form.Item name="products" label={t(PRODUCT_CLOSING_WARNING_MESSAGE?.[localChangeOption])}>
              <Checkbox.Group className={classes.products} options={products} value={productsToClose} onChange={setProductsToClose} />
            </Form.Item>
            )}

            <Divider />
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <b className={classes.title}>{t('MODAL.CANCEL_LOCALS_ORDER.NOTE')}</b>
                </Col>
                <Col span={24}>
                  <Form.Item
                    help={_.get(errors, 'cancelNote')}
                    validateStatus={_.get(errors, 'cancelNote') ? 'error' : 'success'}
                    name={['cancelNote']}
                  >
                    <AntTextArea
                      value={values.cancelNote}
                      onChange={event => {
                        const value = _.get(event, 'target.value', '');
                        setFieldValue('cancelNote', value);
                      }}
                      disabled={false}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Button
        key="1"
        className={classes.buttonStyle}
        disabled={isCancellationDisabled}
        onClick={showModal}
      >
        {t('ACTION.CANCEL_LOCALS_ORDER')}
      </Button>
    </>
  );
};

export default CancelShopOrderModal;
