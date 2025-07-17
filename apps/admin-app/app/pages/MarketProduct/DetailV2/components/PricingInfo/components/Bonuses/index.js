import { memo, useEffect, useMemo, useState } from 'react';
import { Col, Row, Radio as RadioAntd, Form } from 'antd';

import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { PlusOutlined } from '@ant-design/icons';

import { useFormik } from 'formik';

import { useParams } from 'react-router-dom';

import { Button, NumberInput, PercentageInput, Radio, Select } from '@shared/components/GUI';
import { getSelectFilterOption } from '@shared/utils/common';
import { getSuppliersSelector } from '@shared/redux/selectors/common';
import { getSupplierAndManufacturerOptions } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/util';
import { MARKET_PRODUCT_WHOLESALE_BONUS_TYPE } from '@shared/shared/constants';
import {
  filterSuppliersHaveSpecificPrice,
  getFilteredBonusesTypeOptions, getSelectedSupplierFinancials, getWholesaleBonuses,
  validationSchema,
} from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/Bonuses/formHelper';
import { validate } from '@shared/yup';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import {
  getMarketProductAllPriceSelector,
  getMarketProductByIdSelector,
  updateBuyingPriceFinancialsSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { calculateWholesaleFinancials } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/BuyingPriceList/helper';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

export const Bonuses = memo(function Bonuses({ activationErrorsForBuyingPrice }) {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductPageV2');
  const { id: productId } = useParams();
  const [form] = Form.useForm();
  const formId = 'bonuses';

  const { Can, canAccess } = usePermission();

  const [bonusType, setBonusType] = useState(MARKET_PRODUCT_WHOLESALE_BONUS_TYPE.PERCENT);
  const [selectedSupplierId, setSelectedSupplierId] = useState();

  const suppliers = useSelector(getSuppliersSelector.getData);
  const isSupplierPending = useSelector(getSuppliersSelector.getIsPending);
  const { supplierBuyingFinancials, wholesaleVat } = useSelector(getMarketProductAllPriceSelector.getData);
  const isUpdatePending = useSelector(updateBuyingPriceFinancialsSelector.getIsPending);
  const getError = useSelector(updateBuyingPriceFinancialsSelector.getError);
  const { isFresh } = useSelector(getMarketProductByIdSelector.getData);

  const suppliersHaveSpecificPrice = useMemo(
    () => filterSuppliersHaveSpecificPrice({ existingSuppliers: supplierBuyingFinancials, suppliers }),
    [supplierBuyingFinancials, suppliers],
  );
  const supplierOptions = useMemo(() => getSupplierAndManufacturerOptions(suppliersHaveSpecificPrice), [suppliersHaveSpecificPrice]);
  const selectedSupplierFinancials = useMemo(
    () => getSelectedSupplierFinancials({ supplierId: selectedSupplierId, supplierBuyingFinancials }),
    [selectedSupplierId, supplierBuyingFinancials],
  );
  const filteredBonusesTypeOptions = useMemo(
    () => getFilteredBonusesTypeOptions(selectedSupplierFinancials?.wholesaleBonuses),
    [selectedSupplierFinancials?.wholesaleBonuses],
  );

  const formik = useFormik({
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    validate: validate(validationSchema, bonusType),
    initialValues: {},
    onSubmit: ({ supplierId, bonus, bonusAsAmount, bonusAsPercent }) => {
      const existingWholesaleBonuses = selectedSupplierFinancials?.wholesaleBonuses || [];
      const wholesaleBonuses = [...existingWholesaleBonuses, getWholesaleBonuses(
        bonusType,
        selectedSupplierFinancials?.netInvoicePriceWithoutVat,
        { bonus, bonusAsAmount, bonusAsPercent, isFresh },
      )];

      const {
        netInvoicePriceWithVat,
        netInvoicePriceWithoutVat,
        netNetBuyingPriceWithVat,
        netNetBuyingPriceWithoutVat,
        wholesalePrice,
      } = calculateWholesaleFinancials({ formValues: selectedSupplierFinancials, wholesaleBonuses, wholesaleVat });

      const requestBody = {
        supplierId,
        productId,
        netInvoicePriceWithVat,
        netInvoicePriceWithoutVat,
        netNetBuyingPriceWithVat,
        netNetBuyingPriceWithoutVat,
        totalPriceReduction: selectedSupplierFinancials?.totalPriceReduction,
        wholesalePrice,
        wholesaleBonuses,
      };
      return dispatch(Creators.updateBuyingPriceFinancialsRequest({ body: requestBody, errors: activationErrorsForBuyingPrice }));
    },
  });
  const { handleSubmit, errors, setFieldValue, values: inputValues, resetForm } = formik;

  const handleOptionChange = ({ target: { value } }) => {
    setBonusType(value);
    form.setFieldsValue({ ...form.getFieldsValue(), bonusAsAmount: undefined, bonusAsPercent: undefined });
    setFieldValue('bonusAsAmount', undefined, true);
    setFieldValue('bonusAsPercent', undefined, true);
  };

  const handleFormValueChange = (field, value) => {
    form.setFieldsValue({ ...form.getFieldsValue(), [field]: value });
    setFieldValue(field, value, true);
  };

  const resetBonusType = () => {
    form.setFieldsValue({ ...form.getFieldsValue(), bonus: undefined });
    setFieldValue('bonus', undefined, true);
  };

  useEffect(() => {
    if (!getError && !isUpdatePending) {
      resetForm();
      form.resetFields();
    }
  }, [form, getError, isUpdatePending, resetForm]);

  return (
    <Form form={form} id={formId} onFinish={handleSubmit}>
      <Row gutter={[16, 16]}>
        <Col span={24}>Bonuses</Col>
        <Col xs={24} md={12} lg={8}>
          <Select
            data-testid="supplier-test"
            optionsData={supplierOptions}
            showSearch
            filterOption={getSelectFilterOption}
            name="supplierId"
            label={t('SUPPLIER')}
            allowClear
            errors={errors}
            onChange={value => {
              handleFormValueChange('supplierId', value);
              setSelectedSupplierId(value);
              resetBonusType();
            }}
            loading={isSupplierPending}
            value={inputValues?.supplierId}
          />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Select
            data-testid="type-test"
            optionsData={filteredBonusesTypeOptions}
            name="bonus"
            value={inputValues?.bonus}
            label={t('TYPE')}
            allowClear
            errors={errors}
            onChange={value => handleFormValueChange('bonus', value)}
            disabled={!selectedSupplierId || !canAccess(permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_FIELD_EDIT)}
          />
        </Col>
        <Col xs={24} lg={8}>
          <Row>
            <Col span={12}>
              <RadioAntd.Group
                disabled={!canAccess(permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_FIELD_EDIT)}
                defaultValue={bonusType}
                onChange={handleOptionChange}
              >
                <Radio value={MARKET_PRODUCT_WHOLESALE_BONUS_TYPE.AMOUNT}>{t('AMOUNT')}</Radio>
                <Radio value={MARKET_PRODUCT_WHOLESALE_BONUS_TYPE.PERCENT}>{t('PERCENT')}</Radio>
              </RadioAntd.Group>
            </Col>
            <Col span={12}>
              {bonusType === MARKET_PRODUCT_WHOLESALE_BONUS_TYPE.PERCENT ? (
                <PercentageInput
                  disabled={!canAccess(permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_FIELD_EDIT)}
                  name="bonusAsPercent"
                  errors={errors}
                  onChange={value => handleFormValueChange('bonusAsPercent', value)}
                  value={inputValues?.bonusAsPercent}
                />
              )
                : (
                  <NumberInput
                    disabled={!canAccess(permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_FIELD_EDIT)}
                    name="bonusAsAmount"
                    errors={errors}
                    onChange={value => handleFormValueChange('bonusAsAmount', value)}
                    value={inputValues?.bonusAsAmount}
                  />
                )}
            </Col>
          </Row>
        </Col>
        <Can permKey={permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_FIELD_EDIT}>
          <Col span={24}>
            <Row justify="end" gutter={[8, 8]}>
              <Col>
                <Button
                  form={formId}
                  icon={<PlusOutlined />}
                  size="small"
                  htmlType="submit"
                  loading={isUpdatePending}
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
