import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Input, Checkbox, Row, Col, InputNumber } from 'antd';
import moment from 'moment';

import { useTranslation } from 'react-i18next';

import { formatDate } from '@shared/utils/dateHelper';

import GroupReasons from '../components/GroupReasons';
import FormRow from '../components/FormRow';
import FormColumn from '../components/FormColumn';
import DiscountInput from '../components/DiscountInput';

import {
  getDiscountTitleFromAmount,
  getSelectedCountry,
} from '../formHelper';
import useStyles from './styles';
import { currency as getCurrentUserCurrency } from '@shared/utils/common';
import {
  DEFAULT_DISCOUNT_AMOUNT,
  DISCOUNT_OPTIONS,
  MAX_DISCOUNT_AMOUNT,
  MAX_DISCOUNT_EXPIRY_DAYS,
} from '../../../constants';
import { getDiscountWarnConfigSelector } from '@app/pages/MarketOrder/OrderDetail/redux/selectors';
import { Creators } from '@app/pages/MarketOrder/OrderDetail/redux/actions';

const getUpdatedTargetValue = (formValues, keyName, value) => {
  const [parentKeyName, childKeyName] = keyName.split('.');
  if (!childKeyName) return { [keyName]: value };
  return {
    [parentKeyName]: {
      ...formValues[childKeyName],
      [childKeyName]: value,
    },
  };
};

const getUpdatedTitleTexts = (keyName, amount, orderCurrency) => {
  if (keyName !== 'discountAmount') return {};
  return {
    title: {
      ...getDiscountTitleFromAmount({
        orderCurrency,
        amount,
      }),
    },
  };
};

const getUpdatedDeliveryFee = (keyName, value, defaultDeliveryFee) => {
  if (keyName !== 'deliveryFee.doNotCharge') return {};
  if (!value) {
    return {
      deliveryFee: {
        doNotCharge: value,
        amount: defaultDeliveryFee,
      },
    };
  }
  return {
    deliveryFee: {
      doNotCharge: value,
      amount: null,
    },
  };
};

const formatFloatNumber = (value, defaultValue = 0.00) => (Number.isFinite(Number(value)) ? parseFloat(value).toFixed(2) : defaultValue);
const formatIntegerNumber = (value, defaultValue = 180) => (Number.isFinite(value) ? parseInt(value, 10) : defaultValue);

const InputBoxSuffix = ({ symbol, className }) => (
  <div className={className}>{symbol}</div>
);

