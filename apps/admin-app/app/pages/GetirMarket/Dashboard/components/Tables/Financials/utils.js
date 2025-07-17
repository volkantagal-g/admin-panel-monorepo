import { isEmpty as _isEmpty, cloneDeep as _cloneDeep, map as _map } from 'lodash';

import { numberFormatWithOneDecimal, numberFormatWithoutDecimal } from '@shared/utils/localization';

const financialStatsSkeleton = {
  total: 0,
  totalAvg: 0,
  netRevenue: 0,
  netRevenueAvg: 0,
  grossMargin: 0,
  grossMarginPercent: 0,
  chargedAmount: 0,
  deliveryFee: 0,
  deliveryFeeAvg: 0,
  serviceFee: 0,
  serviceFeeAvg: 0,
};

const tableSkeleton = {
  TOTAL: '',
  NET_REVENUE: '',
  GROSS_MARGIN: '',
  CHARGED_AMOUNT: '',
  DELIVERY_FEE: '',
  SERVICE_FEE: '',
};

export const formatFinancialsData = ({ financial }) => {
  if (_isEmpty(financial)) {
    return [];
  }

  const financialStats = _cloneDeep(financialStatsSkeleton);
  const selectedDomainTypeData = financial;

  financialStats.total += (
    (selectedDomainTypeData?.basketValueTaxExcluded ?? 0) +
    (selectedDomainTypeData?.deliveryFeeTaxExcluded ?? 0) +
    (selectedDomainTypeData?.serviceFeeTaxExcluded ?? 0)
  );
  financialStats.totalAvg += (
    ((selectedDomainTypeData?.basketValueTaxExcluded ?? 0) +
    (selectedDomainTypeData?.deliveryFeeTaxExcluded ?? 0) +
    (selectedDomainTypeData?.serviceFeeTaxExcluded ?? 0)) /
    (selectedDomainTypeData.orderCount ?? 1)
  );
  financialStats.netRevenue += selectedDomainTypeData?.netRevenueTaxExcluded ?? 0;
  financialStats.netRevenueAvg += (selectedDomainTypeData?.netRevenueTaxExcluded ?? 0) / (selectedDomainTypeData?.orderCount ?? 0);
  financialStats.grossMargin += (selectedDomainTypeData.netRevenueTaxExcluded - selectedDomainTypeData.cogsTaxExcluded);
  financialStats.grossMarginPercent += (
    (
      ((selectedDomainTypeData?.netRevenueTaxExcluded ?? 0) - (selectedDomainTypeData.cogsTaxExcluded ?? 0)) /
      (selectedDomainTypeData?.basketValueTaxExcluded ?? 1)
    ) * 100
  );
  /*
  * here, the tax included field is used deliberately.
  * Nazim Salur wants to see charged amount like this.
  */
  financialStats.chargedAmount += selectedDomainTypeData?.netRevenue || 0;
  financialStats.deliveryFee += selectedDomainTypeData?.deliveryFeeTaxExcluded ?? 0;
  financialStats.deliveryFeeAvg += ((selectedDomainTypeData?.deliveryFeeTaxExcluded ?? 0) / (selectedDomainTypeData.orderCount ?? 1));
  financialStats.serviceFee += selectedDomainTypeData?.serviceFeeTaxExcluded ?? 0;
  financialStats.serviceFeeAvg += ((selectedDomainTypeData?.serviceFeeTaxExcluded ?? 0) / (selectedDomainTypeData.orderCount ?? 1));

  const returnRow = _cloneDeep(tableSkeleton);

  returnRow.TOTAL = {
    total: numberFormatWithoutDecimal.format(financialStats.total),
    totalTooltipTranslationKey: 'global:TAX_EXCLUDED',
    average: numberFormatWithOneDecimal.format(financialStats.totalAvg),
  };
  returnRow.NET_REVENUE = {
    total: numberFormatWithoutDecimal.format(financialStats.netRevenue),
    totalTooltipTranslationKey: 'global:TAX_EXCLUDED',
    average: numberFormatWithOneDecimal.format(financialStats.netRevenueAvg),
  };
  returnRow.GROSS_MARGIN = {
    total: numberFormatWithoutDecimal.format(financialStats.grossMargin),
    totalTooltipTranslationKey: 'global:TAX_EXCLUDED',
    average: numberFormatWithOneDecimal.format(financialStats.grossMarginPercent),
    averageTooltipTranslationKey: 'getirMarketDashboardPage:RATIO_TO_BASKET_AMOUNT',
  };
  returnRow.CHARGED_AMOUNT = {
    total: numberFormatWithoutDecimal.format(financialStats.chargedAmount),
    totalTooltipTranslationKey: 'global:TAX_INCLUDED',
  };
  returnRow.DELIVERY_FEE = {
    total: numberFormatWithoutDecimal.format(financialStats.deliveryFee),
    totalTooltipTranslationKey: 'global:TAX_EXCLUDED',
    average: numberFormatWithOneDecimal.format(financialStats.deliveryFeeAvg),
  };
  returnRow.SERVICE_FEE = {
    total: numberFormatWithoutDecimal.format(financialStats.serviceFee),
    totalTooltipTranslationKey: 'global:TAX_EXCLUDED',
    average: numberFormatWithOneDecimal.format(financialStats.serviceFeeAvg),
  };

  return _map(returnRow, (value, key) => ({ key, value }));
};
