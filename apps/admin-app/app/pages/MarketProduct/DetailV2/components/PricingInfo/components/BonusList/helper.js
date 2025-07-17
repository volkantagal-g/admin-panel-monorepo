import * as Yup from 'yup';

import { parentProductWholesaleBonusTypes } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';

export const getWholesaleBonusesData = (supplierBuyingFinancials = []) => {
  const newWholesaleBonuses = [];

  supplierBuyingFinancials?.forEach(({ supplierId, wholesaleBonuses }) => {
    wholesaleBonuses?.forEach(item => newWholesaleBonuses?.push({ ...item, supplierId, id: `${supplierId}_${item?.bonus}` }));
  });

  return newWholesaleBonuses;
};

export const getBonusTypeOptions = () => Object.entries(parentProductWholesaleBonusTypes)
  ?.map(([key, value]) => ({ value: Number(key), label: value?.[getLangKey()] }));

export const validationSchema = () => Yup.object()
  .shape({
    bonusType: Yup.number().required(),
    value: Yup.number().min(0).required(),
  });
