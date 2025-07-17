import { useDispatch, useSelector } from 'react-redux';
import { Form, Radio, Typography, Input, Divider, Row, Col, Button, Space, Spin, Alert } from 'antd';
import { useTranslation } from 'react-i18next';
import { get, find } from 'lodash';

import { LoadingOutlined, RightOutlined } from '@ant-design/icons';

import { useSearchParams } from 'react-router-dom';

import { useEffect } from 'react';

import { convertSelectOptions } from '@shared/utils/common';
import {
  getMainReasonsSelector,
  getSubReasonSelector,
  getSubReasonsSelector,
  orderDetailSelector,
} from '@app/pages/GetirFood/OrderDetail/redux/selectors';
import useStyles from './styles';

import { Creators } from '@app/pages/GetirFood/OrderDetail/redux/actions';
import {
  channelOptions,
  formatNumber,
  rules,
} from '@app/pages/GetirFood/OrderDetail/components/actionsMenu/modals/ComplaintRefundModal/formHelper';
import { getLangKey } from '@shared/i18n';
import { FOOD_ORDER_STATUS } from '@shared/shared/constants';

const { Text, Title } = Typography;

const ReasonSection = ({ form }) => {
  const { t } = useTranslation('foodOrderPage');
  const dispatch = useDispatch();

  const classes = useStyles();

  const orderDetail = useSelector(orderDetailSelector.getData);
  const mainReasons = useSelector(getMainReasonsSelector.getData);
  const isMainReasonsPending = useSelector(getMainReasonsSelector.getIsPending);
  const { subReasons } = useSelector(getSubReasonsSelector.getData);
  const { mainReasonId } = useSelector(getSubReasonSelector.getData);
  const isSubReasonPending = useSelector(getSubReasonSelector.getIsPending);
  const isSubReasonsPending = useSelector(getSubReasonsSelector.getIsPending);

  const isRefundable = [FOOD_ORDER_STATUS.DELIVERED, FOOD_ORDER_STATUS.RATED].includes(orderDetail.status);
  const hasPersonalPromoInOrder = get(orderDetail, ['personalPromoId'], false);

  const [params] = useSearchParams();

  useEffect(() => {
    if (mainReasonId) {
      dispatch(Creators.getSubReasonsRequest({ id: mainReasonId }));
      const values = form.getFieldsValue(true);
      form.setFieldsValue({ ...values, mainReason: mainReasonId });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainReasonId, params, dispatch]);

  const handleMainReasonChange = e => {
    const id = e.target.value;
    dispatch(Creators.getSubReasonsRequest({ id }));
    const values = form.getFieldsValue(true);
    form.setFieldsValue({ ...values, subReason: null, refundSource: null });
  };

  const handleSubReasonChange = () => {
    const values = form.getFieldsValue(true);
    delete values.isRestaurantReached;
    delete values.isRefundApprovedByRestaurant;
    delete values.changedSuggestedRefundSource;
    delete values.refundSource;
    form.setFieldsValue({ ...values });
  };

  const handleSelectedMainReasonClick = () => {
    const values = form.getFieldsValue(true);
    form.setFieldsValue({ ...values, mainReason: null, subReason: null, isRestaurantReached: null, isRefundApprovedByRestaurant: null });
  };

  const handleSelectedSubReasonClick = () => {
    const values = form.getFieldsValue(true);
    form.setFieldsValue({ ...values, subReason: null, isRestaurantReached: null, isRefundApprovedByRestaurant: null });
  };

  if (((!isRefundable && !orderDetail.isRefunded && !orderDetail.isRefundPending) ||
   (isRefundable && (orderDetail.isRefunded || orderDetail.isRefundPending || orderDetail?.returnId))) && hasPersonalPromoInOrder) {
    return (
      <Alert
        showIcon
        type="error"
        message={(
          <Title
            level={5}
            type="danger"
          >
            {t('COMPLAINT_REFUND_MODAL.UNREFUNDABLE_AND_NOT_DISCOUNTABLE_TITLE')}
          </Title>
        )}
        description={(
          <Text
            type="danger"
            strong
          >
            {t(`COMPLAINT_REFUND_MODAL.${isRefundable ? 'ALREADY_REFUNDED_AND_NOT_DISCOUNTABLE' : 'UNREFUNDABLE_AND_NOT_DISCOUNTABLE'}`)}
          </Text>
        )}
      />
    );
  }

  return (
    <>
      <Form.Item
        name="channel"
        initialValue={formatNumber(params.get('channel'))}
        label={<Title level={5}>{t('COMPLAINT_REFUND_MODAL.COMMUNICATION_CHANNEL')}:</Title>}
      >
        <Radio.Group
          options={convertSelectOptions(channelOptions, { isTranslation: true })}
          optionType="button"
          buttonStyle="solid"
        />
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.channel !== currentValues.channel || prevValues.mainReason !== currentValues.mainReason}
      >
        {({ getFieldValue }) => (
          !!getFieldValue('channel') && (
            <>
              {find(channelOptions, { _id: getFieldValue('channel') })?.enableTextField && (
              <Form.Item rules={rules.channelOptionText} name="channelOptionText" initialValue={params.get('channelOptionText')}>
                <Input data-testid="channelOptionText" size="large" placeholder={t('COMPLAINT_REFUND_MODAL.COMMUNICATION_CHANNEL_PLACEHOLDER')} />
              </Form.Item>
              )}
              <Divider />
              <Form.Item
                noStyle={!getFieldValue('channel')}
                name="mainReason"
                label={<Title level={5}>{t('COMPLAINT_REFUND_MODAL.MAIN_REASON')}</Title>}
              >
                {!getFieldValue('mainReason') ? (
                  <Spin spinning={isMainReasonsPending || isSubReasonPending} indicator={<LoadingOutlined spin />}>
                    <Radio.Group
                      onChange={handleMainReasonChange}
                    >
                      <Row>
                        {convertSelectOptions(mainReasons, { isTranslation: true }).map(({ label, value }) => (
                          <Col xs={12}>
                            <Radio value={value}>{label}</Radio>
                          </Col>
                        ))}
                      </Row>
                    </Radio.Group>
                  </Spin>
                ) : (
                  <Space size={0}>
                    <Text className={classes.selectedReason}>{get(find(mainReasons, { _id: getFieldValue('mainReason') }), ['name', getLangKey()])}</Text>
                    <Button type="link" htmlType="button" onClick={handleSelectedMainReasonClick}>
                      {t('COMPLAINT_REFUND_MODAL.CHANGE')} <RightOutlined />
                    </Button>
                  </Space>
                )}
              </Form.Item>
            </>
          ))}
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.subReason !== currentValues.subReason || prevValues.mainReason !== currentValues.mainReason}
      >
        {({ getFieldValue }) => (
          getFieldValue('mainReason') && (
            <>
              <Form.Item
                noStyle={!getFieldValue('mainReason')}
                name="subReason"
                label={<Title level={5}>{t('COMPLAINT_REFUND_MODAL.SUB_REASON')}</Title>}
                initialValue={params.get('subReason')}
              >
                {!getFieldValue('subReason') ? (
                  <Spin spinning={isSubReasonsPending || isSubReasonPending} indicator={<LoadingOutlined spin />}>
                    <Radio.Group onChange={handleSubReasonChange}>
                      <Row>
                        {convertSelectOptions(subReasons, { isTranslation: true }).map(({ label, value }) => (
                          <Col xs={subReasons.length === 1 ? 24 : 12}>
                            <Radio value={value}>{label}</Radio>
                          </Col>
                        ))}
                      </Row>
                    </Radio.Group>
                  </Spin>
                ) : (
                  <Spin spinning={isSubReasonsPending || isSubReasonPending} indicator={<LoadingOutlined spin />}>
                    <Space size={0}>
                      <Text className={classes.selectedReason}>{get(find(subReasons, { _id: getFieldValue('subReason') }), ['name', getLangKey()])}</Text>
                      {(!isSubReasonsPending && !isSubReasonPending) && (
                      <Button type="link" htmlType="button" onClick={handleSelectedSubReasonClick}>
                        {t('COMPLAINT_REFUND_MODAL.CHANGE')} <RightOutlined />
                      </Button>
                      )}
                    </Space>
                  </Spin>
                )}
              </Form.Item>
              {get(find(subReasons, { _id: getFieldValue('subReason') }), 'enableTextField', false) && (
              <Form.Item rules={rules.subReasonText} name="subReasonText">
                <Input size="large" placeholder={t('COMPLAINT_REFUND_MODAL.SUBREASON_TEXT_PLACEHOLDER')} />
              </Form.Item>
              )}
            </>
          ))}
      </Form.Item>
    </>
  );
};

export default ReasonSection;
