import { getLimitAndOffset } from '@shared/utils/common';

import { PERFORMANCE_CLASS_OPTIONS, LOYALTY_LEVELS_OPTIONS } from './constants';

export const filterConfiguration = ({ courierId, performanceGroup, levelGroup, cityId, warehouseId, startDate, endDate, currentPage, rowsPerPage }) => {
  const params = {};
  const { limit, offset } = getLimitAndOffset({ rowsPerPage, currentPage });

  if (courierId) {
    params.courierId = courierId;
  }

  if (levelGroup) {
    let level = null;
    switch (levelGroup) {
      case LOYALTY_LEVELS_OPTIONS.NOVICE:
        level = 'NOVICE';
        break;
      case LOYALTY_LEVELS_OPTIONS.ROOKIE:
        level = 'ROOKIE';
        break;
      case LOYALTY_LEVELS_OPTIONS.INTERMEDIATE:
        level = 'INTERMEDIATE';
        break;
      case LOYALTY_LEVELS_OPTIONS.EXPERT:
        level = 'EXPERT';
        break;
      default:
        level = 'MASTER';
        break;
    }
    params.levelGroup = level;
  }

  if (performanceGroup) {
    let group = null;
    switch (performanceGroup) {
      case PERFORMANCE_CLASS_OPTIONS.STANDARD:
        group = 'STANDARD';
        break;
      case PERFORMANCE_CLASS_OPTIONS.GOOD:
        group = 'GOOD';
        break;
      case PERFORMANCE_CLASS_OPTIONS.EXCELLENT:
        group = 'EXCELLENT';
        break;
      default:
        group = 'ELITE';
        break;
    }
    params.performanceGroup = group;
  }

  if (warehouseId) {
    params.warehouseId = warehouseId;
  }

  if (cityId) {
    params.cityId = cityId;
  }

  if (startDate) {
    params.startDate = startDate;
  }

  if (endDate) {
    params.endDate = endDate;
  }

  params.limit = limit;
  params.offset = offset;

  return params;
};

export const getDates = dateRange => {
  const startDate = dateRange?.length > 0 || dateRange !== null ? dateRange[0]?.format('YYYY-MM-DD') : null;
  const endDate = dateRange?.length > 0 || dateRange !== null ? dateRange[1]?.format('YYYY-MM-DD') : null;
  return { startDate, endDate };
};
