import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Tooltip,
  Button,
  Col,
  Divider,
  Form,
  Modal,
  Radio,
  Row,
  Space,
  Typography,
  Input,
  Spin,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { find, get, has } from 'lodash';

import { useParams, useSearchParams } from 'react-router-dom';

import { LoadingOutlined, RightOutlined } from '@ant-design/icons';

import {
  convertRequestSourceOptions,
  WRAP_BY_RADIO_LABEL_LENGTH,
  fieldRequired,
  yesOrNoOptions,
  CANCEL_FOOD_ORDER_FIELDS as FIELDS,
} from './formHelper';
import {
  orderDetailSelector,
  orderCancelOptionSelector,
  orderCancelSelector,
} from '@app/pages/GetirFood/OrderDetail/redux/selectors';
import { Creators } from '@app/pages/GetirFood/OrderDetail/redux/actions';
import { CALLER_TYPES, FOOD_DELIVERY, FOOD_ORDER_STATUS } from '@shared/shared/constants';
import useStyles from './styles';
import { getLangKey } from '@shared/i18n';
import cancelFlowTree from './cancelFlowTree';
import { getUser } from '@shared/redux/selectors/auth';
import { foodOrderCancelReasonSource } from '@shared/shared/constantValues';
import { handleSalesforceNotification } from '@app/pages/MarketOrder/OrderDetail/utils';

const { Text } = Typography;
const { TextArea } = Input;

