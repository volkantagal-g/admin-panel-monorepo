import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Drawer, Form, Row, Radio as RadioAntd } from 'antd';

import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment-timezone';

import { useParams } from 'react-router-dom';

import { Button, Checkbox, NumberInput, PercentageInput, Select, Radio } from '@shared/components/GUI';
import { SIDEBAR_Z_INDEX } from '@shared/constants/styling';
import { getStruckPriceSupporterOptions } from '@app/pages/MarketProduct/commonFormHelper';
import {
  validationSchema,
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit,
} from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/SellingPriceList/helper';
import { validate } from '@shared/yup';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import {
  FORM_IDS, NUMBER_INPUT_STEPS,
  PRECISON_VALUES,
  SELLING_PRICE_TYPES,
} from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/constants';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { RangePicker } from '@shared/components/GUI/RangePicker';
import {
  getMarketProductAllPriceSelector,
  updateMarketProductDiscountedPriceSelector,
  updateMarketProductPriceSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { getFinancials } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/BundleRules/formHelper';
import {
  MARKET_PRODUCT_WHOLESALE_BONUS_TYPE as MARKET_PRODUCT_SUPPORT_TYPE,
  STRUCK_PRICE_SUPPORTER_TYPE,
} from '@shared/shared/constants';
import { usePrevious } from '@shared/hooks';
import { getSelectFilterOption } from '@shared/utils/common';
import { extractSupplierAndManufacturer, getSupplierAndManufacturerOptions } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/util';
import { getSuppliersSelector } from '@shared/redux/selectors/common';

export const EditSellingPriceDrawer = memo(function EditSellingPriceDrawer({ visible, onCloseDrawer, selectedRow, activationErrorsForSellingPrice }) {
  const { t } = useTranslation('marketProductPageV2');
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: productId } = useParams();

  const isPricePending = useSelector(updateMarketProductPriceSelector.getIsPending);
  const isDiscountedPricePending = useSelector(updateMarketProductDiscountedPriceSelector.getIsPending);
  const isPriceError = useSelector(updateMarketProductPriceSelector.getError);
  const isDiscountedPriceError = useSelector(updateMarketProductDiscountedPriceSelector.getError);
  const isPending = isPricePending || isDiscountedPricePending;
  const isError = isPriceError || isDiscountedPriceError;
  const suppliers = useSelector(getSuppliersSelector.getData);

  const prevIsUpdatePending = usePrevious(isPending);

  const initialValues = useMemo(() => getInitialValues(selectedRow), [selectedRow]);

  const isCoreDomainPrice = selectedRow?.priceTypeId === SELLING_PRICE_TYPES.DOMAIN && !selectedRow?.isDiscounted;
  const isDiscountedWastePrice = selectedRow?.priceTypeId === SELLING_PRICE_TYPES.WASTE && selectedRow?.isDiscounted;
  const [supportType, setSupportType] = useState(MARKET_PRODUCT_SUPPORT_TYPE.PERCENT);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validate: validate(validationSchema, { isCoreDomainPrice, isDiscounted: selectedRow?.isDiscounted }),
    onSubmit: values => {
      const { providerType, supportRate, isShownUnderSpecialOffers, supplierId } = values;
      const changedValues = getOnlyModifiedValuesBeforeSubmit({ initialValues, values });
      const baseRequest = {
        price: changedValues?.price,
        startDate: changedValues?.dateRanges?.[0],
        endDate: changedValues?.dateRanges?.[1],
      };
      const financials = getFinancials({
        providerType: changedValues?.providerType || providerType,
        supportRate: changedValues?.supportRate || supportRate,
        isShownUnderSpecialOffers: changedValues?.isShownUnderSpecialOffers || isShownUnderSpecialOffers,
        isBundle: false,
        isAmount: values?.isAmount || false,
        supportAmount: values?.supportAmount || 0,
        supplierId: changedValues?.supplierId || supplierId,
      });

      if (financials?.supplierId) {
        const supplierSAPCode = suppliers?.find(({ _id }) => _id === financials?.supplierId)?.supplierReferenceId;
        financials.supplierSAPCode = supplierSAPCode;
      }

      if (selectedRow?.isDiscounted) {
        return dispatch(Creators.updateMarketProductDiscountedPriceRequest({
          body: {
            ...baseRequest,
            limit: changedValues?.limit,
            financials,
            discountedPriceId: selectedRow?.id,
          },
          productId,
          errors: activationErrorsForSellingPrice,
        }));
      }
      return dispatch(Creators.updateMarketProductPriceRequest({
        body: {
          ...baseRequest,
          priceId: selectedRow?.id,
        },
        productId,
        errors: activationErrorsForSellingPrice,
      }));
    },
  });
  const { handleSubmit, errors, setFieldValue, resetForm, values } = formik;

  const data = useSelector(getMarketProductAllPriceSelector.getData);
  const productsSuppliersIds = useMemo(() => data?.supplierBuyingFinancials?.map(({ supplierId }) => supplierId), [data?.supplierBuyingFinancials]);
  const { supplier } = useMemo(
    () => extractSupplierAndManufacturer(suppliers),
    [suppliers],
  );
  const productsSuppliers = useMemo(() => supplier.filter(({ _id }) => productsSuppliersIds?.includes(_id)), [productsSuppliersIds, supplier]);
  const thirdParties = useMemo(() => supplier.filter(({ _id }) => !productsSuppliersIds?.includes(_id)), [productsSuppliersIds, supplier]);
  const supplierOptionCandidate = useMemo(() => {
    if (values?.providerType === STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER.toString()) return productsSuppliers;
    if (values?.providerType === STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY.toString()) return thirdParties;
    return [];
  }, [values?.providerType, productsSuppliers, thirdParties]);
  const supplierOptions = useMemo(() => getSupplierAndManufacturerOptions(supplierOptionCandidate), [supplierOptionCandidate]);

  const isPercantageDisabled = Number(values?.providerType) === STRUCK_PRICE_SUPPORTER_TYPE.FREE ||
    Number(values?.providerType) === STRUCK_PRICE_SUPPORTER_TYPE.GETIR_FINANCED;

  const disabledDate = current => {
    return current && current < moment().subtract(1, 'days');
  };

  const handleCloseDrawer = useCallback(() => {
    onCloseDrawer();
    resetForm();
  }, [onCloseDrawer, resetForm]);

  const handleValueChange = (value, name) => {
    setFieldValue(name, value);
  };

  useEffect(() => {
    if (prevIsUpdatePending && !isPending) {
      if (!isError) {
        handleCloseDrawer();
      }
    }
  }, [handleCloseDrawer, isError, isPending, prevIsUpdatePending]);
  useEffect(() => {
    setSupportType(selectedRow?.financials?.isAmount === true ? MARKET_PRODUCT_SUPPORT_TYPE.AMOUNT : MARKET_PRODUCT_SUPPORT_TYPE.PERCENT);
  }, [selectedRow?.financials?.isAmount]);

  useEffect(() => {
    setSupportType(selectedRow?.financials?.isAmount === true ? MARKET_PRODUCT_SUPPORT_TYPE.AMOUNT : MARKET_PRODUCT_SUPPORT_TYPE.PERCENT);
  }, [selectedRow?.financials?.isAmount]);

  const handleOptionChange = ({ target: { value } }) => {
    setSupportType(value);
    if (value === MARKET_PRODUCT_SUPPORT_TYPE.PERCENT) {
      formik?.setFieldValue('isAmount', false);
    }
    else {
      formik?.setFieldValue('isAmount', true);
    }
  };

  return (
    <Drawer
      title={t('EDIT')}
      onClose={handleCloseDrawer}
      visible={visible}
      extra={(<Button loading={isPending} form={FORM_IDS.SELLING_PRICE_EDIT} htmlType="submit" size="small">{t('SAVE')}</Button>)}
      zIndex={SIDEBAR_Z_INDEX + 1}
    >
      <Form id={FORM_IDS.SELLING_PRICE_EDIT} form={form} onFinish={handleSubmit}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <NumberInput
              name="price"
              label={t('PRICE')}
              min={0}
              precision={PRECISON_VALUES.TWO_DIGIT}
              step={NUMBER_INPUT_STEPS.TWO_STEP}
              value={values?.price}
              errors={errors}
              onChange={value => handleValueChange(value, 'price')}
            />
          </Col>
          {!isCoreDomainPrice && (
          <Col span={24}>
            <RangePicker
              name="dateRanges"
              label={`${t('global:START_DATE')} - ${t('global:END_DATE')}`}
              placeholder={[t('global:START_DATE'), t('global:END_DATE')]}
              showTime={{ format: getLocalDateTimeFormat() }}
              format={getLocalDateTimeFormat()}
              allowEmpty
              disabledDate={disabledDate}
              defaultValue={values?.dateRanges}
              errors={errors}
              onChange={value => handleValueChange(value, 'dateRanges')}
              getPopupContainer={() => document.body}
            />
          </Col>
          )}
          {
            isDiscountedWastePrice && (
            <Col span={24}>
              <NumberInput
                name="limit"
                label={t('LIMIT')}
                min={0}
                value={values?.limit}
                errors={errors}
                onChange={value => handleValueChange(value, 'limit')}
              />
            </Col>
            )
          }
          {selectedRow?.isDiscounted && (
            <>
              <Col span={24}>
                <Select
                  label={t('SUPPORT_TYPE')}
                  name="providerType"
                  optionsData={getStruckPriceSupporterOptions()}
                  value={values?.providerType?.toString()}
                  errors={errors}
                  onChange={value => handleValueChange(value, 'providerType')}
                />
              </Col>
              <Col span={24}>
                <Select
                  dataTestId="supplier"
                  name="supplierId"
                  label={t('SUPPLIER')}
                  showSearch
                  filterOption={getSelectFilterOption}
                  optionsData={supplierOptions}
                  onChange={supplierId => handleValueChange(supplierId, 'supplierId')}
                  allowClear
                  errors={errors}
                  value={values?.supplierId}
                  disabled={isPercantageDisabled}
                />
              </Col>
              <Col span={24}>
                <RadioAntd.Group
                  value={supportType}
                  onChange={handleOptionChange}
                >
                  <Radio value={MARKET_PRODUCT_SUPPORT_TYPE.AMOUNT}>{t('AMOUNT')}</Radio>
                  <Radio value={MARKET_PRODUCT_SUPPORT_TYPE.PERCENT}>{t('PERCENT')}</Radio>
                </RadioAntd.Group>
              </Col>
              <Col span={24}>
                {supportType === MARKET_PRODUCT_SUPPORT_TYPE.AMOUNT ? (
                  <NumberInput
                    disabled={isPercantageDisabled}
                    name="supportAmount"
                    value={values?.supportAmount}
                    onChange={value => handleValueChange(value, 'supportAmount')}
                  />
                )
                  : (
                    <PercentageInput
                      name="supportRate"
                      label={t('SUPPORT_RATE')}
                      value={values?.supportRate}
                      errors={errors}
                      onChange={value => handleValueChange(value, 'supportRate')}
                      disabled={isPercantageDisabled}
                    />
                  )}
              </Col>
              <Col span={24}>
                <Checkbox
                  name="isShownUnderSpecialOffers"
                  checked={values?.isShownUnderSpecialOffers}
                  errors={errors}
                  onChange={({ target: { checked } }) => handleValueChange(checked, 'isShownUnderSpecialOffers')}
                >{t('SPECIAL_OFFERS')}
                </Checkbox>
              </Col>
            </>
          )}
        </Row>
      </Form>
    </Drawer>
  );
});
