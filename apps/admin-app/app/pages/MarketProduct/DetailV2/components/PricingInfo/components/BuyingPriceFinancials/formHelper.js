import * as Yup from 'yup';

export const validationSchema = () => Yup.object()
  .shape({
    listPrice: Yup.number().min(0).required(),
    totalPriceReduction: Yup.number().min(0).max(100).default(0),
    wholesaleVat: Yup.number().required(),
    wholesalePrice: Yup.number().required(),
    netInvoicePriceWithVat: Yup.number().required(),
    netInvoicePriceWithoutVat: Yup.number().required(),
    netNetBuyingPriceWithVat: Yup.number().required(),
    netNetBuyingPriceWithoutVat: Yup.number().required(),
    paymentDueDay: Yup.number().min(0),
    supplierId: Yup.string().required(),
    supplierAccountCodes: Yup.array().of(Yup.string()),
  });

export const freshProductsConstant = 1000;

export const serializePricesForKg = ({
  listPrice, netInvoicePriceWithVat, netInvoicePriceWithoutVat,
  netNetBuyingPriceWithVat, netNetBuyingPriceWithoutVat, wholesalePrice,
}) => {
  return {
    listPrice: Number.isNaN(listPrice / freshProductsConstant) ? undefined : listPrice / freshProductsConstant,
    netInvoicePriceWithVat: Number.isNaN(netInvoicePriceWithVat / freshProductsConstant) ? undefined : netInvoicePriceWithVat / freshProductsConstant,
    netInvoicePriceWithoutVat: Number.isNaN(netInvoicePriceWithoutVat / freshProductsConstant) ?
      undefined : netInvoicePriceWithoutVat / freshProductsConstant,
    netNetBuyingPriceWithVat: Number.isNaN(netNetBuyingPriceWithVat / freshProductsConstant) ?
      undefined : netNetBuyingPriceWithVat / freshProductsConstant,
    netNetBuyingPriceWithoutVat: Number.isNaN(netNetBuyingPriceWithoutVat / freshProductsConstant) ?
      undefined : netNetBuyingPriceWithoutVat / freshProductsConstant,
    wholesalePrice: Number.isNaN(wholesalePrice / freshProductsConstant) ? undefined : wholesalePrice / freshProductsConstant,
  };
};
