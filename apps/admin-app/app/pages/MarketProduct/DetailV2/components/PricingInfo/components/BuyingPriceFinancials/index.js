import { memo, useCallback, useEffect } from 'react';

import { Col, Row, Form } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { useFormik } from 'formik';

import { Logic as PriceCalculator } from '@getir/market-product-price-calculator/build/main/logic';

import { debounce } from 'lodash';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { SelectItems } from './components/SelectItems';
import { FormItems } from './components/FormItems';
import { Button } from '@shared/components/GUI';
import { validate } from '@shared/yup';

import { createBuyingPriceFinancialsSelector, getMarketProductByIdSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { serializePricesForKg, validationSchema } from './formHelper';
import { FORM_IDS } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/constants';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

export const PURCHASING_DEBOUNCE_MS = 300;
export const PURCHASING_DEBOUNCE_OPTIONS = {
  leading: true,
  trailing: false,
};

export const BuyingPriceFinancials = memo(function BuyingPriceFinancials({ activationErrorsForBuyingPrice }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { t } = useTranslation('marketProductPageV2');
  const { id: productId } = useParams();

  const { Can } = usePermission();

  const isPending = useSelector(createBuyingPriceFinancialsSelector.getIsPending);
  const getError = useSelector(createBuyingPriceFinancialsSelector.getError);
  const { isFresh } = useSelector(getMarketProductByIdSelector.getData);

  const formik = useFormik({
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: { totalPriceReduction: 0 },
    validate: validate(validationSchema),
    onSubmit: values => {
      let body = {
        ...values,
        productId,
        totalPriceReduction: values?.totalPriceReduction ?? 0,
      };
      if (isFresh) {
        body = {
          ...body,
          ...serializePricesForKg(values),
        };
      }
      dispatch(Creators.createBuyingPriceFinancialsRequest({ body, errors: activationErrorsForBuyingPrice }));
    },
  });

  const { handleSubmit, errors, setValues, setFieldValue, resetForm, values } = formik;

  const calculateWholesaleFinancials = useCallback(({ listPrice, totalPriceReduction, wholesaleVat }) => {
    const netInvoicePriceWithoutVat = PriceCalculator.getNetInvoicePriceWithoutVat({
      listPrice: listPrice || 0,
      totalPriceReduction: totalPriceReduction || 0,
    });

    const netInvoicePriceWithVat = PriceCalculator.getNetInvoicePriceWithVat({
      wholesaleVat: wholesaleVat || 0,
      listPrice: listPrice || 0,
      totalPriceReduction: totalPriceReduction || 0,
    });

    const netNetBuyingPriceWithoutVat = PriceCalculator.getNetNetBuyingPriceWithoutVat({
      listPrice: listPrice || 0,
      totalPriceReduction: totalPriceReduction || 0,
    });

    const netNetBuyingPriceWithVat = PriceCalculator.getNetNetBuyingPriceWithVat({
      wholesaleVat: wholesaleVat || 0,
      listPrice: listPrice || 0,
      totalPriceReduction: totalPriceReduction || 0,
    });

    const wholesalePrice = PriceCalculator.getNetNetBuyingPriceWithVat({
      wholesaleVat: wholesaleVat || 0,
      listPrice: listPrice || 0,
      totalPriceReduction: totalPriceReduction || 0,
    });

    setValues({
      ...values,
      listPrice,
      totalPriceReduction,
      wholesaleVat,
      netInvoicePriceWithoutVat,
      netInvoicePriceWithVat,
      netNetBuyingPriceWithoutVat,
      netNetBuyingPriceWithVat,
      wholesalePrice,
    }, true);

    form.setFieldsValue({
      ...values,
      listPrice,
      totalPriceReduction,
      wholesaleVat,
      netInvoicePriceWithoutVat,
      netInvoicePriceWithVat,
      netNetBuyingPriceWithoutVat,
      netNetBuyingPriceWithVat,
      wholesalePrice,
    });
  }, [form, setValues, values]);

  const debouncedCalculateWholesaleFinancials = useCallback((...args) => {
    return debounce(calculateWholesaleFinancials, PURCHASING_DEBOUNCE_MS, PURCHASING_DEBOUNCE_OPTIONS)(...args);
  }, [calculateWholesaleFinancials]);

  const handleFormValueChange = (field, value) => {
    const formValues = form.getFieldsValue();
    form.setFieldsValue({ ...formValues, [field]: value });
    setFieldValue(field, value, true);

    if (field === 'supplierId') {
      form.setFieldsValue({ ...formValues, supplierAccountCodes: [] });
      setFieldValue('supplierAccountCodes', [], true);
    }
  };

  const handleCalculationFieldsChange = () => {
    debouncedCalculateWholesaleFinancials(form.getFieldsValue());
  };

  useEffect(() => {
    if (!getError && !isPending) {
      resetForm();
      form.resetFields();
    }
  }, [form, getError, isPending, resetForm]);

  return (
    <Form form={form} id={FORM_IDS.BUYING_PRICE_FINANCIALS} onFinish={handleSubmit}>
      <Row gutter={[16, 24]} justify="end">
        <Col span={24}>
          <SelectItems
            errors={errors}
            handleFormValueChange={handleFormValueChange}
            values={values}
          />
        </Col>
        <Col span={24}>
          <FormItems
            errors={errors}
            handleFormValueChange={handleFormValueChange}
            handleCalculationFieldsChange={handleCalculationFieldsChange}
            values={values}
          />
        </Col>
        <Can permKey={permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_FIELD_EDIT}>
          <Col span={24}>
            <Row justify="end" gutter={[8, 8]}>
              <Col>
                <Button
                  form={FORM_IDS.BUYING_PRICE_FINANCIALS}
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
      </Row>
    </Form>
  );
});
