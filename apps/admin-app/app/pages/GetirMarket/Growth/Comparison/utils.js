import moment from 'moment';
import { forEach, isEmpty, isNumber, sumBy as _sumBy, orderBy as _orderBy } from 'lodash';

import { getUTCMinutesFromMinutesOfDay } from '@shared/utils/common';
import { MINUTES_IN_A_HOUR } from '@shared/shared/constants';
import { promoObjectiveTypes } from '@shared/shared/constantValues';
import { numberFormat } from '@shared/utils/localization';
import { getLangKey } from '@shared/i18n';

export const numberFormatter = (num, maxDecimal = 0) => {
  if (!isNumber(num)) {
    return 0;
  }
  return numberFormat({ maxDecimal }).format(num);
};

export const formatDateRange = dateRange => {
  if (!dateRange) {
    return '';
  }

  if (dateRange[1].diff(dateRange[0], 'hours') >= 24) {
    return `${moment(dateRange[0]).format('DD/MM')} - ${moment(dateRange[1]).format('DD/MM')}`;
  }

  return moment(dateRange[0]).format('DD/MM');
};

export const getHours = (hourRangeMin, hourRangeMax, timezone) => {
  const hourRange = [];

  if (!(hourRangeMin === 0 && hourRangeMax === 24)) {
    const startHour = hourRangeMin;
    const endHour = hourRangeMax;
    for (let i = startHour; i < endHour; i += 1) {
      hourRange.push(
        moment
          .tz(timezone)
          .startOf('day')
          .add(i, 'hours')
          .utc()
          .hour(),
      );
    }
  }

  return hourRange;
};

export const getFormattedPromoRatesDataWithObjectiveTypes = promoData => {
  const promoCodeMap = {};
  const formattedData = [];
  if (isEmpty(promoData)) {
    return formattedData;
  }
  Object.entries(promoData).forEach(([key, value]) => {
    promoCodeMap.TOTAL_ORDER = {
      key: '_TOTAL_ORDER',
      [`${key}_orderCount`]: value.totalOrder,
      [`${key}_ratio`]: (value.totalOrder / value.totalOrder),
      ...promoCodeMap.TOTAL_ORDER,
    };
    promoCodeMap.ORGANIC_ORDER = {
      key: '_ORGANIC_ORDER',
      ...promoCodeMap.ORGANIC_ORDER,
      [`${key}_orderCount`]: value.organicOrders,
      [`${key}_ratio`]: (value.organicOrders / promoCodeMap.TOTAL_ORDER[`${key}_orderCount`]) || 0,
    };
    promoCodeMap.PROMO_ORDER = {
      key: '_PROMO_ORDER',
      ...promoCodeMap.PROMO_ORDER,
      [`${key}_orderCount`]: value.usedPromoOrders,
      [`${key}_ratio`]: (value.usedPromoOrders / promoCodeMap.TOTAL_ORDER[`${key}_orderCount`]) || 0,
    };
    promoCodeMap.PROMO_USED_COUNT = {
      key: '_PROMO_USED_COUNT',
      ...promoCodeMap.PROMO_USED_COUNT,
      [`${key}_orderCount`]: value.usedTotalPromoCounts || 0,
      [`${key}_ratio`]: 0,
    };
    promoCodeMap.GETIR_FINANCED = {
      key: '_GETIR_FINANCED',
      ...promoCodeMap.GETIR_FINANCED,
      [`${key}_orderCount`]: value.getirFinancedCount,
      [`${key}_ratio`]: (value.getirFinancedCount / value.usedTotalPromoCounts) || 0,
    };
    promoCodeMap.SUPPLIER_SUPPORTED = {
      key: '_SUPPLIER_SUPPORTED',
      ...promoCodeMap.SUPPLIER_SUPPORTED,
      [`${key}_orderCount`]: value.supplierSupportedCount,
      [`${key}_ratio`]: (value.supplierSupportedCount / value.usedTotalPromoCounts) || 0,
    };
    promoCodeMap.THIRD_PARTY_SUPPORTED = {
      key: '_THIRD_PARTY_SUPPORTED',
      ...promoCodeMap.THIRD_PARTY_SUPPORTED,
      [`${key}_orderCount`]: value.thirdPartySupportedCount,
      [`${key}_ratio`]: (value.thirdPartySupportedCount / value.usedTotalPromoCounts) || 0,
    };

    Object.entries(value.data).forEach(([k, v], i) => {
      const promoGroupKey = promoObjectiveTypes[k]?.[getLangKey()] || 'N/A';
      const currentIndex = 6 + i;
      const currentKey = `_${promoGroupKey}`;
      promoCodeMap[promoGroupKey] = {
        ...promoCodeMap[promoGroupKey],
        [`${key}_orderCount`]: v.orderCount,
        [`${key}_ratio`]: (v.orderCount / value.totalOrder),
        index: currentIndex,
        key: currentKey,
        objectiveType: k,
        rowExpandable: true,
        items: { ...promoCodeMap[promoGroupKey]?.items },
      };

      forEach(v.items, ({ promoCode, orderCount }) => {
        promoCodeMap[promoGroupKey].items[promoCode] = {
          ...promoCodeMap[promoGroupKey]?.items?.[promoCode],
          [`${key}_orderCount`]: orderCount,
          [`${key}_ratio`]: (orderCount / value.totalOrder),
        };
      });
    });
  });

  Object.entries(promoCodeMap).forEach(([promoCode, value]) => {
    const mappedPromoGroup = {
      promoCode,
      ...value,
    };

    if (Object.values((value?.items || {})).length > 0) {
      mappedPromoGroup.promos = [];
      Object.entries(value.items).forEach(([promoGroupItemCode, promoGroupItemValue], promoGroupItemKey) => {
        mappedPromoGroup.promos.push({
          key: promoGroupItemKey.toString(),
          promoCode: promoGroupItemCode,
          ...promoGroupItemValue,
        });
      });
    }

    formattedData.push(mappedPromoGroup);
  });

  return formattedData;
};

