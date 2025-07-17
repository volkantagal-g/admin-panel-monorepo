import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { Form } from 'antd';

import { useParams } from 'react-router-dom';

import { useFormik } from 'formik';

import { Table } from '@shared/components/GUI';

import {
  getMarketProductAllPriceSelector,
  getMarketProductByIdSelector,
  updateBuyingPriceFinancialsSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';

import { columns, EditableCell } from './config';
import {
  getWholesaleBonusesData,
  validationSchema,
} from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/BonusList/helper';
import { getSuppliersSelector } from '@shared/redux/selectors/common';
import {
  calculateWholesaleFinancials,
  mergeColumns,
} from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/BuyingPriceList/helper';
import { DEFAULT_DEBOUNCE_MS, MARKET_PRODUCT_WHOLESALE_BONUS_TYPE } from '@shared/shared/constants';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { getWholesaleBonuses } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/Bonuses/formHelper';
import { validate } from '@shared/yup';
import { freshProductsConstant } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/BuyingPriceFinancials/formHelper';
import { usePermission } from '@shared/hooks';

export const BonusList = memo(function BonusList({ activationErrorsForBuyingPrice }) {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductPageV2');
  const { id: productId } = useParams();
  const [form] = Form.useForm();

  const { canAccess } = usePermission();

  const [editingKey, setEditingKey] = useState('');

  const { supplierBuyingFinancials } = useSelector(getMarketProductAllPriceSelector.getData);
  const isDataPending = useSelector(getMarketProductAllPriceSelector.getIsPending);
  const suppliers = useSelector(getSuppliersSelector.getData);
  const isUpdatePending = useSelector(updateBuyingPriceFinancialsSelector.getIsPending);
  const isUpdateSuccess = useSelector(updateBuyingPriceFinancialsSelector.getData);
  const { isFresh } = useSelector(getMarketProductByIdSelector.getData);

  const tableData = useMemo(() => getWholesaleBonusesData(supplierBuyingFinancials), [supplierBuyingFinancials]);

  const getFinancialsAndWholesaleBonuses = useCallback(
    id => {
      const supplierIdAndBonusType = id?.split('_');
      const selectedSupplierFinancials = supplierBuyingFinancials?.find(({ supplierId }) => supplierId === supplierIdAndBonusType?.[0]);
      const existingWholesaleBonuses = selectedSupplierFinancials?.wholesaleBonuses;
      const wholesaleBonuses = existingWholesaleBonuses?.filter(({ bonus }) => bonus !== Number(supplierIdAndBonusType?.[1]));
      const removedWholesaleBonus = existingWholesaleBonuses?.find(({ bonus }) => bonus === Number(supplierIdAndBonusType?.[1]));

      return { selectedSupplierFinancials, wholesaleBonuses, removedWholesaleBonus, supplierId: supplierIdAndBonusType?.[0] };
    },
    [supplierBuyingFinancials],
  );

  const handleSave = useCallback(({ id }) => {
    const { bonusType, value } = form.getFieldsValue();
    const { selectedSupplierFinancials, wholesaleBonuses, supplierId, removedWholesaleBonus } = getFinancialsAndWholesaleBonuses(id);
    const bonusAsAmount = Number(bonusType) === MARKET_PRODUCT_WHOLESALE_BONUS_TYPE.AMOUNT ? value : removedWholesaleBonus?.bonusAsAmount;
    const bonusAsPercent = Number(bonusType) === MARKET_PRODUCT_WHOLESALE_BONUS_TYPE.PERCENT ? value : removedWholesaleBonus?.bonusAsPercent;

    const calculatedNewWholesaleBonus = getWholesaleBonuses(
      bonusType,
      selectedSupplierFinancials?.netInvoicePriceWithoutVat,
      { bonus: removedWholesaleBonus?.bonus, bonusAsAmount, bonusAsPercent, isFresh },
    );
    const newWholesaleBonuses = [...wholesaleBonuses, calculatedNewWholesaleBonus];

    const {
      netInvoicePriceWithVat,
      netInvoicePriceWithoutVat,
      netNetBuyingPriceWithVat,
      netNetBuyingPriceWithoutVat,
      wholesalePrice,
    } = calculateWholesaleFinancials({ formValues: selectedSupplierFinancials, wholesaleBonuses: newWholesaleBonuses });

    const requestBody = {
      supplierId,
      productId,
      netInvoicePriceWithVat,
      netInvoicePriceWithoutVat,
      netNetBuyingPriceWithVat,
      netNetBuyingPriceWithoutVat,
      totalPriceReduction: selectedSupplierFinancials?.totalPriceReduction,
      wholesalePrice,
      wholesaleBonuses: newWholesaleBonuses,
    };

    return dispatch(Creators.updateBuyingPriceFinancialsRequest({ body: requestBody, errors: activationErrorsForBuyingPrice }));
  }, [activationErrorsForBuyingPrice, dispatch, form, getFinancialsAndWholesaleBonuses, isFresh, productId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { value: 0, bonusType: 1 },
    validate: validate(validationSchema),
    onSubmit: ({ id }) => handleSave({ id }),
  });
  const { handleSubmit, errors, setFieldValue, values, setValues } = formik;

  const handleEdit = useCallback(({ bonusAsAmount, bonusAsPercent, bonusType, id }) => {
    const bonusAsAmountValue = isFresh ? bonusAsAmount * freshProductsConstant : bonusAsAmount;
    const value = bonusType === MARKET_PRODUCT_WHOLESALE_BONUS_TYPE.PERCENT ? bonusAsPercent : bonusAsAmountValue;
    form.setFieldsValue({ value, bonusType });
    setValues({ id, value, bonusType });
  }, [form, isFresh, setValues]);

  const handleDelete = useCallback(id => {
    const { selectedSupplierFinancials, wholesaleBonuses, supplierId } = getFinancialsAndWholesaleBonuses(id);

    const {
      netInvoicePriceWithVat,
      netInvoicePriceWithoutVat,
      netNetBuyingPriceWithVat,
      netNetBuyingPriceWithoutVat,
      wholesalePrice,
    } = calculateWholesaleFinancials({ formValues: selectedSupplierFinancials, wholesaleBonuses });

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

    return dispatch(Creators.updateBuyingPriceFinancialsRequest({ body: requestBody }));
  }, [dispatch, getFinancialsAndWholesaleBonuses, productId]);

  const handleChange = (field, value) => {
    form.setFieldsValue({ ...form.getFieldsValue(), [field]: value });
    setFieldValue(field, value);
  };

  const { debouncedCallback } = useDebouncedCallback({
    callback: handleChange,
    delay: DEFAULT_DEBOUNCE_MS,
  });

  const mergedColumns = useMemo(
    () => mergeColumns(columns({
      t,
      canAccess,
      suppliers,
      editingKey,
      setEditingKey,
      handleEdit,
      handleChange: debouncedCallback,
      onSave: handleSubmit,
      isUpdatePending,
      handleDelete,
      errors,
      values,
      isFresh,
    }), editingKey),
    [debouncedCallback, editingKey, errors, handleDelete, handleEdit, handleSubmit, isUpdatePending, suppliers, t, values, isFresh, canAccess],
  );

  useEffect(() => {
    if (Object.keys(isUpdateSuccess)?.length) {
      setEditingKey('');
    }
  }, [isUpdateSuccess]);

  return (
    <Form form={form} component={false}>
      <Table
        data-testid="bonus-table"
        components={{ body: { cell: EditableCell } }}
        loading={isDataPending}
        columns={mergedColumns || []}
        data={tableData || []}
      />
    </Form>
  );
});
