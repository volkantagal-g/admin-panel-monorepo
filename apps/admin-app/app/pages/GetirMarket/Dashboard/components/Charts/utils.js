import { GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE, GETIR_VOYAGER_DOMAIN_TYPE } from '@shared/shared/constants';

export const CHART_DOMAIN_KEYS = [
  GETIR_10_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  // Merge type
  [GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE],
  GETIR_VOYAGER_DOMAIN_TYPE,
];

export const CHART_DOMAIN_LABELS = t => {
  return [
    t('getirMarketDashboardPage:G10_SHORT'),
    t('getirMarketDashboardPage:G30_SHORT'),
    `${t('getirMarketDashboardPage:G10_SHORT')}&${t('getirMarketDashboardPage:G30_SHORT')}`,
    t('getirMarketDashboardPage:GETIR_WATER_SHORT'),
  ];
};