export const getFormattedPromoRatesDataWithoutObjectiveTypes = promoData => {
  const formattedData = [];
  const promoCodeMap = {};
  if (isEmpty(promoData)) {
    return formattedData;
  }

  Object.entries(promoData).forEach(([key, value]) => {
    promoCodeMap.TOTAL = {
      ...promoCodeMap.TOTAL,
      [`${key}_orderCount`]: value.totalOrder,
      [`${key}_ratio`]: (value.totalOrder / value.totalOrder),
    };
    promoCodeMap.ORGANIC = {
      ...promoCodeMap.ORGANIC,
      [`${key}_orderCount`]: value.organicOrders,
      [`${key}_ratio`]: (value.organicOrders / promoCodeMap.TOTAL[`${key}_orderCount`]) || 0,
    };
    Object.entries(value.data).forEach(([, v]) => {
      forEach(v.items, ({ promoCode, orderCount }) => {
        promoCodeMap[promoCode] = {
          ...promoCodeMap[promoCode],
          [`${key}_orderCount`]: orderCount,
          [`${key}_ratio`]: (orderCount / promoCodeMap.TOTAL[`${key}_orderCount`]),
        };
      });
    });
  });

  Object.entries(promoCodeMap).forEach(([promoCode, value]) => {
    formattedData.push({
      promoCode,
      ...value,
    });
  });

  return formattedData;
};

export const getFormattedNewClientStats = newClientStats => {
  const formattedData = [];
  const formattedDataMap = {
    download: { title: 'DOWNLOAD' },
    signedup: { title: 'SIGNUP' },
  };

  if (isEmpty(newClientStats)) return formattedData;

  Object.entries(newClientStats).forEach(([key, value]) => {
    formattedDataMap.download = {
      ...formattedDataMap.download,
      [`${key}_count`]: value.downloadClientCount,
      [`${key}_ratio`]: (value.downloadClientCount / value.downloadClientCount),

    };
    formattedDataMap.signedup = {
      ...formattedDataMap.signedup,
      [`${key}_count`]: value.signupClientCount,
      [`${key}_ratio`]: (value.signupClientCount / value.downloadClientCount),
    };
  });

  Object.entries(formattedDataMap).forEach(([, value]) => {
    formattedData.push({ ...value });
  });

  return formattedData;
};

