import * as Yup from 'yup';

import { Logic as PriceCalculator } from '@getir/market-product-price-calculator/build/main/logic';

import { parentProductWholesaleBonuses } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { MARKET_PRODUCT_WHOLESALE_BONUS_TYPE } from '@shared/shared/constants';
import { freshProductsConstant } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/BuyingPriceFinancials/formHelper';

export const validationSchema = (values, bonusType) => Yup.object()
  .shape({
    supplierId: Yup.string().required(),
    bonus: Yup.number().required(),
    bonusAsAmount: Yup.number().min(0).when('a', (a, schema) => {
      if (bonusType === MARKET_PRODUCT_WHOLESALE_BONUS_TYPE.AMOUNT) {
        return schema.required();
      }
      return schema;
    }),
    bonusAsPercent: Yup.number().min(0).when('a', (a, schema) => {
      if (bonusType === MARKET_PRODUCT_WHOLESALE_BONUS_TYPE.PERCENT) {
        return schema.required();
      }
      return schema;
    }),
  });

export const getBonusSelectOption = () => Object.entries(parentProductWholesaleBonuses)?.map(([key, value]) => ({
  value: key,
  label: value?.[getLangKey()],
}));

export const filterSuppliersHaveSpecificPrice = ({ existingSuppliers = [], suppliers = [] }) => {
  const existingSupplierIds = existingSuppliers?.map(({ supplierId }) => supplierId);
  return suppliers?.filter(({ _id }) => existingSupplierIds?.includes(_id));
};

export const getWholesaleBonuses = (bonusType, netInvoicePriceWithoutVat, {
  bonus,
  bonusAsAmount,
  bonusAsPercent,
  isFresh,
}) => {
  const wholesaleBonuses = {
    bonus,
    bonusType: Number(bonusType),
    bonusAsPercent,
    bonusAsAmount,
  };

  if (Number(bonusType) === MARKET_PRODUCT_WHOLESALE_BONUS_TYPE.PERCENT) {
    wholesaleBonuses.bonusAsAmount = PriceCalculator.getBonusAsAmount({
      netInvoicePriceWithoutVat: netInvoicePriceWithoutVat || 0,
      bonusAsPercent: bonusAsPercent || 0,
    });
  }

  if (Number(bonusType) === MARKET_PRODUCT_WHOLESALE_BONUS_TYPE.AMOUNT) {
    wholesaleBonuses.bonusAsPercent = PriceCalculator.getBonusAsPercent({
      netInvoicePriceWithoutVat: netInvoicePriceWithoutVat || 0,
      bonusAsAmount: isFresh ? bonusAsAmount / freshProductsConstant : bonusAsAmount || 0,
    });
    wholesaleBonuses.bonusAsAmount = isFresh ? bonusAsAmount / freshProductsConstant : bonusAsAmount;
  }

  return wholesaleBonuses;
};

export const getSelectedSupplierFinancials = ({ supplierId, supplierBuyingFinancials }) => supplierBuyingFinancials
  ?.find(supplier => supplier?.supplierId === supplierId);

export const getFilteredBonusesTypeOptions = (wholesaleBonuses = []) => {
  const wholesaleBonusesTypes = wholesaleBonuses?.map(({ bonus }) => bonus);
  return getBonusSelectOption()?.filter(({ value }) => !wholesaleBonusesTypes?.includes(Number(value)));
};