const DiscountFlow = ({
  isFeedbackDetails,
  feedbackFormValues,
  handleDiscountForm,
  orderDetail,
  formErrors = {},
}) => {
  const {
    deliveryFeeRefundStatus,
    financial,
    currency: currencyDetails,
    basket,
    countryCode,
  } = orderDetail;
  const { discount: formValues, hasDiscount } = feedbackFormValues;
  const dispatch = useDispatch();

  const maxDiscountAmount =
    basket?.calculation?.totalAmount || MAX_DISCOUNT_AMOUNT;
  const classes = useStyles();
  const { t } = useTranslation('marketOrderPage');
  const orderCurrency = currencyDetails?.symbol || getCurrentUserCurrency();
  const deliveryFeeRefunded = deliveryFeeRefundStatus?.isRefunded;
  const deliveryFeeAmount = financial?.deliveryFee;

  const allDiscountWarnAmounts = useSelector(getDiscountWarnConfigSelector.getData);
  const discountWarnAmount = allDiscountWarnAmounts?.customValue?.[countryCode] || allDiscountWarnAmounts?.value;

  useEffect(() => {
    if (hasDiscount && !isFeedbackDetails) {
      dispatch(Creators.getDiscountWarnConfigRequest());
    }
  }, [dispatch, hasDiscount, isFeedbackDetails]);

  const setDiscountFieldValue = (keyName, targetValue) => {
    return handleDiscountForm('discount', {
      ...formValues,
      ...getUpdatedTargetValue(formValues, keyName, targetValue),
      ...getUpdatedTitleTexts(keyName, targetValue, orderCurrency),
      ...getUpdatedDeliveryFee(keyName, targetValue, deliveryFeeAmount),
    });
  };

  const handleCheckbox = ({ target }) => setDiscountFieldValue(target.name, target.checked);
  const getExpiryDate = expiryDays => formatDate(moment().add(expiryDays, 'days'), 'Do MMMM, YYYY');

  return (
    <>
      <GroupReasons
        key="discount-section"
        title={t('AGENT_ACTIONS.MODAL.DISCOUNT.TITLE')}
        isFeedbackDetails={isFeedbackDetails}
        reasonMessageInfo={isFeedbackDetails && feedbackFormValues.discountCode ? (
          <div
            className={`${classes.title} ${classes.infoText} ${classes.discountReasonMessage}`}
            data-testid="discount-expiry-days-info"
          >
            <a
              target="_blank"
              href={`/personalPromo/detail/${feedbackFormValues.discountCode}`}
              rel="noreferrer"
              className={classes.discountLink}
            >
              {`${t('global:DISCOUNT')} `}
            </a>
            was added with this feedback
          </div>
        ) : null}
        handleRadioChange={refundTypeSelected => {
          handleDiscountForm(
            'hasDiscount',
            refundTypeSelected === DISCOUNT_OPTIONS[0]?.id,
          );
        }}
        reasons={DISCOUNT_OPTIONS}
        selected={hasDiscount ? DISCOUNT_OPTIONS[0]?.id : null}
      />
      {hasDiscount && !isFeedbackDetails && (
        <div data-testid="discount-form-container">

          <Row className={classes.formContainer}>
            <FormRow>
              <FormColumn
                formLabelComponent={(
                  <div className={classes.infoTextContainer}>
                    <div className={classes.title}>
                      {t('AGENT_ACTIONS.MODAL.DISCOUNT.COUNTRY')}
                    </div>
                    <div
                      className={`${classes.title} ${classes.infoText}`}
                      data-testid="discount-country-info"
                    >
                      {t(
                        'AGENT_ACTIONS.MODAL.DISCOUNT.ORDER_COUNTRY',
                      )}
                    </div>
                  </div>
                )}
                formInputComponent={(
                  <Input
                    type="text"
                    name="countryCode"
                    data-testid="discount-country-input"
                    value={getSelectedCountry(formValues.countryCode)}
                    width="100%"
                    disabled
                  />
                )}
              />
              <Col span={2} />
              <FormColumn
                formLabelComponent={(
                  <div className={classes.infoTextContainer}>
                    <div className={classes.title}>
                      {t('AGENT_ACTIONS.MODAL.DISCOUNT.AMOUNT')}
                    </div>
                    <div
                      className={`${classes.title} ${classes.infoText}`}
                      data-testid="discount-amount-info"
                    >
                      {`${t(
                        'AGENT_ACTIONS.MODAL.DISCOUNT.MAX_AMOUNT_MESSAGE',
                      )}${orderCurrency}${maxDiscountAmount}`}
                    </div>
                  </div>
                )}
                formInputComponent={(
                  <DiscountInput
                    classes={classes}
                    addonAfter={(
                      <InputBoxSuffix
                        symbol={orderCurrency}
                        className={classes.inputSuffix}
                      />
                    )}
                    handleInputChange={value => setDiscountFieldValue(
                      'discountAmount',
                      formatFloatNumber(value, DEFAULT_DISCOUNT_AMOUNT),
                    )}
                    orderCurrency={orderCurrency}
                    maxDiscountAmount={maxDiscountAmount}
                    defaultAmount={DEFAULT_DISCOUNT_AMOUNT}
                    discountAmount={formValues.discountAmount}
                    discountWarnAmount={discountWarnAmount || maxDiscountAmount}
                  />
                )}
              />
            </FormRow>

            <FormRow className={classes.formRow}>
              <FormColumn
                formLabelComponent={(
                  <div className={classes.infoTextContainer}>
                    <div className={classes.title}>
                      {t('AGENT_ACTIONS.MODAL.DISCOUNT.EXPIRY')}
                    </div>
                    <div
                      className={`${classes.title} ${classes.infoText}`}
                      data-testid="discount-expiry-days-info"
                    >
                      {`${t(
                        'AGENT_ACTIONS.MODAL.DISCOUNT.EXPIRY_DATE',
                      )}${getExpiryDate(formValues.validDayAmount)}`}
                    </div>
                  </div>
                )}
                formInputComponent={(
                  <InputNumber
                    className={classes.inputNumber}
                    addonAfter={(
                      <InputBoxSuffix
                        symbol="Days"
                        className={classes.inputSuffix}
                      />
                    )}
                    type="number"
                    data-testid="discount-expiry-days"
                    min={0}
                    max={MAX_DISCOUNT_EXPIRY_DAYS}
                    value={formValues.validDayAmount}
                    name="validDayAmount"
                    width="100%"
                    disabled={false}
                    onChange={value => setDiscountFieldValue('validDayAmount', formatIntegerNumber(value))}
                  />
                )}
              />
              <Col span={2} />
              <FormColumn
                formLabelComponent={(
                  <div className={classes.infoTextContainer}>
                    <div className={classes.title}>
                      {t('AGENT_ACTIONS.MODAL.DISCOUNT.DELIVERY_FEE')}
                      {formErrors['discount.deliveryFee.amount'] && (
                        <span className={classes.requiredField}>
                          ({t('AGENT_ACTIONS.MODAL.REQUIRED_FIELD')})
                        </span>
                      )}
                    </div>
                    {deliveryFeeAmount > 0 ? (
                      <div
                        className={`${classes.title} ${classes.infoText}`}
                        data-testid="discount-deliver-fee-amount-info"
                      >
                        {`${t(
                          'AGENT_ACTIONS.MODAL.DISCOUNT.DELIVERY_FEE_INFO',
                        )}${orderCurrency}${deliveryFeeAmount} `}
                        {deliveryFeeRefunded
                          ? t(
                            'AGENT_ACTIONS.MODAL.DISCOUNT.DELIVERY_FEE_REFUNDED',
                          )
                          : ''}
                      </div>
                    ) : (
                      <div
                        className={`${classes.title} ${classes.infoText}`}
                        data-testid="discount-deliver-fee-amount-info"
                      >
                        {t(
                          'AGENT_ACTIONS.MODAL.DISCOUNT.DELIVERY_FEE_NOT_CHARGED',
                        )}
                      </div>
                    )}
                  </div>
                )}
                formInputComponent={(
                  <InputNumber
                    className={classes.inputNumber}
                    addonAfter={(
                      <InputBoxSuffix
                        symbol={orderCurrency}
                        className={classes.inputSuffix}
                      />
                    )}
                    step=".01"
                    data-testid="discount-delivery-fee-amount"
                    min={0}
                    max={maxDiscountAmount}
                    value={formValues.deliveryFee.amount}
                    name="deliveryFee.amount"
                    width="100%"
                    disabled={formValues.deliveryFee.doNotCharge}
                    onChange={value => setDiscountFieldValue(
                      'deliveryFee.amount',
                      formatFloatNumber(value, deliveryFeeAmount),
                    )}
                  />
                )}
              />
            </FormRow>

            <FormRow className={classes.formRow}>
              <FormColumn
                formLabelComponent={(
                  <span className={classes.title}>
                    {t('AGENT_ACTIONS.MODAL.DISCOUNT.TITLE_EN')}
                  </span>
                )}
                formInputComponent={(
                  <Input
                    type="text"
                    data-testid="discount-amount-title-en"
                    defaultValue={getDiscountTitleFromAmount({
                      currency: orderCurrency,
                      amount: formValues.discountAmount || 0,
                      language: 'en',
                    })}
                    value={formValues.title?.en}
                    width="100%"
                    disabled
                    name="title.en"
                  />
                )}
              />
              <Col span={2} />
              <FormColumn
                formLabelComponent={(
                  <span className={classes.title}>
                    {t('AGENT_ACTIONS.MODAL.DISCOUNT.TITLE_TR')}
                  </span>
                )}
                formInputComponent={(
                  <Input
                    type="text"
                    data-testid="discount-amount-title-tr"
                    defaultValue={getDiscountTitleFromAmount({
                      currency: orderCurrency,
                      amount: formValues.discountAmount || 0,
                      language: 'tr',
                    })}
                    value={formValues.title?.tr}
                    width="100%"
                    disabled
                    name="title.tr"
                  />
                )}
              />
            </FormRow>

            <FormRow className={classes.formRow}>
              <Checkbox
                data-testid="discount-delivery-fee"
                onChange={handleCheckbox}
                name="deliveryFee.doNotCharge"
                checked={formValues.deliveryFee.doNotCharge}
              >
                <span className={classes.feeLabel}>
                  {t('AGENT_ACTIONS.MODAL.DISCOUNT.DELIVERY_FEE_CHECKBOX')}
                </span>
              </Checkbox>
            </FormRow>

            <FormRow className={classes.formRow}>
              <Checkbox
                data-testid="discount-do-not-apply-minimum-basket-size"
                onChange={handleCheckbox}
                name="doNotApplyMinimumBasketSize"
                checked={formValues.doNotApplyMinimumBasketSize}
              >
                <span className={classes.feeLabel}>
                  {t('AGENT_ACTIONS.MODAL.DISCOUNT.BASKET_SIZE')}
                </span>
              </Checkbox>
            </FormRow>
          </Row>
        </div>
      )}
    </>
  );
};

export default DiscountFlow;
