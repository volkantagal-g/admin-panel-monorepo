import { get } from 'lodash';
import { memo, useEffect, useMemo, useState } from 'react';

import { t } from '@shared/i18n';
import {
  COUNTRY_CODES,
  GETIR_DOMAIN_TYPE_CODES,
  GETIR_FOOD_DOMAIN_TYPE,
} from '@shared/shared/constants';
import { DEFFAULT_TOTAL_STATS } from '../constants';

const WarehouseTotalCounts = ({
  warehouseMap,
  courierPlanAndCounts,
  countryId,
  domainType,
  warehouseId,
  searchTerm,
  classes,
}) => {
  const [totalStats, setTotalStats] = useState(DEFFAULT_TOTAL_STATS);

  useEffect(() => {
    const countryCode = COUNTRY_CODES[countryId];

    if (domainType) {
      setTotalStats(
        get(
          courierPlanAndCounts,
          [
            'data',
            'byCountryCodes',
            countryCode,
            'domainType',
            domainType,
            'warehousesMap',
            warehouseId,
          ],
          DEFFAULT_TOTAL_STATS,
        ),
      );
    }
    else {
      setTotalStats(
        get(warehouseMap, warehouseId, DEFFAULT_TOTAL_STATS),
      );
    }
  }, [countryId, courierPlanAndCounts, domainType, warehouseId, warehouseMap]);

  const warehouseName = useMemo(
    () => warehouseMap[warehouseId]?.name,
    [warehouseId, warehouseMap],
  );

  if (warehouseName && !warehouseName.toLowerCase().includes(searchTerm)) {
    return null;
  }

  return (
    <tr className={classes.parentTableRow}>
      <td className={classes.rowName}>{warehouseName}</td>
      <td>{totalStats.planned}</td>
      <td>{totalStats.total}</td>
      <td>{totalStats.free}</td>
      <td title={t('foodLiveMapPage:ACTIVE')}>
        {totalStats.activeFoodCouriers}
      </td>
      <td title={t('foodLiveMapPage:ACTIVE_NON_FOOD_COURIERS')}>
        {GETIR_FOOD_DOMAIN_TYPE !== domainType &&
        GETIR_DOMAIN_TYPE_CODES.includes(domainType)
          ? totalStats.activeNonFoodCouriers
          : '-'}
      </td>
      <td title={t('foodLiveMapPage:BUSY')}>{totalStats.busy}</td>
      <td title={t('foodLiveMapPage:UTILIZATION')}>
        {totalStats.utilization.toFixed(0)}%
      </td>
    </tr>
  );
};

export default memo(WarehouseTotalCounts);
