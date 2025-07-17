import { useEffect, useMemo, useState } from 'react';
import { Form, Row, Col, Spin, Radio as RadioAntd } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment-timezone';

import { useTheme } from 'react-jss';

import { Creators } from '../../../redux/actions';

import { canSubmit } from '@shared/utils/formHelper';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { getCountryRestrictedDomainTypeOptions } from '@app/pages/MarketProduct/utils';
import {
  NUMBER_INPUT_STEPS,
  PRECISON_VALUES,
  SELLING_PRICE_TYPES,
} from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/constants';
import ProductWarehousePrice from '@app/pages/MarketProduct/Pricing/Detail/components/ProductWarehousePrice';
import ProductWastePrice from '@app/pages/MarketProduct/Pricing/Detail/components/ProductWastePrice';
import { SELLING_PRICE_TYPE_NAMES, UPDATE_REQUEST_TYPES } from '@app/pages/MarketProduct/Pricing/constants';

import {
  getMarketProductPriceDetailSelector,
  updateMarketProductPriceSelector,
  updateMarketProductDiscountedPriceSelector,
} from '@app/pages/MarketProduct/Pricing/redux/selector';

import {
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit,
  handleObjectStructure, validationSchema,
} from '@app/pages/MarketProduct/Pricing/Detail/components/GeneralInfo/formHelper';
import { EditSaveCancelButtons, NumberInput, Select, Space, Checkbox, PercentageInput, Radio } from '@shared/components/GUI';
import useStyles from './styles';
import { usePrevious } from '@shared/hooks';
import { getStruckPriceSupporterOptions } from '@app/pages/MarketProduct/commonFormHelper';
import { validate } from '@shared/yup';
import { RangePicker } from '@shared/components/GUI/RangePicker';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { ROUTE } from '@app/routes';
import { MARKET_PRODUCT_SUPPORT_TYPE, STRUCK_PRICE_SUPPORTER_TYPE } from '@shared/shared/constants';

