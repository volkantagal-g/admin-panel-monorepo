import { Button, Col, Divider, Form, Modal, Radio, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';

import { useEffect } from 'react';

import { waterOrderCancelReasonSource } from '@shared/shared/constantValues';
import AntSelect from '@shared/components/UI/AntSelect';
import { validate } from '@shared/yup';
import AntTextArea from '@shared/components/UI/AntTextArea';
import { Creators } from '@app/pages/GetirWater/OrderDetail/redux/actions';
import { getUser } from '@shared/redux/selectors/auth';
import { getSelectFilterOption } from '@shared/utils/common';

import { validationSchema, getInitialValues, getCancelOptions } from './formHelper';
import useStyles from './styles';
import { isCancelOrderModalVisibleSelector, orderDetailSelector } from '@app/pages/GetirWater/OrderDetail/redux/selectors';

const { Text } = Typography;

const CancelShopOrderModal = () => {
  const { t } = useTranslation('waterOrderDetailModal');
  const [form] = Form.useForm();
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = getUser();
  const { waterOrderId } = useParams();
  const isModalVisible = useSelector(isCancelOrderModalVisibleSelector);
  const orderDetail = useSelector(orderDetailSelector.getData);

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validate: validate(validationSchema),
    initialValues: getInitialValues(),
    onSubmit: values => {
      dispatch(
        Creators.orderCancelRequest({
          ...values,
          orderId: waterOrderId,
          canceledBy: user._id,
          canceledByFullName: user.name,
          totalRefundAmount: orderDetail.totalChargedAmount,
        }),
      );

      return handleCancel();
    },
  });

  const { handleSubmit, values, setFieldValue, errors } = formik;

  const closeModal = () => {
    dispatch(Creators.setIsCancelOrderModalVisible({ isCancelOrderModalVisible: false }));
  };

  function handleCancel() {
    formik.resetForm();
    form.resetFields();
    closeModal();
  }

  const showModal = () => {
    dispatch(Creators.setIsCancelOrderModalVisible({ isCancelOrderModalVisible: true }));
  };

  const handleOk = () => {
    closeModal();
  };

  const handleOnChangeCancelReasonSource = evt => {
    setFieldValue('cancelReasonSource', evt.target.value);
    setFieldValue('cancelReason', undefined);
  };
  const location = useLocation();
  useEffect(() => {
    const searchQuerys = location.search
      ? new URLSearchParams(location.search)
      : null;
    if (!searchQuerys) {
      return;
    }

    const cancelReasonSource = searchQuerys.get('source') && Number(searchQuerys.get('source'));
    const cancelReason = searchQuerys.get('reason') && Number(searchQuerys.get('reason'));
    const note = searchQuerys.get('note');

    if (!Number.isNaN(cancelReasonSource)) {
      setFieldValue('cancelReasonSource', cancelReasonSource);
    }
    if (!Number.isNaN(cancelReason)) {
      setFieldValue('cancelReason', cancelReason);
    }

    if (note) {
      setFieldValue('cancelNote', note);
    }
  }, [location, setFieldValue]);

  return (
    <>
      <Modal
        title={t('ACTION.CANCEL_ORDER')}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={closeModal}
        centered
        width={600}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t('button:CANCEL')}
          </Button>,
          <Button key="submit" type="primary" form="cancel-shop-order-modal" htmlType="submit">
            {t('button:SAVE')}
          </Button>,
        ]}
      >
        <Form form={form} id="cancel-shop-order-modal" onFinish={handleSubmit} layout="vertical">
          <Row>
            <Col span={24}>
              <b className={classes.title}>{t('CANCEL_ORDER.CANCEL_REASON_SOURCE')}</b>
            </Col>
            <Col span={24}>
              <Radio.Group value={values.cancelReasonSource} onChange={handleOnChangeCancelReasonSource}>
                <Row>
                  <Col span={8}>
                    <Radio value={waterOrderCancelReasonSource.GETIR}>{t('CANCEL_ORDER.GETIR')}</Radio>
                  </Col>
                  <Col span={8}>
                    <Radio value={waterOrderCancelReasonSource.CLIENT}>{t('CANCEL_ORDER.CLIENT')}</Radio>
                  </Col>
                  <Col span={8}>
                    <Radio value={waterOrderCancelReasonSource.VENDOR}>{t('CANCEL_ORDER.ARTISAN')}</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Col>
            <Col span={24}>{_.get(errors, 'cancelReasonSource') && <Text type="danger">{_.get(errors, 'cancelReasonSource')}</Text>}</Col>
            <Divider />
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <Form.Item validateStatus={_.get(errors, 'cancelReason') ? 'error' : 'success'} label={t('CANCEL_ORDER.CANCEL_REASON')}>
                    <AntSelect
                      options={getCancelOptions(values)}
                      onChange={cancelReason => {
                        setFieldValue('cancelReason', cancelReason);
                      }}
                      value={values.cancelReason}
                      autoComplete="off"
                      showSearch
                      filterOption={getSelectFilterOption}
                      getPopupContainer={trigger => trigger.parentNode}
                    />
                    <Col span={24}>{_.get(errors, 'cancelReason') && <Text type="danger">{_.get(errors, 'cancelReason')}</Text>}</Col>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Divider />
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <b className={classes.title}>{t('CANCEL_ORDER.NOTE')}</b>
                </Col>
                <Col span={24}>
                  <Form.Item help={_.get(errors, 'cancelNote')} validateStatus={_.get(errors, 'cancelNote') ? 'error' : 'success'}>
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
      <Button key="1" className={classes.buttonStyle} onClick={showModal}>
        {t('ACTION.CANCEL_ORDER')}
      </Button>
    </>
  );
};

export default CancelShopOrderModal;
