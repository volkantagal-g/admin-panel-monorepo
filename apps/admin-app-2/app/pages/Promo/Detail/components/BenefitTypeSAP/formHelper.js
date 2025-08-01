import * as Yup from 'yup';

export const getBenefitItemsSAPData = childPromos => {
  if (!childPromos.length) return [];
  return childPromos.map(childPromo => {
    const { promoCode, items } = childPromo;
    const item = items?.[0];
    return {
      promo_code: promoCode,
      item: typeof item === 'string' ? item : item?.id,
      sale_limit: item?.saleLimit,
      discounted_price: item?.discountedPrice,
      supplier_support: item?.supplierSupport,
      supplier_sap_ref_code: item?.supplierSupportReferenceId,
      third_party_support: item?.thirdPartySupport,
      third_party_sap_ref_code: item?.thirdPartyReferenceId,
    };
  });
};

const getCsvSchema = t => {
  return Yup.array()
    .of(
      Yup.object({
        promo_code: Yup.string().required(),
        item: Yup.string().required(),
        sale_limit: Yup.number().nullable(),
        supplier_sap_ref_code: Yup.string()
          .nullable()
          .when('supplier_support', {
            is: supplierSupport => supplierSupport !== null,
            then: Yup.string().required(t('BENEFIT_SAP.ERRORS.REF_CODE_EMPTY')),
            otherwise: Yup.string().nullable(),
          }),
        third_party_sap_ref_code: Yup.string()
          .nullable()
          .when('third_party_support', {
            is: thirdPartySupport => thirdPartySupport !== null,
            then: Yup.string().required(t('BENEFIT_SAP.ERRORS.REF_CODE_EMPTY')),
            otherwise: Yup.string().notRequired(),
          }),
        supplier_support: Yup.number()
          .nullable()
          .min(0, t('BENEFIT_SAP.ERRORS.RATE_BETWEEN'))
          .max(1, t('BENEFIT_SAP.ERRORS.RATE_BETWEEN')),
        third_party_support: Yup.number()
          .nullable()
          .min(0, t('BENEFIT_SAP.ERRORS.RATE_BETWEEN'))
          .max(1, t('BENEFIT_SAP.ERRORS.RATE_BETWEEN')),
      }),
    )
    .required();
};

export const validateCSVData = (data, t) => {
  const csvSchema = getCsvSchema(t);
  return csvSchema.validateSync(data);
};

export const SAP_EXAMPLE_CSV = {
  promo_code: 'string',
  item: 'string',
  sale_limit: 'number',
  discounted_price: 'number',
  supplier_support: 'number',
  supplier_sap_ref_code: 'id',
  third_party_support: 'number',
  third_party_sap_ref_code: 'id',
};

export const SAP_CSV_COLUMNS = [
  Object.keys(SAP_EXAMPLE_CSV).reduce((acc, key) => {
    acc[key] = key;
    return acc;
  }, {}),
];
