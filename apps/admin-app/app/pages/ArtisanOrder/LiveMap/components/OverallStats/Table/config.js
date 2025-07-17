import { get } from 'lodash';

import {
  ORDER_PERIOD,
  ORDER_DELIVERY_TYPES,
  ORDER_DOMAIN_TYPES,
  ACTION_TYPES,
} from './constants';
import { t } from '@shared/i18n';

const translationKey = 'artisanLiveMapPage';
const getOptions = (domain, ignorePeriod) => {
  return {
    domainIndexer: domain,
    periodIgnored: ignorePeriod,
  };
};

const calculateAndReturnGrowthRate = (today, past) => {
  const isGrown = (today > past);
  const difference = (today - past);
  const rate = difference / (past / 100);
  if (rate) {
    if (isGrown) {
      return <span data-growth="positive">{rate.toFixed(0)}</span>;
    }
    return <span data-growth="negative">{rate.toFixed(0)}</span>;
  }
  return <span data-growth="negative">0</span>;
};

const generateDeliveryQuery = (orderPeriod, options = null) => {
  let queries;

  const overrideDomain = get(options, 'domainIndexer', '');
  const periodIgnored = get(options, 'periodIgnored', true);

  if (overrideDomain === ORDER_DELIVERY_TYPES.ALL) {
    queries = [ORDER_DELIVERY_TYPES.GG, ORDER_DELIVERY_TYPES.IG];
  }
  else {
    switch (orderPeriod) {
      case ORDER_PERIOD.TODAY:

        if (overrideDomain !== '') {
          queries = [ORDER_DELIVERY_TYPES.IG];
        }
        else {
          queries = [ORDER_DELIVERY_TYPES.GG, ORDER_DELIVERY_TYPES.IG];
        }

        break;
      case ORDER_PERIOD.YESTERDAY:
        queries = [ORDER_DELIVERY_TYPES.IG];
        break;
      case ORDER_PERIOD.LAST_WEEK:
        queries = [ORDER_DELIVERY_TYPES.GG];
        break;
      default:
        queries = [];
        break;
    }
  }

  if (overrideDomain !== '') {
    switch (overrideDomain) {
      case ORDER_DELIVERY_TYPES.ALL:
        return queries.map(q => {
          let qStr = q;
          if (!periodIgnored) {
            qStr += `.${orderPeriod}`;
          }

          return qStr;
        });
      default:
        return queries.map(q => {
          let qStr = (overrideDomain !== '') ? overrideDomain : q;
          if (!periodIgnored) {
            qStr += `.${orderPeriod}`;
          }

          return qStr;
        });
    }
  }

  return queries;
};

const generateValueForColumn = (action, data, deliveryQueries = []) => {
  let retVal = 0;

  if (deliveryQueries.length === 0) {
    return retVal;
  }

  switch (action) {
    case ACTION_TYPES.REGULAR:
      retVal = deliveryQueries.reduce((acc, curr) => {
        return acc + get(data, curr, 0);
      }, 0);
      break;
    case ACTION_TYPES.ERROR:
      retVal = deliveryQueries.reduce((acc, curr) => {
        return acc + get(data, `${curr}.error`, 0);
      }, 0);
      break;
    default:
      retVal = 0;
      break;
  }

  return retVal;
};

const calculateGrowthRateGateway = (orderPeriod, data, domain, actionType = ACTION_TYPES.REGULAR) => {
  switch (orderPeriod) {
    case ORDER_PERIOD.YESTERDAY: {
      const queryToday = generateDeliveryQuery(
        ORDER_PERIOD.TODAY,
        getOptions(domain, false),
      );
      const revenueToday = generateValueForColumn(actionType, data, queryToday);

      const queryYesterday = generateDeliveryQuery(
        orderPeriod,
        getOptions(domain, false),
      );
      const revenueYesterday = generateValueForColumn(actionType, data, queryYesterday);

      return calculateAndReturnGrowthRate(revenueToday.toFixed(0), revenueYesterday.toFixed(0));
    }
    case ORDER_PERIOD.LAST_WEEK: {
      const queryToday = generateDeliveryQuery(
        ORDER_PERIOD.TODAY,
        getOptions(domain, false),
      );
      const revenueToday = generateValueForColumn(actionType, data, queryToday);

      const queryLastWeek = generateDeliveryQuery(
        orderPeriod,
        getOptions(domain, false),
      );
      const revenueLastWeek = generateValueForColumn(actionType, data, queryLastWeek);

      return calculateAndReturnGrowthRate(revenueToday.toFixed(0), revenueLastWeek.toFixed(0));
    }
    case ORDER_PERIOD.TODAY:
    default:
      return null;
  }
};

