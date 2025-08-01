import { Logic as PriceCalculator } from '@getir/market-product-price-calculator/build/main/logic';

import * as Yup from 'yup';

import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';
import { getWholesaleBonuses } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/Bonuses/formHelper';
import { MARKET_PRODUCT_STATUS } from '@shared/shared/constants';

export const validationSchema = () => Yup.object()
  .shape({
    listPrice: Yup.number().min(0).required(),
    wholesaleVat: Yup.number().required(),
    paymentDueDay: Yup.number().min(0),
  });

export const mergeColumns = (columns = [], editingKey, editingKeyProp = 'id') => {
  const customizedColumns = columns?.map(col => {
    if (!col?.editNode) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        key: col.key,
        title: col.title,
        editing: record?.[editingKeyProp] === editingKey,
        editNode: col?.editNode,
      }),
    };
  });
  return customizedColumns;
};

export const calculateWholesaleFinancials = ({ formValues, wholesaleBonuses }) => {
  const netInvoicePriceWithVat = PriceCalculator.getNetInvoicePriceWithVat({
    wholesaleVat: formValues?.wholesaleVat || 0,
    listPrice: formValues?.listPrice || 0,
    totalPriceReduction: formValues?.totalPriceReduction || 0,
  });

  const netInvoicePriceWithoutVat = PriceCalculator.getNetInvoicePriceWithoutVat({
    listPrice: formValues?.listPrice || 0,
    totalPriceReduction: formValues?.totalPriceReduction || 0,
  });

  const netNetBuyingPriceWithVat = PriceCalculator.getNetNetBuyingPriceWithVat({
    wholesaleVat: formValues?.wholesaleVat || 0,
    listPrice: formValues?.listPrice || 0,
    totalPriceReduction: formValues?.totalPriceReduction || 0,
    wholesaleBonuses,
  });

  const netNetBuyingPriceWithoutVat = PriceCalculator.getNetNetBuyingPriceWithoutVat({
    listPrice: formValues?.listPrice || 0,
    totalPriceReduction: formValues?.totalPriceReduction || 0,
    wholesaleBonuses,
  });

  const wholesalePrice = PriceCalculator.getNetNetBuyingPriceWithVat({
    wholesaleVat: formValues?.wholesaleVat || 0,
    listPrice: formValues?.listPrice || 0,
    totalPriceReduction: formValues?.totalPriceReduction || 0,
    wholesaleBonuses,
  });

  return ({
    netInvoicePriceWithVat,
    netNetBuyingPriceWithVat,
    netInvoicePriceWithoutVat,
    netNetBuyingPriceWithoutVat,
    wholesalePrice,
  });
};

export const calculateOnlyBuyingPrices = ({ formValues, wholesaleBonuses }) => {
  const netNetBuyingPriceWithVat = PriceCalculator.getNetNetBuyingPriceWithVat({
    wholesaleVat: formValues?.wholesaleVat || 0,
    listPrice: formValues?.listPrice || 0,
    totalPriceReduction: formValues?.totalPriceReduction || 0,
    wholesaleBonuses,
  });

  const netNetBuyingPriceWithoutVat = PriceCalculator.getNetNetBuyingPriceWithoutVat({
    listPrice: formValues?.listPrice || 0,
    totalPriceReduction: formValues?.totalPriceReduction || 0,
    wholesaleBonuses,
  });

  const wholesalePrice = PriceCalculator.getNetNetBuyingPriceWithVat({
    wholesaleVat: formValues?.wholesaleVat || 0,
    listPrice: formValues?.listPrice || 0,
    totalPriceReduction: formValues?.totalPriceReduction || 0,
    wholesaleBonuses,
  });

  return ({
    netNetBuyingPriceWithVat,
    netNetBuyingPriceWithoutVat,
    wholesalePrice,
  });
};

export const getOnlyModifiedValuesBeforeSubmit = ({ initialValues, values }) => {
  const { newValues: changedValues } = getDiffObj(initialValues, values);
  setNullToEmptyStringDeep(changedValues);
  return changedValues;
};

export const recalculateWholesaleBonuses = ({ netInvoicePriceWithoutVat, wholesaleBonuses }) => wholesaleBonuses?.map(({
  bonusType,
  bonus, bonusAsAmount, bonusAsPercent,
}) => getWholesaleBonuses(bonusType, netInvoicePriceWithoutVat, {
  bonus,
  bonusAsAmount,
  bonusAsPercent,
}));

export const createRequestBodyWithValidation = (supplierId, productId, record, supplierList, status) => {
  if (supplierList?.length > 1 || status !== MARKET_PRODUCT_STATUS.ACTIVE) {
    return {
      productId,
      supplierId,
      isActive: false,
    };
  }
  return undefined;
};