const CancelFoodOrderModal = () => {
  const { t } = useTranslation('foodOrderPage');
  const dispatch = useDispatch();
  const cancelOptions = useSelector(orderCancelOptionSelector.getData);
  const isCancelOptionsPending = useSelector(orderCancelOptionSelector.getIsPending);
  const isCancelPending = useSelector(orderCancelSelector.getIsPending);
  const orderDetail = useSelector(orderDetailSelector.getData);
  const user = getUser();
  const [form] = Form.useForm();
  const classes = useStyles();
  const { orderDetailId } = useParams();
  const [params] = useSearchParams();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [requestSource, setRequestSource] = useState(null);
  const [cancelOption, setCancelOption] = useState(null);

  const cancelSource = get(cancelOption, 'cancelSource');
  const deliveryType = get(orderDetail, 'deliveryType');
  const orderStatus = get(orderDetail, 'status');

  const isHandover = orderStatus >= FOOD_ORDER_STATUS.HANDOVER;
  const isIframe = params.get('action') === 'cancel';

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    if (isIframe) {
      handleSalesforceNotification({ action: 'cancel', message: 'Close Refund Modal', status: 'cancel' });
      return;
    }
    setIsModalVisible(false);
    form.resetFields();
    setRequestSource(null);
    setCancelOption(null);
  };

  const onRequestSourceChange = e => {
    if (e) {
      setRequestSource(e.target.value);
    }
    const { REQUEST_SOURCE, ...rest } = FIELDS;
    form.resetFields(Object.values(rest));
    setCancelOption(null);
  };

  const onOptionChange = e => {
    setCancelOption(find(cancelOptions, { _id: e.target.value }));
    const { REQUEST_SOURCE, CANCEL_REASON_ID, ...rest } = FIELDS;
    form.resetFields(Object.values(rest));
  };

  const onSubmit = values => {
    const body = {
      ...values,
      callerType: CALLER_TYPES.ADMIN,
      callerId: user._id,
      foodOrderId: orderDetail._id,
    };
    dispatch(Creators.orderCancelRequest({ body, requestSource, cancelSource }));
    if (!isIframe) {
      setIsModalVisible(false);
      form.resetFields();
      setRequestSource(null);
      setCancelOption(null);
    }
  };

  const availableCancelOptions = useMemo(() => {
    if (get(cancelOptions, 'length') && typeof requestSource === 'number') {
      return cancelOptions.filter(
        ({ cancelSource: source, validStatusByRequest }) => Object.values(foodOrderCancelReasonSource).includes(source) &&
          get(
            validStatusByRequest,
            [
              requestSource,
              deliveryType === FOOD_DELIVERY.GETIR
                ? 'getirDelivery'
                : 'restaurantDelivery',
            ],
            [],
          ).includes(orderStatus),
      );
    }
    return [];
  }, [cancelOptions, requestSource, orderStatus, deliveryType]);

  useEffect(() => {
    if (isModalVisible) {
      dispatch(Creators.getOrderCancelOptionRequest({ orderDetailId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible, dispatch]);

  const getBooleanValueOfParam = value => (params.get(value) ? params.get(value) === 'true' : undefined);

  useEffect(() => {
    const updatedFields = {};
    if (!isModalVisible && isIframe) {
      setIsModalVisible(true);
    }
    if (params.get(FIELDS.REQUEST_SOURCE) && typeof +params.get(FIELDS.REQUEST_SOURCE) === 'number' && !requestSource) {
      setRequestSource(+params.get(FIELDS.REQUEST_SOURCE));
      updatedFields.requestSource = +params.get(FIELDS.REQUEST_SOURCE);
    }
    const cancelReasonId = params.get(FIELDS.CANCEL_REASON_ID);
    if (get(availableCancelOptions, 'length') && cancelReasonId) {
      const selectedOption = find(availableCancelOptions, { _id: cancelReasonId });
      setCancelOption(selectedOption);
      updatedFields.cancelReasonId = selectedOption ? params.get(FIELDS.CANCEL_REASON_ID) : undefined;
    }
    form.setFieldsValue(updatedFields);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, availableCancelOptions, form]);

  const isCancelable = orderDetail.status < FOOD_ORDER_STATUS.DELIVERED;
  const cancelFoodOrderText = t('ACTION.CANCEL_FOOD_ORDER');

  const renderButton = isCancelable ? (
    <Button key="1" className={classes.buttonStyle} onClick={showModal}>
      {cancelFoodOrderText}
    </Button>
  ) : (
    <Tooltip
      key="1"
      className={classes.tooltip}
      title={t('ACTION.CANNOT_CANCEL')}
    >
      <Button block disabled>
        {cancelFoodOrderText}
      </Button>
    </Tooltip>
  );

  const availableCancelSources = useMemo(
    () => convertRequestSourceOptions(deliveryType, orderStatus, cancelOptions),
    [cancelOptions, orderStatus, deliveryType],
  );

  const convertCancelReason = ({ _id: id, messages: { [getLangKey()]: message } }) => (
    <Col key={id} span={message.length < WRAP_BY_RADIO_LABEL_LENGTH ? 12 : 24}>
      <Radio key={id} value={id}>
        {message}
      </Radio>
    </Col>
  );

  return (
    <>
      {isCancelable && isModalVisible && (
        <Modal
          title={cancelFoodOrderText}
          className={classes.modal}
          visible={isModalVisible}
          onCancel={closeModal}
          width={600}
          data-testid="food-order-detail-cancel-order-modal"
          footer={[
            <Space key="modalFooter" className={classes.modalButtonContainer}>
              <Button key="back" onClick={closeModal} size="large" block>
                {t('button:CANCEL')}
              </Button>
              <Button
                key="submit"
                type="primary"
                form="cancel-food-order-modal"
                htmlType="submit"
                loading={isCancelPending}
                size="large"
                block
              >
                {t('button:SEND')}
              </Button>
            </Space>,
          ]}
        >
          <Spin spinning={isCancelOptionsPending} indicator={<LoadingOutlined spin />}>
            <Form
              form={form}
              id="cancel-food-order-modal"
              requiredMark={false}
              onFinish={onSubmit}
              className={classes.form}
              colon={false}
              layout="horizontal"
              labelCol={{ span: 5 }}
              labelAlign="left"
              labelWrap={false}
            >
              <Form.Item
                name={FIELDS.REQUEST_SOURCE}
                label={t('MODAL.CANCEL_FOOD_ORDER.REQUEST_SOURCE')}
                rules={fieldRequired}
              >
                <Radio.Group
                  className={`${classes.optionGroup} ${classes.optionGroupBlock}`}
                  options={availableCancelSources}
                  onChange={onRequestSourceChange}
                  value={requestSource}
                />
              </Form.Item>
              <Form.Item noStyle shouldUpdate>
                {({ getFieldValue }) => typeof getFieldValue(FIELDS.REQUEST_SOURCE) === 'number' && (
                  <>
                    <Divider />
                    <Form.Item
                      name={FIELDS.CANCEL_REASON_ID}
                      label={t('MODAL.CANCEL_FOOD_ORDER.REQUEST_REASON')}
                      rules={fieldRequired}
                    >
                      {getFieldValue(FIELDS.CANCEL_REASON_ID) ? (
                        <Space size={0}>
                          <Text className={classes.selectedRequest}>
                            {get(cancelOption, ['messages', getLangKey()], '')}
                          </Text>
                          <Button
                            type="link"
                            htmlType="button"
                            onClick={() => onRequestSourceChange()}
                          >
                            {t('COMPLAINT_REFUND_MODAL.CHANGE')} <RightOutlined />
                          </Button>
                        </Space>
                      ) : (
                        <Radio.Group className={classes.optionGroup} onChange={onOptionChange} value={get(cancelOption, '_id')}>
                          <Row>
                            {availableCancelOptions
                              .sort((a, b) => a.messages[getLangKey()].length - b.messages[getLangKey()].length)
                              .map(item => convertCancelReason(item))}
                          </Row>
                        </Radio.Group>
                      )}
                    </Form.Item>
                    {getFieldValue(FIELDS.CANCEL_REASON_ID) && (
                      <>
                        {has(cancelFlowTree, [deliveryType, requestSource, cancelSource, FIELDS.IS_APPROVED_BY_OPERATION_SQUAD]) && (
                          <>
                            <Divider />
                            <Form.Item
                              name={FIELDS.IS_APPROVED_BY_OPERATION_SQUAD}
                              label={t('MODAL.CANCEL_FOOD_ORDER.IS_APPROVED_BY_OPERATION_SQUAD')}
                              labelCol={{ span: 12 }}
                              rules={fieldRequired}
                              initialValue={getBooleanValueOfParam(FIELDS.IS_APPROVED_BY_OPERATION_SQUAD)}
                            >
                              <Radio.Group
                                className={`${classes.optionGroup} ${classes.optionGroupBlock}`}
                                options={yesOrNoOptions}
                              />
                            </Form.Item>
                          </>
                        )}
                        {(
                          (typeof getFieldValue(FIELDS.IS_APPROVED_BY_OPERATION_SQUAD) === 'boolean' && !isHandover)
                        || has(cancelFlowTree, [deliveryType, requestSource, cancelSource, FIELDS.IS_RESTAURANT_REACHED])
                        || (has(cancelFlowTree, [deliveryType, requestSource, cancelSource, 'isHandover']) && !isHandover)
                        )
                        && (
                          <>
                            {typeof getFieldValue(FIELDS.IS_APPROVED_BY_OPERATION_SQUAD) !== 'boolean' && <Divider />}
                            <Form.Item
                              name={FIELDS.IS_RESTAURANT_REACHED}
                              label={t('MODAL.CANCEL_FOOD_ORDER.IS_RESTAURANT_REACHED')}
                              labelCol={{ span: 12 }}
                              rules={fieldRequired}
                              initialValue={getBooleanValueOfParam(FIELDS.IS_RESTAURANT_REACHED)}
                            >
                              <Radio.Group
                                className={`${classes.optionGroup} ${classes.optionGroupBlock}`}
                                options={yesOrNoOptions}
                              />
                            </Form.Item>
                            {getFieldValue(FIELDS.IS_RESTAURANT_REACHED) && (
                              <Form.Item
                                name={FIELDS.IS_FOOD_ORDER_READY}
                                label={t('MODAL.CANCEL_FOOD_ORDER.IS_PREPARED')}
                                labelCol={{ span: 12 }}
                                rules={fieldRequired}
                                initialValue={getBooleanValueOfParam(FIELDS.IS_FOOD_ORDER_READY)}
                              >
                                <Radio.Group
                                  className={`${classes.optionGroup} ${classes.optionGroupBlock}`}
                                  options={yesOrNoOptions}
                                />
                              </Form.Item>
                            )}
                          </>
                        )}
                      </>
                    )}
                    {(getFieldValue(FIELDS.CANCEL_REASON_ID) &&
                    (
                      typeof getFieldValue(FIELDS.IS_FOOD_ORDER_READY) === 'boolean'
                      || getFieldValue(FIELDS.IS_RESTAURANT_REACHED) === false
                      || (typeof getFieldValue(FIELDS.IS_APPROVED_BY_OPERATION_SQUAD) === 'boolean' && isHandover)
                      || (has(cancelFlowTree, [deliveryType, requestSource, cancelSource, 'isHandover']) && isHandover)
                      || has(cancelFlowTree, [deliveryType, requestSource, cancelSource, FIELDS.IS_FOOD_ORDER_READY])
                      || has(cancelFlowTree, [deliveryType, requestSource, FIELDS.IS_FOOD_ORDER_READY])
                    )) && (
                      <>
                        <Divider />
                        <Form.Item name={FIELDS.CANCEL_NOTE} rules={fieldRequired} initialValue={params.get(FIELDS.CANCEL_NOTE)}>
                          <TextArea placeholder={t('MODAL.CANCEL_FOOD_ORDER.NOTE_PLACEHOLDER')} autoSize={{ minRows: 3, maxRows: 3 }} />
                        </Form.Item>
                      </>
                    )}
                  </>
                )}
              </Form.Item>
            </Form>
          </Spin>
        </Modal>
      )}
      {renderButton}
    </>
  );
};

export default CancelFoodOrderModal;
