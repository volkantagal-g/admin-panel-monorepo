import { memo, useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Row } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { isFinite } from 'lodash';

import { useParams } from 'react-router-dom';

import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';

import { NumberInput, EditSaveCancelButtons, TextInput, Select } from '@shared/components/GUI';
import {
  getMarketProductAllPriceSelector,
  updateMarketProductPricingSelector,
  getMarketProductsPriceListSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { usePrevious } from '@shared/hooks';
import { getUnitOptions, getInitialValues, validationSchema, getUnitPrice, getPrice } from './formHelper';
import useStyles from './styles';
import { canSubmit } from '@shared/utils/formHelper';
import { getCountryRestrictedDomainTypeOptions } from '@app/pages/MarketProduct/utils';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { validate } from '@shared/yup';

export const UnitPriceInfo = memo(function UnitPriceInfo() {
  const dispatch = useDispatch();
  const marketProductAllPrice = useSelector(getMarketProductAllPriceSelector.getData);
  const currentPrices = useSelector(getMarketProductsPriceListSelector.getData);
  const isCurrentPricePending = useSelector(getMarketProductsPriceListSelector.getIsPending);
  const isUpdatePending = useSelector(updateMarketProductPricingSelector.getIsPending);
  const isUpdateFailure = useSelector(updateMarketProductPricingSelector.getError);
  const { t } = useTranslation('marketProductPageV2');
  const countryCode = useSelector(getSelectedCountryV2).code.alpha2;
  const [form] = Form.useForm();
  const formId = 'unitPriceInfo';
  const [isFormEditable, setIsFormEditable] = useState(false);
  const classes = useStyles();
  const { id } = useParams();
  const prevIsUpdatePending = usePrevious(isUpdatePending);
  const initialValues = useMemo(
    () => getInitialValues(marketProductAllPrice.unitPriceProperties),
    [marketProductAllPrice.unitPriceProperties],
  );

  const [domainType, setDomainType] = useState(1);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      const body = { unitPriceProperties: values };
      return dispatch(Creators.updateMarketProductPricingRequest({
        id,
        body,
      }));
    },
  });
  const { handleSubmit, values, setValues, setFieldValue, errors } = formik;

  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
    [initialValues, values],
  );

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      if (isUpdateFailure) {
        setValues(values);
      }
      else {
        setIsFormEditable(false);
      }
    }
    form.setFieldsValue(values);
  }, [form, initialValues, isUpdateFailure, isUpdatePending, prevIsUpdatePending, setValues, values]);

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };
  const handleEditClick = () => {
    setValues(initialValues);
    setIsFormEditable(true);
  };

  const handleInputForm = (field, value, inputType) => {
    if (inputType === 'numberInput') {
      setFieldValue(field, isFinite(value) ? value : null);
      if (value === 0) {
        setFieldValue('perUnit', 0);
        setFieldValue('quantity', 0);
      }
    }
    else {
      setFieldValue(field, value || null);
    }
  };

  const price = useMemo(
    () => getPrice(currentPrices?.data, domainType, marketProductAllPrice),
    [currentPrices?.data, domainType, marketProductAllPrice],
  );

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={8}>
          <Select
            label={t('DOMAIN')}
            optionsData={getCountryRestrictedDomainTypeOptions(countryCode)}
            onChange={value => setDomainType(value)}
            defaultValue="1"
            loading={isCurrentPricePending}
          />
        </Col>
      </Row>
      <Form form={form} id={formId} onFinish={handleSubmit}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} lg={8} className={classes.row}>
            <Select
              dataTestId="unit-select"
              errors={errors}
              name="unit"
              label={t('UNIT_PRICE_INFO.UNIT')}
              optionsData={getUnitOptions()}
              onChange={value => handleInputForm('unit', value, 'select')}
              value={values.unit}
              disabled={isUpdatePending || !isFormEditable}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <NumberInput
              data-testid="quantity"
              errors={errors}
              name="quantity"
              label={t('UNIT_PRICE_INFO.UNIT_NUMERIC_VALUE')}
              value={values.quantity}
              onChange={value => handleInputForm('quantity', value, 'numberInput')}
              disabled={isUpdatePending || !isFormEditable}
            />

          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} lg={8}>
            <NumberInput
              data-testid="perUnit"
              errors={errors}
              name="perUnit"
              label={t('UNIT_PRICE_INFO.PER_UNIT_NUMERIC_VALUE')}
              onChange={value => handleInputForm('perUnit', value, 'numberInput')}
              disabled={isUpdatePending || !isFormEditable}
              value={values.perUnit}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <TextInput
              disabled
              value={getUnitPrice(values.perUnit, values.quantity, values.unit, Number(price))}
              label={t('UNIT_PRICE_INFO.PREVIEW_UNIT_PRICE')}
            />
          </Col>
        </Row>
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
    </>
  );
});