const GeneralInfo = () => {
  const [isFormEditable, setIsFormEditable] = useState(false);
  const formId = 'market-product-pricing-detail';

  const { t } = useTranslation('marketProductPricingPage');
  const countryCode = useSelector(getSelectedCountryV2).code.alpha2;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { id } = useParams();
  const classes = useStyles();
  const theme = useTheme();

  const data = useSelector(getMarketProductPriceDetailSelector.getData);
  const isPending = useSelector(getMarketProductPriceDetailSelector.getIsPending);
  const isUpdatePricePending = useSelector(updateMarketProductPriceSelector.getIsPending);
  const isUpdateDiscountedPricePending = useSelector(updateMarketProductDiscountedPriceSelector.getIsPending);
  const isUpdatePending = isUpdatePricePending || isUpdateDiscountedPricePending;
  const updatePriceError = useSelector(updateMarketProductPriceSelector.getError);
  const updateDiscountedPriceError = useSelector(updateMarketProductDiscountedPriceSelector.getError);
  const updateError = updatePriceError || updateDiscountedPriceError;
  const prevIsUpdatePending = usePrevious(isUpdatePending);

  const initialValues
    = useMemo(
      () => getInitialValues(data),
      [data],
    );

  const [supportRateDisabled, setSupportRateDisabled] = useState(false);
  const [supportType, setSupportType] = useState(MARKET_PRODUCT_SUPPORT_TYPE.PERCENT);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validate: validate(validationSchema, { initialValues, supportType }),
    onSubmit: values => {
      const modifiedValues = getOnlyModifiedValuesBeforeSubmit({ initialValues, values });
      const { requestType, ...body } = handleObjectStructure(
        { ...modifiedValues },
        initialValues?.pricingType,
        initialValues?.isDiscounted,
        initialValues,
      );
      if (requestType === UPDATE_REQUEST_TYPES.NORMAL_PRICE) {
        return dispatch(Creators.updateMarketProductPriceRequest({ body: { ...body, priceId: id }, page: ROUTE.MARKET_PRODUCT_PRICING_LIST.path }));
      }
      return dispatch(Creators.updateMarketProductDiscountedPriceRequest({
        body:
          { ...body, discountedPriceId: id },
        page: ROUTE.MARKET_PRODUCT_PRICING_LIST.path,
      }));
    },
  });
  const {
    values,
    setFieldValue,
    setValues,
    handleSubmit,
  } = formik;

  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
    [initialValues, values],
  );

  const handleCancelClick = () => {
    setIsFormEditable(false);
    setValues(initialValues);
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleFormValueChange = (target, value) => {
    setFieldValue(target, value);
    if (target === 'discountedProvider' && value) {
      if ((value === STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER.toString() ||
        value === STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY.toString())) {
        setFieldValue('supportRate', undefined);
        setSupportRateDisabled(false);
      }
      else {
        setFieldValue('supportRate', 0);
        setSupportRateDisabled(true);
      }
    }
  };

  const handleOptionChange = ({ target: { value } }) => {
    setSupportType(value);
    if (value === MARKET_PRODUCT_SUPPORT_TYPE.PERCENT) {
      setFieldValue('showAsAmount', false);
    }
    else {
      setFieldValue('showAsAmount', true);
    }
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  useEffect(() => {
    setSupportType(data?.financials?.isAmount === true ? MARKET_PRODUCT_SUPPORT_TYPE.AMOUNT : MARKET_PRODUCT_SUPPORT_TYPE.PERCENT);
  }, [data?.financials?.isAmount]);

  useEffect(() => {
    setSupportRateDisabled(!(initialValues?.discountedProvider === STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER.toString() ||
      initialValues?.discountedProvider === STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY.toString()));
  }, [initialValues?.discountedProvider]);

  useEffect(() => {
    if ((prevIsUpdatePending && !isUpdatePending)) {
      if (updateError) {
        setValues(initialValues);
        setSupportType(initialValues?.isAmount ? MARKET_PRODUCT_SUPPORT_TYPE.AMOUNT : MARKET_PRODUCT_SUPPORT_TYPE.PERCENT);
      }
      setIsFormEditable(false);
    }
  }, [initialValues, isUpdatePending, prevIsUpdatePending,
    setIsFormEditable, setValues, updateError]);

  const disabledDate = current => {
    return current && current < moment().subtract(1, 'days');
  };

  if (isPending) {
    return (
      <Row justify="center">
        <Spin />
      </Row>
    );
  }
  return (
    <Space title={t(SELLING_PRICE_TYPE_NAMES[data?.priceTypeId]?.title)}>
      {data?.priceTypeId ?
        (
          <Form form={form} id={formId} layout="vertical" onFinish={handleSubmit}>
            {data?.priceTypeId === SELLING_PRICE_TYPES.DOMAIN && (
              <>
                <Row gutter={[theme.spacing(3), theme.spacing(3)]} className={classes.row}>
                  <Col xs={24} md={12} lg={8}>
                    <Select
                      value={formik?.values?.domainType}
                      optionsData={getCountryRestrictedDomainTypeOptions(countryCode)}
                      name="domainType"
                      label={t('global:DOMAIN_TYPE')}
                      disabled
                    />
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <NumberInput
                      name="domainPrice"
                      label={t('PRICE')}
                      value={values?.domainPrice}
                      onChange={value => handleFormValueChange('domainPrice', value)}
                      disabled={isUpdatePending || !isFormEditable}
                      autoComplete="off"
                      errors={formik?.errors}
                      precision={PRECISON_VALUES.TWO_DIGIT}
                      step={NUMBER_INPUT_STEPS.TWO_STEP}
                    />
                  </Col>
                </Row>
                <Row gutter={[16, 16]} className={classes.row}>
                  <Col span={24}>
                    <Checkbox
                      name="isDisounted"
                      checked={values?.isDiscounted}
                      disabled
                    >{t('DISCOUNTED')}
                    </Checkbox>
                  </Col>
                </Row>
                <Row gutter={[16, 16]} className={classes.row}>
                  {
                    formik?.values?.isDiscounted && (
                      <>
                        <Col xs={24} md={8} lg={5}>
                          <RangePicker
                            value={formik?.values.dateRangesDomain}
                            showTime={{ format: getLocalDateTimeFormat() }}
                            format={getLocalDateTimeFormat()}
                            label={[t('global:START_DATE'), t('global:END_DATE')]}
                            name="dateRangesDomain"
                            disabled={isUpdatePending || !isFormEditable}
                            onChange={value => handleFormValueChange('dateRangesDomain', value)}
                            disabledDate={disabledDate}
                            errors={formik?.errors}
                          />
                        </Col>
                        <Col xs={24} md={8} lg={5}>
                          <Select
                            value={formik?.values?.discountedProvider.toString()}
                            optionsData={getStruckPriceSupporterOptions()}
                            name="discountedProvider"
                            label={t('DISCOUNTED_PROVIDER')}
                            disabled={isUpdatePending || !isFormEditable}
                            onChange={value => handleFormValueChange('discountedProvider', value)}
                          />
                        </Col>
                        <Col xs={24} md={3} className={classes.checkboxItem}>
                          <RadioAntd.Group
                            value={supportType}
                            onChange={handleOptionChange}
                          >
                            <Radio value={MARKET_PRODUCT_SUPPORT_TYPE.AMOUNT}>{t('AMOUNT')}</Radio>
                            <Radio value={MARKET_PRODUCT_SUPPORT_TYPE.PERCENT}>{t('PERCENT')}</Radio>
                          </RadioAntd.Group>
                        </Col>
                        <Col xs={24} md={8} lg={5}>
                          {supportType === MARKET_PRODUCT_SUPPORT_TYPE.AMOUNT ? (
                            <NumberInput
                              disabled={isUpdatePending || !isFormEditable || (formik?.values?.discountedProvider && supportRateDisabled)}
                              name="supportAmount"
                              value={formik?.values?.supportAmount}
                              onChange={value => handleFormValueChange('supportAmount', value)}
                              label={t('SUPPORT_AMOUNT')}
                              min={0}
                              precision={4}
                            />
                          )
                            : (
                              <PercentageInput
                                errors={formik?.errors}
                                name="supportRate"
                                value={formik?.values?.supportRate}
                                label={t('SUPPORT_RATE')}
                                onChange={supportRate => {
                                  handleFormValueChange('supportRate', supportRate);
                                }}
                                disabled={isUpdatePending || !isFormEditable || (formik?.values?.discountedProvider && supportRateDisabled)}
                              />
                            )}
                        </Col>
                        <Col xs={24} md={8} lg={5}>
                          <Checkbox
                            name="specialOffers"
                            checked={formik?.values?.specialOffers}
                            onChange={event => handleFormValueChange('specialOffers', event.target.checked)}
                            disabled={isUpdatePending || !isFormEditable}
                          >
                            {t('SPECIAL_OFFERS')}
                          </Checkbox>
                        </Col>
                      </>
                    )
                  }
                </Row>
              </>
            )}
            {data?.priceTypeId === SELLING_PRICE_TYPES.WAREHOUSE && (
              <ProductWarehousePrice
                handleFormValueChange={handleFormValueChange}
                formik={formik}
                isFormEditable={isUpdatePending || !isFormEditable}
                className={classes.row}
                supportRateDisabled={supportRateDisabled}
                handleOptionChange={handleOptionChange}
                supportType={supportType}
              />
            )}
            {data?.priceTypeId === SELLING_PRICE_TYPES.WASTE && (
              <ProductWastePrice
                handleFormValueChange={handleFormValueChange}
                formik={formik}
                isFormEditable={isUpdatePending || !isFormEditable}
                className={classes.row}
                supportRateDisabled={supportRateDisabled}
                handleOptionChange={handleOptionChange}
                supportType={supportType}
              />
            )}
            <EditSaveCancelButtons
              disabled={!canBeSubmittable}
              form={formId}
              htmlType="submit"
              isFormEditable={isFormEditable}
              loading={isUpdatePending}
              onCancelClick={handleCancelClick}
              onEditClick={handleEditClick}
            />
          </Form>
        )
        : null }
    </Space>
  );
};

export default GeneralInfo;
