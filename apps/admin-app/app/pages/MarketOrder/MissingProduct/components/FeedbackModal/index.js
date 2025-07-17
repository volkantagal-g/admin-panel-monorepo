import { useDispatch, useSelector } from 'react-redux';
import {
  Checkbox,
  Col,
  Divider,
  Form,
  Radio,
  Row,
  Space,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useEffect, useMemo } from 'react';

import {
  validationSchema,
  getInitialValues,
  fillDiscountParams,
  getFeedbackPayload,
  missingProductStatusMap,
  getBasketProductsMap,
  populateMissingProductsWithBasketInfo,
} from './formHelper';
import { Creators } from '../../redux/actions';
import { Creators as MarketOrderCreators } from '@app/pages/MarketOrder/OrderDetail/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { currency, isNullOrEmpty } from '@shared/utils/common';
import useStyles from './styles';
import {
  getMarketOrderSelector,
  getMissingProductOrdersSelector,
} from '../../redux/selectors';
import { getLangKey } from '@shared/i18n';
import AntInputNumber from '@shared/components/UI/AntInputNumber';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { SelectWrapper } from '@shared/components/UI/Form';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';
import Config from '@shared/config/env';
import {
  CALLER_TYPES,
  CLIENT_FEEDBACK_SOURCE_TYPE_WAREHOUSE,
} from '@shared/shared/constants';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getTableColumns } from './config';
import { MISSING_PRODUCTS_STATUSES } from '../../constants';
import { currencyFormat } from '@shared/utils/localization';
import { Button, Modal, TextArea } from '@shared/components/GUI';
import { MARKET_ORDER_FEEDBACK_SOURCE } from '@app/pages/MarketOrder/OrderDetail/constants';

const { Text } = Typography;