export const generateColumns = ({ header }) => {
  const columns = [
    {
      desc: {},
      class: 'periodName',
      value: 1,
      render: () => {
        const period = t(`global:${header}`);
        return period;
      },
    },
    {
      desc: {
        [ORDER_PERIOD.TODAY]: t(`${translationKey}:ORDER_STATS.ACTIVE_ORDERS.TODAY`),
        [ORDER_PERIOD.YESTERDAY]: t(`${translationKey}:ORDER_STATS.ACTIVE_ORDERS.YESTERDAY`),
        [ORDER_PERIOD.LAST_WEEK]: t(`${translationKey}:ORDER_STATS.ACTIVE_ORDERS.LAST_WEEK`),
      },
      class: 'activeFoodOrderCountCell',
      objectIndexer: 'active_order',
      value: 2,
      render: (orderPeriod, data) => {
        const query = generateDeliveryQuery(orderPeriod);
        return generateValueForColumn(ACTION_TYPES.REGULAR, data, query);
      },
    },
    {
      desc: {
        [ORDER_PERIOD.TODAY]: t(`${translationKey}:ORDER_STATS.ERROR.TODAY`),
        [ORDER_PERIOD.YESTERDAY]: t(`${translationKey}:ORDER_STATS.ERROR.YESTERDAY`),
        [ORDER_PERIOD.LAST_WEEK]: t(`${translationKey}:ORDER_STATS.ERROR.LAST_WEEK`),
      },
      class: 'activeOrderErrorCountCell',
      objectIndexer: 'order_detail',
      value: 3,
      render: (orderPeriod, data) => {
        const query = generateDeliveryQuery(orderPeriod);
        return generateValueForColumn(ACTION_TYPES.ERROR, data, query);
      },
    },
    {
      desc: {
        [ORDER_PERIOD.TODAY]: t(`${translationKey}:ORDER_STATS.REVENUE_ALT.TODAY`),
        [ORDER_PERIOD.YESTERDAY]: t(`${translationKey}:ORDER_STATS.REVENUE_ALT.YESTERDAY`),
        [ORDER_PERIOD.LAST_WEEK]: t(`${translationKey}:ORDER_STATS.REVENUE_ALT.LAST_WEEK`),
      },
      class: 'financialCell',
      objectIndexer: 'order_revenue',
      value: 4,
      render: (orderPeriod, data) => {
        const query = generateDeliveryQuery(orderPeriod, getOptions(ORDER_DELIVERY_TYPES.IG, false));
        const revenueVal = generateValueForColumn(ACTION_TYPES.REGULAR, data, query);

        return revenueVal.toFixed(0);
      },
    },
    {
      desc: {
        [ORDER_PERIOD.TODAY]: t(`${translationKey}:ORDER_STATS.REVENUE_ALT_RATE.TODAY`),
        [ORDER_PERIOD.YESTERDAY]: t(`${translationKey}:ORDER_STATS.REVENUE_ALT_RATE.YESTERDAY`),
        [ORDER_PERIOD.LAST_WEEK]: t(`${translationKey}:ORDER_STATS.REVENUE_ALT_RATE.LAST_WEEK`),
      },
      class: 'financialGrowthCell',
      objectIndexer: 'order_revenue',
      value: 5,
      render: (orderPeriod, data) => {
        return calculateGrowthRateGateway(orderPeriod, data, ORDER_DELIVERY_TYPES.IG);
      },
    },
    {
      desc: {
        [ORDER_PERIOD.TODAY]: t(`${translationKey}:ORDER_STATS.REVENUE_GG.TODAY`),
        [ORDER_PERIOD.YESTERDAY]: t(`${translationKey}:ORDER_STATS.REVENUE_GG.YESTERDAY`),
        [ORDER_PERIOD.LAST_WEEK]: t(`${translationKey}:ORDER_STATS.REVENUE_GG.LAST_WEEK`),
      },
      class: 'financialCell',
      objectIndexer: 'order_revenue',
      value: 6,
      render: (orderPeriod, data) => {
        const query = generateDeliveryQuery(orderPeriod, getOptions(ORDER_DELIVERY_TYPES.GG, false));
        const revenueVal = generateValueForColumn(ACTION_TYPES.REGULAR, data, query);

        return revenueVal.toFixed(0);
      },
    },
    {
      desc: {
        [ORDER_PERIOD.TODAY]: t(`${translationKey}:ORDER_STATS.REVENUE_GG_RATE.TODAY`),
        [ORDER_PERIOD.YESTERDAY]: t(`${translationKey}:ORDER_STATS.REVENUE_GG_RATE.YESTERDAY`),
        [ORDER_PERIOD.LAST_WEEK]: t(`${translationKey}:ORDER_STATS.REVENUE_GG_RATE.LAST_WEEK`),
      },
      class: 'financialGrowthCell',
      objectIndexer: 'order_revenue',
      value: 7,
      render: (orderPeriod, data) => {
        return calculateGrowthRateGateway(orderPeriod, data, ORDER_DELIVERY_TYPES.GG);
      },
    },
    {
      desc: {
        [ORDER_PERIOD.TODAY]: t(`${translationKey}:ORDER_STATS.REVENUE_TOTAL.TODAY`),
        [ORDER_PERIOD.YESTERDAY]: t(`${translationKey}:ORDER_STATS.REVENUE_TOTAL.YESTERDAY`),
        [ORDER_PERIOD.LAST_WEEK]: t(`${translationKey}:ORDER_STATS.REVENUE_TOTAL.LAST_WEEK`),
      },
      class: 'overallRevenueCell',
      objectIndexer: 'order_revenue',
      value: 8,
      render: (orderPeriod, data) => {
        const query = generateDeliveryQuery(orderPeriod, getOptions(ORDER_DELIVERY_TYPES.ALL, false));
        const revenueVal = generateValueForColumn(ACTION_TYPES.REGULAR, data, query);

        return revenueVal.toFixed(0);
      },
    },
    {
      desc: {
        [ORDER_PERIOD.TODAY]: t(`${translationKey}:ORDER_STATS.REVENUE_TOTAL_RATE.TODAY`),
        [ORDER_PERIOD.YESTERDAY]: t(`${translationKey}:ORDER_STATS.REVENUE_TOTAL_RATE.YESTERDAY`),
        [ORDER_PERIOD.LAST_WEEK]: t(`${translationKey}:ORDER_STATS.REVENUE_TOTAL_RATE.LAST_WEEK`),
      },
      class: 'financialGrowthCell',
      objectIndexer: 'order_revenue',
      value: 9,
      render: (orderPeriod, data) => {
        return calculateGrowthRateGateway(orderPeriod, data, ORDER_DELIVERY_TYPES.ALL);
      },
    },
    {
      desc: {
        [ORDER_PERIOD.TODAY]: t(`${translationKey}:ORDER_STATS.ORDER_COUNT_ALT.TODAY`),
        [ORDER_PERIOD.YESTERDAY]: t(`${translationKey}:ORDER_STATS.ORDER_COUNT_ALT.YESTERDAY`),
        [ORDER_PERIOD.LAST_WEEK]: t(`${translationKey}:ORDER_STATS.ORDER_COUNT_ALT.LAST_WEEK`),
      },
      class: 'orderCountCell',
      objectIndexer: 'order_count',
      value: 10,
      render: (orderPeriod, data) => {
        const query = generateDeliveryQuery(orderPeriod, getOptions(ORDER_DELIVERY_TYPES.IG, false));
        return generateValueForColumn(ACTION_TYPES.REGULAR, data, query);
      },
    },
    {
      desc: {
        [ORDER_PERIOD.TODAY]: t(`${translationKey}:ORDER_STATS.ORDER_COUNT_ALT_RATE.TODAY`),
        [ORDER_PERIOD.YESTERDAY]: t(`${translationKey}:ORDER_STATS.ORDER_COUNT_ALT_RATE.YESTERDAY`),
        [ORDER_PERIOD.LAST_WEEK]: t(`${translationKey}:ORDER_STATS.ORDER_COUNT_ALT_RATE.LAST_WEEK`),
      },
      class: 'financialGrowthCell',
      objectIndexer: 'order_count',
      value: 11,
      render: (orderPeriod, data) => {
        return calculateGrowthRateGateway(orderPeriod, data, ORDER_DELIVERY_TYPES.IG);
      },
    },
    {
      desc: {
        [ORDER_PERIOD.TODAY]: t(`${translationKey}:ORDER_STATS.ORDER_COUNT_GG.TODAY`),
        [ORDER_PERIOD.YESTERDAY]: t(`${translationKey}:ORDER_STATS.ORDER_COUNT_GG.YESTERDAY`),
        [ORDER_PERIOD.LAST_WEEK]: t(`${translationKey}:ORDER_STATS.ORDER_COUNT_GG.LAST_WEEK`),
      },
      class: 'orderCountCell',
      objectIndexer: 'order_count',
      value: 12,
      render: (orderPeriod, data) => {
        const query = generateDeliveryQuery(orderPeriod, getOptions(ORDER_DELIVERY_TYPES.GG, false));
        return generateValueForColumn(ACTION_TYPES.REGULAR, data, query);
      },
    },
    {
      desc: {
        [ORDER_PERIOD.TODAY]: t(`${translationKey}:ORDER_STATS.ORDER_COUNT_GG_RATE.TODAY`),
        [ORDER_PERIOD.YESTERDAY]: t(`${translationKey}:ORDER_STATS.ORDER_COUNT_GG_RATE.YESTERDAY`),
        [ORDER_PERIOD.LAST_WEEK]: t(`${translationKey}:ORDER_STATS.ORDER_COUNT_GG_RATE.LAST_WEEK`),
      },
      class: 'financialGrowthCell',
      objectIndexer: 'order_count',
      value: 13,
      render: (orderPeriod, data) => {
        return calculateGrowthRateGateway(orderPeriod, data, ORDER_DELIVERY_TYPES.GG);
      },
    },
    {
      desc: {
        [ORDER_PERIOD.TODAY]: t(`${translationKey}:ORDER_STATS.ORDER_DOMAIN_GC.TODAY`),
        [ORDER_PERIOD.YESTERDAY]: t(`${translationKey}:ORDER_STATS.ORDER_DOMAIN_GC.YESTERDAY`),
        [ORDER_PERIOD.LAST_WEEK]: t(`${translationKey}:ORDER_STATS.ORDER_DOMAIN_GC.LAST_WEEK`),
      },
      class: 'dedicatedCourierCountCell',
      objectIndexer: 'order_domain_count',
      value: 14,
      render: (orderPeriod, data) => {
        const query = generateDeliveryQuery(orderPeriod, getOptions(ORDER_DOMAIN_TYPES.GC, false));
        return generateValueForColumn(ACTION_TYPES.REGULAR, data, query);
      },
    },
    {
      desc: {
        [ORDER_PERIOD.TODAY]: t(`${translationKey}:ORDER_STATS.ORDER_DOMAIN_G10.TODAY`),
        [ORDER_PERIOD.YESTERDAY]: t(`${translationKey}:ORDER_STATS.ORDER_DOMAIN_G10.YESTERDAY`),
        [ORDER_PERIOD.LAST_WEEK]: t(`${translationKey}:ORDER_STATS.ORDER_DOMAIN_G10.LAST_WEEK`),
      },
      class: 'G10Cell',
      objectIndexer: 'order_domain_count',
      value: 15,
      render: (orderPeriod, data) => {
        const query = generateDeliveryQuery(orderPeriod, getOptions(ORDER_DOMAIN_TYPES.G10, false));
        return generateValueForColumn(ACTION_TYPES.REGULAR, data, query);
      },
    },
    {
      desc: {
        [ORDER_PERIOD.TODAY]: t(`${translationKey}:ORDER_STATS.ORDER_DOMAIN_GB.TODAY`),
        [ORDER_PERIOD.YESTERDAY]: t(`${translationKey}:ORDER_STATS.ORDER_DOMAIN_GB.YESTERDAY`),
        [ORDER_PERIOD.LAST_WEEK]: t(`${translationKey}:ORDER_STATS.ORDER_DOMAIN_GB.LAST_WEEK`),
      },
      class: 'GBCell',
      objectIndexer: 'order_domain_count',
      value: 16,
      render: (orderPeriod, data) => {
        const query = generateDeliveryQuery(orderPeriod, getOptions(ORDER_DOMAIN_TYPES.GB, false));
        return generateValueForColumn(ACTION_TYPES.REGULAR, data, query);
      },
    },
  ];

  return [...columns];
};
