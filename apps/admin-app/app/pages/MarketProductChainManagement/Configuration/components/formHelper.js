import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const validationSchema = () => Yup.object().shape({
  isLocal: Yup.boolean(),
  warehouseType: Yup.number().required(t('baseYupError:MIXED.REQUIRED')),
  domain: Yup.array().of(Yup.number()).required(t('baseYupError:MIXED.REQUIRED')),
  demography: Yup.array().of(Yup.number()).required(t('baseYupError:MIXED.REQUIRED')),
  size: Yup.array().of(Yup.number()).required(t('baseYupError:MIXED.REQUIRED')),
  mainWarehouseIds: Yup.array().when('isLocal', {
    is: true,
    then: Yup.array().of(Yup.string()).required(t('baseYupError:MIXED.REQUIRED')),
  }),
  cityIds: Yup.array().when('isLocal', {
    is: true,
    then: Yup.array().of(Yup.string()).required(t('baseYupError:MIXED.REQUIRED')),
  }),
  warehouses: Yup.array().when('isLocal', {
    is: true,
    then: Yup.array().of(Yup.string()).required(t('baseYupError:MIXED.REQUIRED')),
  }),
});

export const getConfigurationInitialValues = (mockProductData, planogramProducts) => ({
  isLocal: mockProductData?.isLocal,
  warehouseType: mockProductData?.warehouseType,
  domain: mockProductData?.domainTypes,
  demography: mockProductData?.demography,
  size: mockProductData?.size,
  mainWarehouseIds: planogramProducts?.mainWarehouseIds || [],
  cityIds: planogramProducts?.cityIds || [],
  warehouses: planogramProducts?.warehouses || [],
});

export const selectFormatter = data => data?.map(item => ({
  value: item.id,
  label: item.name,
}));