const FeedbackModal = ({ marketOrderId, isModalOpen, onCloseModal }) => {
  const {
    isCancelled,
    hasDiscount,
    isProductsRefund,
    unableToReachToCustomer,
  } = MISSING_PRODUCTS_STATUSES;
  const countries = useSelector(countriesSelector.getData);
  const { t } = useTranslation('missingProductOrdersPage');
  const dispatch = useDispatch();
  const missingProducts = useSelector(getMissingProductOrdersSelector.getData);
  const orderDetail = missingProducts?.find(
    order => order?._id === marketOrderId,
  );
  const { _id: orderId, domainType, client } = orderDetail || {};
  const [form] = Form.useForm();
  const classes = useStyles();
  const { canAccess } = usePermission();
  const marketOrder = useSelector(getMarketOrderSelector.getData) ?? {};
  const isOrderLoading = useSelector(getMarketOrderSelector.getIsPending) ?? {};
  const { basket, countryCode, country } = marketOrder;
  const { bundleProducts, products: basketProducts } = basket ?? {};

  const basketProductsMap = useMemo(
    () => getBasketProductsMap(basketProducts),
    [basketProducts],
  );

  const products = useMemo(
    () => populateMissingProductsWithBasketInfo(
      orderDetail?.missingProducts ?? [],
      basketProductsMap,
      bundleProducts,
    ),
    [basketProductsMap, orderDetail?.missingProducts, bundleProducts],
  );

  const initialValues = useMemo(
    () => getInitialValues({
      ...orderDetail,
      countryCode,
      selectedCountryId: country?._id,
      missingProductAmount: products?.reduce(
        (sum, product) => (sum + (product?.basketTotalAmount || 0)),
        0,
      ),
    }),
    [orderDetail, countryCode, country, products],
  );

  const { format: currencyFormatter } = currencyFormat({ maxDecimal: 4 });
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: formValues => {
      onSubmit(formValues);
    },
  });

  const { handleSubmit, values, setFieldValue } = formik;

  useEffect(() => {
    if (orderId) {
      dispatch(Creators.getMarketOrderRequest({ domainType, id: orderId }));
    }
  }, [orderId, domainType, dispatch]);

  const columns = useMemo(
    () => getTableColumns({ t, currencyFormatter }),
    [t, currencyFormatter],
  );
  const partialRefundProducts = products?.map(
    ({ product: productId, count, orderCount, weightInfo } = {}) => ({
      isWillBeAddedToStock: false,
      productId,
      count: weightInfo ? orderCount : count,
    }),
  );

  const { missingProductStatus } = values;
  const performRefund =
    missingProductStatus === isProductsRefund ||
    missingProductStatus === unableToReachToCustomer;

  const onUpdateMissingProductStatus = () => {
    dispatch(
      Creators.updateMissingProductStatusRequest({
        status: missingProductStatusMap[missingProductStatus],
        orderId,
        domainType,
      }),
    );
  };

  const onSuccessfulRefund = feedbackPayload => {
    dispatch(
      MarketOrderCreators.createMarketOrderFeedbackRequest({ data: feedbackPayload }),
    );
    onUpdateMissingProductStatus();
  };

  const onSuccessfulDiscount = (feedbackPayload, discountCode) => {
    dispatch(
      MarketOrderCreators.createMarketOrderFeedbackRequest({
        data: {
          ...feedbackPayload,
          discountCode,
        },
      }),
    );
    onUpdateMissingProductStatus();
  };

  function onSubmit(payload) {
    if (!missingProductStatus) {
      return dispatch(
        ToastCreators.error({ message: t('FEEDBACK.MISSING_ACTION_STATUS') }),
      );
    }
    const params = {
      ...payload,
      hasDiscount: missingProductStatus === hasDiscount,
      isProductsRefund: missingProductStatus === isProductsRefund,
      unableToReachToCustomer: missingProductStatus === unableToReachToCustomer,
      isCancelled: missingProductStatus === isCancelled,
      products,
    };
    if (isNullOrEmpty(params.note)) {
      return dispatch(
        ToastCreators.error({ message: t('FEEDBACK.ERR_EMPTY') }),
      );
    }
    const feedbackPayload = getFeedbackPayload(orderDetail, params);
    if (performRefund) {
      if (params.unableToReachToCustomer) {
        params.isProductsRefund = true;
      }

      const refundParams = {
        orderId,
        domainType,
        refundBagFee: params.refundBagFee,
        refundDeliveryFee: params.refundDeliveryFee,
        products: partialRefundProducts,
      };
      dispatch(
        Creators.orderPartialRefundRequest({
          ...refundParams,
          onSuccess: () => {
            onSuccessfulRefund(feedbackPayload);
          },
        }),
      );
    }
    else if (params.hasDiscount) {
      const discountParams = fillDiscountParams({ ...params, countryCode });
      dispatch(
        MarketOrderCreators.createPromoRequest({
          data: {
            ...discountParams,
            client: client?._id ?? marketOrder?.client?.client?._id,
            domainTypes: [orderDetail.domainType],
            onSuccess: discountResponse => {
              onSuccessfulDiscount(feedbackPayload, discountResponse._id);
            },
          },
        }),
      );
    }
    else if (params.isCancelled) {
      dispatch(
        MarketOrderCreators.cancelOrderRequest({
          domainType,
          id: orderDetail._id,
          reasonId: Config.MISSING_PRODUCT_REASON_ID,
          callerType: CALLER_TYPES.ADMIN,
          note: values.note,
        }),
      );
    }
    return handleCancel();
  }

  function handleCancel() {
    formik.resetForm();
    form.resetFields();
    onCloseModal();
  }

  const updateMissingProductStatus = ({ target }) => {
    const { value } = target;
    if (
      value === hasDiscount &&
      !canAccess(permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_CS_ACTIONS)
    ) {
      return;
    }
    setFieldValue('missingProductStatus', target.value);
  };

  const countryOptions = useMemo(() => {
    return countries.map(city => {
      return { value: city._id, label: city.name[getLangKey()] };
    });
  }, [countries]);

  const { deliveryFeeRefundStatus, bagFeeRefundStatus } = marketOrder;
  const refundCategoryMap = MARKET_ORDER_FEEDBACK_SOURCE.map(reason => {
    const isWarehouseId = reason.id === CLIENT_FEEDBACK_SOURCE_TYPE_WAREHOUSE;
    return {
      label: reason?.[getLangKey()],
      disabled: !isWarehouseId,
      color:
        isWarehouseId
          ? 'primary'
          : 'default',
    };
  });

  return (
    <Modal
      title={t('FEEDBACK.TITLE')}
      data-testid="missing-product-order-modal"
      visible={isModalOpen}
      onOk={() => handleCancel()}
      onCancel={() => handleCancel()}
      width={750}
      footer={[
        <Button
          key="submit"
          type="primary"
          form="missing-product-order-modal"
          htmlType="submit"
          size="small"
          disabled={isOrderLoading}
        >
          {t('button:SAVE')}
        </Button>,
        <Button
          size="small"
          key="back"
          color="default"
          onClick={() => handleCancel()}
        >
          {t('button:CANCEL')}
        </Button>,
      ]}
    >
      <Form
        form={form}
        id="missing-product-order-modal"
        data-testid="modal-form"
        onFinish={handleSubmit}
        colon={false}
        labelCol={{ span: 10 }}
        labelAlign="left"
      >
        <Row className="w-100">
          <Col span={24}>
            <Space>
              {refundCategoryMap.map(({ label, disabled, color }) => (
                <Button
                  disabled={disabled}
                  key={label}
                  className={classes.buttonStyle}
                  color={color}
                >
                  {label}
                </Button>
              ))}
            </Space>
            <Divider />
          </Col>
          <Col span={24}>
            <Button>{t('FEEDBACK.MISSING_OR_WRONG_PRODUCT')}</Button>
            <Divider />
          </Col>
          <Col span={24}>
            <Button>{t('FEEDBACK.MISSING_PRODUCT')}</Button>
            <Divider />
          </Col>
          <Col span={24}>
            <TextArea
              value={values.note}
              onChange={event => {
                setFieldValue('note', event.target.value);
              }}
              placeholder={t('global:NOTE')}
            />
            <Divider />
          </Col>
          <Col span={24}>
            <Radio.Group
              onChange={updateMissingProductStatus}
              value={values.missingProductStatus}
            >
              <Space direction="vertical">
                <Radio value={hasDiscount}>{t('global:DISCOUNT')}</Radio>
                <Radio value={isProductsRefund}>{t('FEEDBACK.REFUND')}</Radio>
                <Radio value={isCancelled}>{t('global:CANCEL')}</Radio>
                <Radio value={unableToReachToCustomer}>
                  {t('FEEDBACK.UNABLE_TO_REACH')}
                </Radio>
              </Space>
            </Radio.Group>
            <Divider />
          </Col>
          <Col span={24}>
            <AntTableV2
              size="middle"
              data={products}
              columns={columns}
              loading={isOrderLoading}
              data-testid="products-table"
            />
            {values.missingProductStatus === hasDiscount && (
              <div data-testid="discount-section">
                <Form.Item label={t('global:COUNTRY')}>
                  <SelectWrapper
                    placeholder={t('global:COUNTRY')}
                    optionsData={countryOptions}
                    optionLabelProp="label"
                    value={values.selectedCountryId}
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: '5px' }}
                  label={t('FEEDBACK.DISCOUNT_AMOUNT')}
                  name="discountAmount"
                >
                  <AntInputNumber
                    className="w-100"
                    disabled
                    defaultValue={values.discountAmount}
                    value={values.discountAmount}
                    onChange={value => {
                      setFieldValue('discountAmount', value);
                    }}
                    addonAfter={currency()}
                    min={0}
                  />
                </Form.Item>
                <Form.Item label={t('FEEDBACK.EXPIRE')} name="validDayAmount">
                  <AntInputNumber
                    className="w-100"
                    addonAfter={t('global:DAY')}
                    defaultValue={values.validDayAmount}
                    value={values.validDayAmount}
                    onChange={value => {
                      setFieldValue('validDayAmount', value);
                    }}
                    min={0}
                  />
                </Form.Item>

                <MultiLanguageInput
                  label={t('global:TITLE')}
                  fieldPath={['title']}
                  formik={formik}
                />
                <Form.Item
                  label={t('FEEDBACK.DISCOUNT_PARTIAL')}
                  name="isBalanceEnabled"
                >
                  <Checkbox
                    checked={values.isBalanceEnabled}
                    onChange={event => {
                      setFieldValue('isBalanceEnabled', event.target.checked);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label={t('FEEDBACK.DO_NOT_CHARGE_DELIVERY_FEE')}
                  name="doNotChargeDeliveryFee"
                >
                  <Checkbox
                    checked={values.doNotChargeDeliveryFee}
                    onChange={event => {
                      const doNotChargeDeliveryFee = event.target.checked;
                      setFieldValue(
                        'doNotChargeDeliveryFee',
                        doNotChargeDeliveryFee,
                      );
                    }}
                  />
                </Form.Item>
                <Form.Item
                  labelAlign="left"
                  label={t('FEEDBACK.DO_NOT_APPLY_MINIMUM_BASKET_SIZE')}
                  name="doNotApplyMinimumBasketSize"
                >
                  <Checkbox
                    checked={values.doNotApplyMinimumBasketSize}
                    onChange={event => {
                      setFieldValue(
                        'doNotApplyMinimumBasketSize',
                        event.target.checked,
                      );
                    }}
                    autoComplete="off"
                  />
                </Form.Item>
                <Form.Item
                  label={t('FEEDBACK.SEND_NOTIF')}
                  name="sendNotification"
                >
                  <Checkbox
                    disabled
                    checked={values.sendNotification}
                    onChange={event => {
                      setFieldValue('sendNotification', event.target.checked);
                    }}
                    autoComplete="off"
                  />
                </Form.Item>
              </div>
            )}
            {values.missingProductStatus === isProductsRefund && (
              <div data-testid="refund-section">
                <Form.Item
                  label={t('FEEDBACK.REFUND_BAG_FEE')}
                  name="refundBagFee"
                  labelAlign="left"
                >
                  <Checkbox
                    disabled={bagFeeRefundStatus?.isRefunded}
                    checked={values.refundBagFee}
                    onChange={event => {
                      setFieldValue('refundBagFee', event.target.checked);
                    }}
                  />
                  {bagFeeRefundStatus?.isRefunded && (
                    <Text style={{ marginLeft: 2 }} type="success">
                      {t('FEEDBACK.ALERT_FULLY_REFUNDED')}
                    </Text>
                  )}
                </Form.Item>
                <Form.Item
                  label={t('FEEDBACK.REFUND_DELIVERY_FEE')}
                  name="refundDeliveryFee"
                  labelAlign="left"
                >
                  <Checkbox
                    disabled={deliveryFeeRefundStatus?.isRefunded}
                    checked={values.refundDeliveryFee}
                    onChange={event => {
                      setFieldValue('refundDeliveryFee', event.target.checked);
                    }}
                  />
                  {deliveryFeeRefundStatus?.isRefunded && (
                    <Text style={{ marginLeft: 2 }} type="success">
                      {t('FEEDBACK.ALERT_FULLY_REFUNDED')}
                    </Text>
                  )}
                </Form.Item>
              </div>
            )}
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FeedbackModal;
