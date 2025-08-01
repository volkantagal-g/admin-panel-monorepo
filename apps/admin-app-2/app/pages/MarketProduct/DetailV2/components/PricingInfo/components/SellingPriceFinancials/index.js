import { memo, useEffect, useMemo, useState } from 'react';
import { Col, Form, Row, Radio as RadioAntd } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';

import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import {
  handleObjectStructure,
  validationSchema,
  initialValues, struckPriceInitialValues, getAvailableDomainsForDiscountedPrices,
} from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/SellingPriceFinancials/formHelper';

import { validate } from '@shared/yup';
import { DomainSellingPrice } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/SellingPriceFinancials/DomainSellingPrice';
import { Button, InfoIcon, Radio } from '@shared/components/GUI';
import { WarehouseSellingPrice } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/SellingPriceFinancials/WarehouseSellingPrice';
import useStyles from './commonStyles';
import {
  createSellingPriceDiscountedFinancialsSelector,
  createSellingPriceFinancialsSelector,
  getMarketProductAllPriceSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { SELLING_PRICE_TYPES, REQUEST_TYPES, FORM_IDS } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/constants';
import { MARKET_PRODUCT_SUPPORT_TYPE } from '@shared/shared/constants';
import { getSuppliersSelector } from '@shared/redux/selectors/common';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

export const SellingPriceFinancials = memo(function SellingPriceFinancials({ activationErrorsForSellingPrice }) {
  const { t } = useTranslation('marketProductPageV2');
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [form] = Form.useForm();

  const { Can } = usePermission();

  const suppliers = useSelector(getSuppliersSelector.getData);
  const { availableDomainsForDiscountedPrices } = useSelector(getMarketProductAllPriceSelector.getData);
  const createSellingPriceIsPending = useSelector(createSellingPriceFinancialsSelector.getIsPending);
  const createSellingDiscountedPriceIsPending = useSelector(createSellingPriceDiscountedFinancialsSelector.getIsPending);
  const createSellingPriceError = useSelector(createSellingPriceFinancialsSelector.getError);
  const createSellingDiscountedPriceError = useSelector(createSellingPriceDiscountedFinancialsSelector.getError);
  const isPending = createSellingPriceIsPending || createSellingDiscountedPriceIsPending;
  const getError = createSellingPriceError || createSellingDiscountedPriceError;

  const [priceType, setPriceType] = useState(SELLING_PRICE_TYPES?.DOMAIN);
  const [isStruckPriceSelected, setIsStruckPriceSelected] = useState(false);
  const [supportType, setSupportType] = useState(MARKET_PRODUCT_SUPPORT_TYPE.PERCENT);

  const formik = useFormik({
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    initialValues,
    validate: validate(validationSchema, { isStruckPriceSelected, priceType, supportType, t }),
    onSubmit: values => {
      const { requestType, ...body } = handleObjectStructure({ ...values, isDiscountedPrice: isStruckPriceSelected, priceType });
      if (requestType === REQUEST_TYPES.SELLING_PRICE) {
        return dispatch(Creators.createSellingPriceFinancialsRequest({ body: { ...body, productId }, errors: activationErrorsForSellingPrice }));
      }
      if (body?.financials?.supplierId) {
        const supplierSAPCode = suppliers?.find(({ _id }) => _id === body?.financials?.supplierId)?.supplierReferenceId;
        body.financials.supplierSAPCode = supplierSAPCode;
      }
      return dispatch(Creators.createSellingPriceDiscountedFinancialsRequest({ body: { ...body, productId }, errors: activationErrorsForSellingPrice }));
    },
  });
  const { handleSubmit, errors, setValues, resetForm, values } = formik;

  const doesHaveDomainPrice = useMemo(
    () => getAvailableDomainsForDiscountedPrices(availableDomainsForDiscountedPrices, values?.domainType),
    [availableDomainsForDiscountedPrices, values?.domainType],
  );

  const handlePriceTypeChange = ({ target: { value } }) => {
    setPriceType(Number(value));
    resetForm();
    form.resetFields();
    setValues({ priceType: Number(value) });
    setIsStruckPriceSelected(false);
  };

  const handleSelectDiscounted = isSelected => {
    setIsStruckPriceSelected(isSelected);
    if (!isSelected) {
      setValues({ ...values, ...struckPriceInitialValues });
      form.setFieldsValue({ discountedDateRanges: [] });
    }
  };

  useEffect(() => {
    if (!doesHaveDomainPrice && isStruckPriceSelected) {
      setValues(struckPriceInitialValues);
      setIsStruckPriceSelected(false);
    }
  }, [doesHaveDomainPrice, isStruckPriceSelected, setValues]);
  useEffect(() => {
    if (!getError && !isPending) {
      resetForm();
      form.resetFields();
      setIsStruckPriceSelected(false);
      setSupportType(MARKET_PRODUCT_SUPPORT_TYPE.PERCENT);
    }
  }, [form, getError, isPending, resetForm]);

  return (
    <Form id={FORM_IDS.SELLING_PRICE_FINANCIALS} form={form} onFinish={handleSubmit}>
      <RadioAntd.Group onChange={handlePriceTypeChange} defaultValue={SELLING_PRICE_TYPES?.DOMAIN?.toString()}>
        <Radio value="3">{t('DOMAIN')}</Radio>
        <Radio value="2" disabled={!availableDomainsForDiscountedPrices?.length}>{t('WAREHOUSE')}{!availableDomainsForDiscountedPrices?.length ?
          <InfoIcon title={t('SELLING_PRICE_INFO_MESSAGES.VALID_DOMAIN_PRICE_STATUS')} />
          : null}
        </Radio>
      </RadioAntd.Group>
      {
        priceType === SELLING_PRICE_TYPES?.DOMAIN ? (
          <DomainSellingPrice
            formik={formik}
            priceType={priceType}
            isStruckPriceSelected={isStruckPriceSelected}
            doesHaveDomainPrice={doesHaveDomainPrice}
            handleSelectDiscounted={handleSelectDiscounted}
            supportType={supportType}
            setSupportType={setSupportType}
          />
        )
          : (
            <WarehouseSellingPrice
              errors={errors}
              formik={formik}
              priceType={priceType}
              isStruckPriceSelected={isStruckPriceSelected}
              handleSelectDiscounted={handleSelectDiscounted}
              doesHaveDomainPrice={doesHaveDomainPrice}
              supportType={supportType}
              setSupportType={setSupportType}
            />
          )
      }
      <Can permKey={permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_FIELD_EDIT}>
        <Col span={24}>
          <Row justify="end" className={classes.row} gutter={[8, 8]}>
            <Col>
              <Button
                form={FORM_IDS.SELLING_PRICE_FINANCIALS}
                icon={<PlusOutlined />}
                size="small"
                htmlType="submit"
                loading={isPending}
              >
                {t('ADD')}
              </Button>
            </Col>
          </Row>
        </Col>
      </Can>
    </Form>
  );
});
