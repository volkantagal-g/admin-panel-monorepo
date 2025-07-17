import * as Yup from 'yup';

import { getLangKey } from '@shared/i18n';
import { PLANOGRAM_PRODUCT_DOMAIN_TYPES } from '@shared/shared/constantValues';
import { MARKET_PRODUCT_STATUS } from '@shared/shared/constants';

export const getDomainTypes = types => {
  return types?.map(type => {
    const foundType = PLANOGRAM_PRODUCT_DOMAIN_TYPES.find(domainType => domainType?.key === type);
    return foundType?.name?.[getLangKey()];
  });
};

export const getInitialValues = marketProduct => ({
  productName: marketProduct?.name?.[getLangKey()],
  planogramProductId: marketProduct?.productId,
  warehouseTypes: marketProduct?.warehouseTypes || [],
  domainTypes: marketProduct?.domainTypes || [],
  sizeIds: marketProduct?.sizeIds || [],
  demographyIds: marketProduct?.demographyIds || [],
  isActive: marketProduct?.status === MARKET_PRODUCT_STATUS.ACTIVE,
  isEnabled: marketProduct?.isEnabled,
  isLocal: marketProduct?.isManuelAssignment,
}
);

export const validationSchema = () => Yup.object().shape({
  productName: Yup.string().required(),
  planogramProductId: Yup.string().required(),
  warehouseTypes: Yup.array().of(Yup.number()).required(),
  domainTypes: Yup.array().of(Yup.number()).required(),
  sizeIds: Yup.array().of(Yup.number()).required(),
  demographyIds: Yup.array().of(Yup.number()).required(),
  isLocal: Yup.boolean().required(),
  warehouseIds: Yup.array().when('isLocal', {
    is: true,
    then: Yup.array().of(Yup.string()).required(),
  }),
});
