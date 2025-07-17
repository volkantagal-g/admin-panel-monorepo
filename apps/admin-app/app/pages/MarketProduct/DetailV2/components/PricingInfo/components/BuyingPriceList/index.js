import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { Form } from 'antd';

import { useParams } from 'react-router-dom';

import { useFormik } from 'formik';

import { toast } from 'react-toastify';

import { Table } from '@shared/components/GUI';

import { columns, EditableCell } from './config';
import { getSuppliersSelector } from '@shared/redux/selectors/common';
import {
  getMarketProductAllPriceSelector, updateBuyingPriceFinancialsSelector,
  deleteBuyingPriceFinancialsSelector, getMarketProductByIdSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import {
  mergeColumns,
  calculateWholesaleFinancials,
  getOnlyModifiedValuesBeforeSubmit,
  validationSchema,
  recalculateWholesaleBonuses,
  calculateOnlyBuyingPrices, createRequestBodyWithValidation,
} from './helper';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { extractSupplierAndManufacturer } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/util';
import { validate } from '@shared/yup';
import {
  freshProductsConstant,
  serializePricesForKg,
} from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/BuyingPriceFinancials/formHelper';
import { usePermission } from '@shared/hooks';

export const BuyingPriceList = memo(function BuyingPriceList({ activationErrorsForBuyingPrice }) {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductPageV2');
  const [form] = Form.useForm();
  const { id: productId } = useParams();
  const editingKeyProp = 'supplierId';

  const { canAccess } = usePermission();

  const data = useSelector(getMarketProductAllPriceSelector.getData);
  const isDataPending = useSelector(getMarketProductAllPriceSelector.getIsPending);
  const isUpdatePending = useSelector(updateBuyingPriceFinancialsSelector.getIsPending);
  const isUpdateSuccess = useSelector(updateBuyingPriceFinancialsSelector.getData);
  const isDeletePending = useSelector(deleteBuyingPriceFinancialsSelector.getIsPending);
  const suppliers = useSelector(getSuppliersSelector.getData);
  const { isFresh, status } = useSelector(getMarketProductByIdSelector.getData);

  const tableSourceData = useMemo(() => data?.supplierBuyingFinancials, [data?.supplierBuyingFinancials]);
  const { manufacturer } = useMemo(
    () => extractSupplierAndManufacturer(suppliers),
    [suppliers],
  );
  const manufacturerName = manufacturer?.find(({ _id }) => _id === data?.manufacturerId)?.name;

  const [editingKey, setEditingKey] = useState('');
  const [financials, setFinancials] = useState({});

  const handleSave = useCallback(() => {
    const result = getOnlyModifiedValuesBeforeSubmit({
      initialValues: tableSourceData.find(({ supplierId }) => supplierId === editingKey),
      values: form.getFieldsValue(true),
    });

    let requestBody = { ...result, supplierId: editingKey, productId };
    if (result?.isPreferred || result?.wholesaleVat || result?.listPrice || result?.totalPriceReduction) {
      requestBody = {
        ...requestBody,
        ...financials,
        ...form.getFieldsValue(true),
      };
    }
    if (isFresh) {
      requestBody = {
        ...requestBody,
        ...serializePricesForKg(requestBody),
      };
    }
    return dispatch(Creators.updateBuyingPriceFinancialsRequest({ body: requestBody, errors: activationErrorsForBuyingPrice }));
  }, [activationErrorsForBuyingPrice, dispatch, editingKey, financials, form, isFresh, productId, tableSourceData]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { isPreferred: false, wholesaleVat: 0, listPrice: 0, paymentDueDay: 0, totalPriceReduction: 0 },
    validate: validate(validationSchema),
    onSubmit: () => handleSave(),
  });
  const { handleSubmit, errors, setValues, values } = formik;

  const handleEdit = useCallback(({
    isPreferred, wholesaleVat, listPrice, paymentDueDay, netInvoicePriceWithVat,
    netNetBuyingPriceWithVat, totalPriceReduction,
  }) => {
    const fieldValues = {
      isPreferred,
      wholesaleVat,
      listPrice: isFresh ? listPrice * freshProductsConstant : listPrice,
      paymentDueDay,
      netInvoicePriceWithVat: isFresh ? netInvoicePriceWithVat * freshProductsConstant : netInvoicePriceWithVat,
      netNetBuyingPriceWithVat: isFresh ? netNetBuyingPriceWithVat * freshProductsConstant : netNetBuyingPriceWithVat,
      totalPriceReduction,
    };
    form.setFieldsValue(fieldValues);
    setValues(fieldValues);
  }, [form, isFresh, setValues]);

  const handleChange = (field, value) => {
    const formValues = {
      ...form.getFieldsValue(true),
      [field]: value,
    };

    const wholesaleBonuses = tableSourceData?.find(({ supplierId }) => supplierId === editingKey)?.wholesaleBonuses || [];
    const { netInvoicePriceWithVat, ...otherValues } = calculateWholesaleFinancials({
      formValues,
      wholesaleBonuses,
    });

    const recalculateWholesaleBonuseValues = recalculateWholesaleBonuses({
      netInvoicePriceWithoutVat: otherValues?.netInvoicePriceWithoutVat,
      wholesaleBonuses,
    });

    const { netNetBuyingPriceWithVat, netNetBuyingPriceWithoutVat, wholesalePrice } = calculateOnlyBuyingPrices(
      { formValues, wholesaleBonuses: recalculateWholesaleBonuseValues },
    );

    setFinancials({ ...otherValues, wholesaleBonuses: recalculateWholesaleBonuseValues, netNetBuyingPriceWithoutVat, wholesalePrice });

    form.setFieldsValue({
      ...formValues,
      netInvoicePriceWithVat,
      netNetBuyingPriceWithVat,
    });

    setValues({ ...formValues, [field]: value, netInvoicePriceWithVat, netNetBuyingPriceWithVat });
  };

  const { debouncedCallback } = useDebouncedCallback({
    callback: handleChange,
    delay: DEFAULT_DEBOUNCE_MS,
  });

  const handleDelete = useCallback((supplierId, record) => {
    const requestBody = createRequestBodyWithValidation(supplierId, productId, record, data?.supplierBuyingFinancials, status);
    if (requestBody) {
      return dispatch(Creators.deleteBuyingPriceFinancialsRequest({ body: requestBody }));
    }
    return toast.error(t('CANNOT_DELETE_BUYING_PRICE'));
  }, [data?.supplierBuyingFinancials, dispatch, productId, status, t]);

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
      manufacturerName,
      errors,
      values,
      isDeletePending,
      isFresh,
    }), editingKey, editingKeyProp),
    [t, canAccess, suppliers, editingKey,
      handleEdit, debouncedCallback, handleSubmit, isUpdatePending,
      handleDelete, manufacturerName, errors, values, isDeletePending, isFresh],
  );

  useEffect(() => {
    if (Object.keys(isUpdateSuccess)?.length) {
      setEditingKey('');
    }
  }, [isUpdateSuccess]);

  return (
    <Form form={form} component={false}>
      <Table
        data-testid="buying-price-table"
        components={{ body: { cell: EditableCell } }}
        columns={mergedColumns || []}
        data={tableSourceData || []}
        loading={isDataPending}
      />
    </Form>
  );
});