export const getFormattedClientOrderCounts = orderCountStats => {
  const formattedData = [];
  const orderCountStatsMap = {};
  const total = { orderRank: 'TOTAL' };

  if (isEmpty(orderCountStats)) return formattedData;

  Object.entries(orderCountStats).forEach(([key, value]) => {
    total[`${key}_orderCount`] = 0;
    total[`${key}_ratio`] = 1;
    Object.entries(value).forEach(([, data]) => {
      total[`${key}_orderCount`] += _sumBy(data, 'order_count');
      forEach(data, item => {
        orderCountStatsMap[item.client_order_rank] = {
          ...orderCountStatsMap[item.client_order_rank],
          [`${key}_orderCount`]: item.order_count,
          [`${key}_ratio`]: item.order_count / total[`${key}_orderCount`],
        };
      });
    });
  });

  formattedData.push(total);
  Object.entries(orderCountStatsMap).forEach(([orderRank, data]) => {
    formattedData.push({
      orderRank,
      ...data,
    });
  });

  return formattedData;
};

export const getFormattedWarehouseStats = ({ filters, warehouseStats }) => {
  const formattedData = [];
  const warehouseStatsMap = {};
  const total = {};

  if (isEmpty(warehouseStats)) {
    return formattedData;
  }

  Object.entries(warehouseStats).forEach(([key, value]) => {
    total[`${key}_orderCount`] = 0;
    Object.entries(value).forEach(([, data]) => {
      let tempData = data;
      if (filters.warehouse) {
        tempData = data.filter(({ warehouse }) => warehouse === filters.warehouse);
      }
      total[`${key}_orderCount`] += _sumBy(tempData, 'orderCount');
      forEach(tempData, item => {
        warehouseStatsMap[item.warehouse] = {
          ...warehouseStatsMap[item.warehouse],
          id: item.warehouse,
          [`${key}_orderCount`]: item.orderCount,
          [`${key}_ratio`]: item.orderCount / total[`${key}_orderCount`],
        };
      });
    });
  });

  Object.entries(warehouseStatsMap).forEach(([, data]) => {
    formattedData.push({ ...data });
  });

  return formattedData;
};

export const getMinutes = (startMin, endMin, timezone) => {
  const minutePeriods = getUTCMinutesFromMinutesOfDay({ startMin, endMin, step: 20 });
  const tz = moment.tz(timezone).utcOffset();

  return minutePeriods.map(minute => ((minute - tz) < 0 ? (minute - tz + 1440) : (minute - tz)));
};

// TODO: This will be removed when the getClientOrderCounts endpoint accepts warehouse filter
export const getFormattedClientOrderCountsFromOldPanel = orderCountStats => {
  const formattedData = [];
  const orderCountStatsMap = {};
  const total = { orderRank: 'TOTAL', sortOrder: 0 };

  if (isEmpty(orderCountStats)) return formattedData;

  Object.entries(orderCountStats).forEach(([key, value]) => {
    total[`${key}_orderCount`] = _sumBy(value, 'orderCount');
    Object.entries(value).forEach(([, data]) => {
      orderCountStatsMap[data.rank] = {
        ...orderCountStatsMap[data.rank],
        [`${key}_orderCount`]: data.orderCount,
        [`${key}_ratio`]: data.orderCount / total[`${key}_orderCount`],
      };
    });
  });

  formattedData.push(total);

  Object.entries(orderCountStatsMap).forEach(([orderRank, data]) => {
    formattedData.push({
      orderRank,
      ...data,
      sortOrder: Number(orderRank.split('-')[0]) || Number.MAX_SAFE_INTEGER,
    });
  });
  return _orderBy(formattedData, 'sortOrder');
};

export const calculatePercentDiff = (percentOne, percentTwo) => {
  const percOne = percentOne || 0;
  const percTwo = percentTwo || 0;

  let percentageDiff;
  if (percOne === 0) {
    percentageDiff = '-';
  }
  else if (percTwo === 0) {
    percentageDiff = -1;
  }
  else {
    percentageDiff = ((percTwo - percOne) / percOne);
  }

  return percentageDiff;
};

export const calculateOrderCountDiff = (endDateCount = 0, startDateCount = 0) => {
  return endDateCount - startDateCount;
};

export const getDiffClassName = value => {
  if (value > 0) {
    return 'pos';
  }

  return 'neg';
};

export const getStartMinOfCurrentHour = () => {
  return moment().hours() * MINUTES_IN_A_HOUR;
};

export const getRowClassName = (classes, index, record) => {
  if (record?.promoCode === 'GETIR_FINANCED') return classes.purpleText;
  if (record?.promoCode === 'PROMO_ORDER') return classes.highlightBorderBottom;
  if (isNumber(record?.index)) return classes.tableRowPurpleBg;
  return index % 2 === 0 ? classes.tableRowLight : classes.tableRowDark;
};
