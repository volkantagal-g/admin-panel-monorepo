import { useSelector } from 'react-redux';
import { Form, Radio, Row, Checkbox, Input, InputNumber, Typography, Alert, Col, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { find, get, includes } from 'lodash';

import { useEffect, useState } from 'react';

import { InfoCircleFilled } from '@ant-design/icons';

import { useSearchParams } from 'react-router-dom';

import { numberFormat } from '@shared/utils/localization';
import { currency } from '@shared/utils/common';
import { FOOD_ORDER_STATUS } from '@shared/shared/constants';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import {
  orderDetailSelector,
  productsSelector,
  getRefundSourcesSelector,
  getSubReasonsSelector,
  getClientTrustScoreSelector,
} from '@app/pages/GetirFood/OrderDetail/redux/selectors';
import {
  FULL_REFUND,
  BY_GETIR,
  BY_RESTAURANT,
  PARTIAL_REFUND,
  IN_PRODUCT_REFUND,
  DESCRIPTION_MAX_LENGTH,
  rules,
  HIGH_CLIENT_TRUST_SCORE,
  formatNumber,
} from '@app/pages/GetirFood/OrderDetail/components/actionsMenu/modals/ComplaintRefundModal/formHelper';
import useStyles from './styles';
import { getLangKey } from '@shared/i18n';
import ShowTooltip from '@shared/components/UI/ShowTooltip';

const { Title, Text } = Typography;

const RefundSection = ({ form, refundType, setRefundType }) => {
  const { t } = useTranslation('foodOrderPage');
  const classes = useStyles();

  const [params] = useSearchParams();

  const { Can } = usePermission();

  const orderDetail = useSelector(orderDetailSelector.getData);
  const products = useSelector(productsSelector.getData);
  const { subReasons } = useSelector(getSubReasonsSelector.getData);
  const refundSources = useSelector(getRefundSourcesSelector.getData);
  const clientTrustScore = useSelector(getClientTrustScoreSelector.getData);

  const isHighClientTrustScore = get(clientTrustScore, 'score') === HIGH_CLIENT_TRUST_SCORE;

  const [refundSourceInfo, setRefundSourceInfo] = useState(null);
  const isRefundable = [FOOD_ORDER_STATUS.DELIVERED, FOOD_ORDER_STATUS.RATED].includes(orderDetail.status);
  const isRestaurantRefundAvailable = includes(refundSources, BY_RESTAURANT);

  const getSuggestedRefundSource = () => {
    const values = form.getFieldsValue(true);
    const selectedSubReason = find(subReasons, { _id: values.subReason });
    const suggestedRefundSource = get(selectedSubReason, ['suggestedRefundSource', orderDetail.deliveryType]);
    if ((suggestedRefundSource && !includes(refundSources, suggestedRefundSource)) || values.isRefundApprovedByRestaurant === false) {
      return BY_GETIR;
    }
    return suggestedRefundSource;
  };

  const handleRefundSourceInfo = () => {
    const suggestedRefundSource = getSuggestedRefundSource();

    const refundSourceText = {
      [BY_GETIR]: 'BY_GETIR',
      [BY_RESTAURANT]: 'BY_RESTAURANT',
    };
    const values = form.getFieldsValue(true);
    if (!values.refundSource) return null;
    if (!suggestedRefundSource) {
      return {
        text: t('COMPLAINT_REFUND_MODAL.REFUND_SOURCE_DEFAULT_INFO_TEXT'),
        type: 'info',
      };
    }
    if (values.refundSource === suggestedRefundSource) {
      return {
        text: t(
          'COMPLAINT_REFUND_MODAL.REFUND_SOURCE_INFO_TEXT',
          { refundSource: t(`COMPLAINT_REFUND_MODAL.${refundSourceText[values.refundSource]}`) },
        ),
        type: 'info',
      };
    }
    return {
      text: t('COMPLAINT_REFUND_MODAL.REFUND_SOURCE_CHANGED_INFO_TEXT'),
      type: 'warning',
    };
  };

  useEffect(() => {
    const values = form.getFieldsValue(true);
    if (!values.subReason) {
      form.setFieldsValue({ ...values, refundSource: null });
    }
    const suggestedRefundSource = getSuggestedRefundSource();

    if (suggestedRefundSource && !values.refundSource && includes(refundSources, suggestedRefundSource)) {
      form.setFieldsValue({ ...values, refundSource: suggestedRefundSource, changedSuggestedRefundSource: false });
    }
    setRefundSourceInfo(handleRefundSourceInfo());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subReasons]);

  const handleRefundSourceChange = e => {
    const { target: { value: inputValue } } = e;
    const suggestedRefundSource = getSuggestedRefundSource();
    setRefundSourceInfo(handleRefundSourceInfo());
    const values = form.getFieldsValue(true);
    let changedSuggestedRefundSource;
    if (suggestedRefundSource) {
      changedSuggestedRefundSource = inputValue !== suggestedRefundSource;
    }
    form.setFieldsValue({ ...values, changedSuggestedRefundSource });
  };

  const handleIsRestaurantReachedChange = () => {
    const values = form.getFieldsValue(true);
    delete values.isRefundApprovedByRestaurant;
    form.setFieldsValue({ ...values, refundSource: getSuggestedRefundSource(), changedSuggestedRefundSource: false });
    setRefundSourceInfo(handleRefundSourceInfo());
  };

  const handleIsRefundApprovedByRestaurantChange = () => {
    const values = form.getFieldsValue(true);
    form.setFieldsValue({ ...values, refundSource: getSuggestedRefundSource(), changedSuggestedRefundSource: false });
    setRefundSourceInfo(handleRefundSourceInfo());
  };

  const handleRefundTypeChange = e => {
    const values = { ...form.getFieldsValue(true) };
    const isPartialRefund = params.get('isPartialRefund');
    if (isPartialRefund && !e) {
      values.refundType = params.get('isPartialRefund') === 'true' ? PARTIAL_REFUND : FULL_REFUND;
    }
    const selectedRefundType = values.refundType;
    setRefundType(selectedRefundType);
    form.setFieldsValue({
      ...values,
      refundedProducts: {
        ...products?.map(() => (selectedRefundType === FULL_REFUND ? {
          checked: true,
          refundType: FULL_REFUND,
        } : {
          checked: false,
          refundType: undefined,
          amount: undefined,
        })),
      },
    });
  };

  const getProductRefundTypeByParam = (refundAmount, count, index) => {
    if (!refundAmount && (!count || index + 1 > count)) {
      return undefined;
    }
    if (refundAmount === 'fullRefund' || (typeof count === 'number' && index + 1 <= count)) {
      return FULL_REFUND;
    }
    return IN_PRODUCT_REFUND;
  };

  useEffect(() => {
    handleRefundTypeChange();
    const values = form.getFieldsValue(true);
    const isPartialRefund = params.get('isPartialRefund');
    const isRestaurantReached = params.get('isRestaurantReached');
    const isRefundApprovedByRestaurant = params.get('isRefundApprovedByRestaurant');
    if (isRestaurantReached === 'true' && isRefundApprovedByRestaurant) {
      form.setFieldsValue({
        ...values,
        isRefundApprovedByRestaurant: isRefundApprovedByRestaurant === 'true',
      });
    }
    if (products?.length > 0 && isPartialRefund && isPartialRefund === 'true') {
      form.setFieldsValue({
        ...values,
        refundedProducts: {
          ...products.map(({ _id, index }) => {
            const productRefundAmount = +params.get(`${_id}_amount`);
            const productRefundCount = +params.get(`${_id}_count`);
            return {
              checked: !!productRefundAmount || (!!productRefundCount && index + 1 <= productRefundCount),
              refundType: getProductRefundTypeByParam(productRefundAmount, productRefundCount, index),
              amount: productRefundAmount && productRefundAmount !== 'fullRefund' ? formatNumber(productRefundAmount) : undefined,
            };
          }),
        },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleProductCheckedChange = (e, idx) => {
    if (!e.target.checked) {
      const values = form.getFieldsValue(true);
      form.setFieldsValue({
        ...values,
        refundedProducts: {
          ...values.refundedProducts,
          [idx]: { checked: false, refundType: undefined, amount: undefined },
        },
      });
    }
  };

  if (!isRefundable && !orderDetail.isRefunded && !orderDetail.isRefundPending) {
    return (
      <Alert
        showIcon
        type="error"
        message={(
          <Title
            level={5}
            type="danger"
          >
            {t('COMPLAINT_REFUND_MODAL.UNREFUNDABLE_TITLE')}
          </Title>
        )}
        description={(
          <Text
            type="danger"
            strong
          >
            {t('COMPLAINT_REFUND_MODAL.UNREFUNDABLE')}
          </Text>
        )}
      />
    );
  }

  if (isRefundable && (orderDetail.isRefunded || orderDetail.isRefundPending || orderDetail?.returnId)) {
    return (
      <Alert
        showIcon
        type="error"
        message={(
          <Title
            level={5}
            type="danger"
          >
            {t('COMPLAINT_REFUND_MODAL.UNREFUNDABLE_TITLE')}
          </Title>
        )}
        description={(
          <Text
            type="danger"
            strong
          >
            {t('COMPLAINT_REFUND_MODAL.ALREADY_REFUNDED')}
          </Text>
        )}
      />
    );
  }

  return (
    <>
      <Form.Item noStyle shouldUpdate>
        {({ getFieldValue }) => (
          <>
            {(getSuggestedRefundSource() === BY_RESTAURANT || getFieldValue('isRefundApprovedByRestaurant') === false) && (
              <>
                <Divider />
                <Form.Item
                  rules={rules.isRestaurantReached}
                  label={<Title level={5}>{t('COMPLAINT_REFUND_MODAL.IS_RESTAURANT_REACHED')}</Title>}
                  name="isRestaurantReached"
                  labelCol={{ span: 8 }}
                  className={classes.errorMessageRight}
                  initialValue={params.get('isRestaurantReached') ? params.get('isRestaurantReached') === 'true' : undefined}
                >
                  <Radio.Group className={classes.fullWidth} onChange={handleIsRestaurantReachedChange}>
                    <Row justify="end">
                      <Col>
                        <Radio value>
                          {t('YES')}
                        </Radio>
                      </Col>
                      <Col>
                        <Radio value={false}>
                          {t('NO')}
                        </Radio>
                      </Col>
                    </Row>
                  </Radio.Group>
                </Form.Item>
                {getFieldValue('isRestaurantReached') === false && !isHighClientTrustScore && (
                <Alert
                  type="error"
                  message={t('COMPLAINT_REFUND_MODAL.IS_RESTAURANT_NOT_REACHED_INFO_TEXT')}
                  showIcon
                  icon={<InfoCircleFilled />}
                />
                )}
              </>
            )}
            {getFieldValue('isRestaurantReached') && (
            <Form.Item
              rules={rules.isRefundApprovedByRestaurant}
              label={<Title level={5}>{t('COMPLAINT_REFUND_MODAL.IS_REFUND_APPROVED_BY_RESTAURANT')}</Title>}
              name="isRefundApprovedByRestaurant"
              labelCol={{ span: 10 }}
              className={classes.errorMessageRight}
            >
              <Radio.Group className={classes.fullWidth} onChange={handleIsRefundApprovedByRestaurantChange}>
                <Row justify="end">
                  <Col>
                    <Radio value>
                      {t('YES')}
                    </Radio>
                  </Col>
                  <Col>
                    <Radio value={false}>
                      {t('NO')}
                    </Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
            )}
            {(
              typeof getFieldValue('isRefundApprovedByRestaurant') === 'boolean' ||
              getFieldValue('isRestaurantReached') === false || getSuggestedRefundSource() === BY_GETIR || !getSuggestedRefundSource()) && (
              <>
                <Divider />
                <Form.Item
                  rules={rules.refundSource}
                  label={<Title level={5}>{t('COMPLAINT_REFUND_MODAL.REFUND_SOURCE')}:</Title>}
                  name="refundSource"
                  shouldUpdate
                >
                  <Radio.Group optionType="button" buttonStyle="solid" onChange={handleRefundSourceChange}>
                    <Radio.Button value={BY_GETIR}>
                      {t('COMPLAINT_REFUND_MODAL.BY_GETIR')}
                    </Radio.Button>
                    <ShowTooltip
                      show={!isRestaurantRefundAvailable}
                      tooltipProps={{
                        title: t('COMPLAINT_REFUND_MODAL.UNREFUNDABLE_SOURCE'),
                        placement: 'top',
                      }}
                    >
                      <Radio.Button value={BY_RESTAURANT} disabled={!isRestaurantRefundAvailable}>
                        {t('COMPLAINT_REFUND_MODAL.BY_RESTAURANT')}
                      </Radio.Button>
                    </ShowTooltip>
                  </Radio.Group>
                </Form.Item>
                {refundSourceInfo && (
                <Alert
                  type={refundSourceInfo.type}
                  message={
                    <Text strong type={refundSourceInfo.type}>{refundSourceInfo.text}</Text>
                  }
                  showIcon
                  icon={<InfoCircleFilled />}
                />
                )}
                <Form.Item
                  rules={rules.refundDescription}
                  name="refundDescription"
                  initialValue={params.get('refundDescription')}
                >
                  <Input.TextArea
                    placeholder={t('COMPLAINT_REFUND_MODAL.DESCRIPTION')}
                    showCount
                    maxLength={DESCRIPTION_MAX_LENGTH}
                  />
                </Form.Item>
              </>
            )}
          </>
        )}
      </Form.Item>
      <Divider />
      <Form.Item name="refundType" label={<Title level={5}>{t('COMPLAINT_REFUND_MODAL.REFUND_TYPE')}:</Title>} rules={rules.refundType}>
        <Radio.Group className={classes.refundRadioInput} onChange={handleRefundTypeChange} value={refundType}>
          <Can permKey={permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_COMPLAINT_REFUND_MODAL_FULL_REFUND}>
            <Radio value={FULL_REFUND}>{t('COMPLAINT_REFUND_MODAL.FULL_REFUND')}</Radio>
          </Can>
          <Can permKey={permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_COMPLAINT_REFUND_MODAL_PARTIAL_REFUND}>
            <Radio value={PARTIAL_REFUND}>{t('COMPLAINT_REFUND_MODAL.PARTIAL_REFUND')}</Radio>
          </Can>
        </Radio.Group>
      </Form.Item>
      {refundType && (
        <div className={classes.refundSection}>
          <Form.Item
            rules={rules.refundedProducts}
            name="refundedProducts"
            label={<Title level={5}>{t('COMPLAINT_REFUND_MODAL.REFUNDED_PRODUCTS')}:</Title>}
          >
            {products?.map((product, idx) => (
              <Form.Item
                key={product?._id}
                noStyle
                shouldUpdate={(prevValues, currValues) => prevValues?.refundedProducts?.[idx]?.checked !== currValues?.refundedProducts?.[idx]?.checked
                  || prevValues?.refundedProducts?.[idx]?.refundType !== currValues?.refundedProducts?.[idx]?.refundType}
              >
                {({ getFieldValue }) => (
                  <>
                    <Form.Item
                      valuePropName="checked"
                      className={classes.refundChecked}
                      name={['refundedProducts', idx, 'checked']}
                    >
                      <Checkbox
                        onChange={e => handleProductCheckedChange(e, idx)}
                        disabled={refundType === FULL_REFUND}
                      >
                        {`${get(product, ['name', getLangKey()])} (${currency()}${product.discountedPriceWithOption})`}
                      </Checkbox>
                    </Form.Item>
                    <Row>
                      <Form.Item
                        rules={getFieldValue(['refundedProducts', idx, 'checked']) && rules.productRefundType}
                        className={classes.refundTypeSection}
                        name={['refundedProducts', idx, 'refundType']}
                      >
                        <Radio.Group>
                          <Radio
                            disabled={refundType === FULL_REFUND || !getFieldValue(['refundedProducts', idx, 'checked'])}
                            value={FULL_REFUND}
                          >
                            {t('COMPLAINT_REFUND_MODAL.FULL_REFUND')}
                          </Radio>
                          <Can permKey={permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_COMPLAINT_REFUND_MODAL_IN_PRODUCT_REFUND}>
                            <Radio
                              disabled={refundType === FULL_REFUND || !getFieldValue(['refundedProducts', idx, 'checked'])}
                              value={IN_PRODUCT_REFUND}
                            >
                              {t('COMPLAINT_REFUND_MODAL.IN_PRODUCT_REFUND')}
                            </Radio>
                          </Can>
                        </Radio.Group>
                      </Form.Item>
                      {getFieldValue(['refundedProducts', idx, 'refundType']) === IN_PRODUCT_REFUND && (
                        <div className={classes.partialRefundAmount}>
                          <Form.Item
                            name={['refundedProducts', idx, 'amount']}
                            rules={rules.productAmount(Number((product.discountedPriceWithOption / 2).toFixed(2)))}
                            label={t('COMPLAINT_REFUND_MODAL.IN_PRODUCT_REFUND_AMOUNT')}
                          >
                            <InputNumber
                              controls={false}
                              step="0.00"
                              placeholder="0.00"
                              precision={2}
                              prefix={currency()}
                            />
                          </Form.Item>
                          <Text className={classes.maxAmountInfo}>
                            {t('COMPLAINT_REFUND_MODAL.MAX_REFUND_AMOUNT', {
                              max: numberFormat({ minDecimal: 2 }).format(Number((product.discountedPriceWithOption / 2).toFixed(2))),
                              currency: currency(),
                            })}
                          </Text>
                        </div>
                      )}
                    </Row>
                  </>
                )}
              </Form.Item>
            ))}
          </Form.Item>
        </div>
      )}
    </>
  );
};

export default RefundSection;
