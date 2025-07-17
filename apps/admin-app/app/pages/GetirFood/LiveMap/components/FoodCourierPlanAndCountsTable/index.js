import { useState } from 'react';
import { get, find } from 'lodash';
import { Button } from 'antd';

import { GETIR_FOOD_DOMAIN_TYPE, GETIR_DOMAIN_TYPE_CODES } from '@shared/shared/constants';
import { getLangKey, t } from '@shared/i18n';
import useStyles from './styles';

const domainTypes = {
  2: {
    tr: 'GY Dedike',
    en: 'GF Dedicated',
  },
};

const domainTypeList = [GETIR_FOOD_DOMAIN_TYPE];

const FoodCourierPlanAndCountsTable = props => {
  const classes = useStyles();
  const { courierPlanAndCounts, warehouses, currentCityId } = props;
  const [expandableKeys, setExpandableKeys] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const renderTotalCounts = ({ domainType, dataKey: tempDataKey }) => {
    const dataKey = tempDataKey.split('.');
    const totalStats = get(courierPlanAndCounts, ['data', ...dataKey, 'domainType', 2, 'total'], {
      planned: 0,
      total: 0,
      free: 0,
      activeFoodCouriers: 0,
      activeNonFoodCouriers: 0,
      busy: 0,
      utilization: 0,
    });

    return (
      <>
        <td title={t('foodLiveMapPage:PLANNED')}>{totalStats.planned}</td>
        <td title={t('foodLiveMapPage:ACTUAL')}>{totalStats.total}</td>
        <td title={t('foodLiveMapPage:FREE')}>{totalStats.free}</td>
        <td title={t('foodLiveMapPage:ACTIVE')}>{totalStats.activeFoodCouriers}</td>
        <td title={t('foodLiveMapPage:ACTIVE_NON_FOOD_COURIERS')}>-</td>
        <td title={t('foodLiveMapPage:BUSY')}>{totalStats.busy}</td>
        <td title={t('foodLiveMapPage:UTILIZATION')}>{totalStats.utilization.toFixed(0)}%</td>
      </>
    );
  };

  const getWarehouseListByCity = ({ cityId, domainType }) => {
    if (domainType) {
      return Object.keys(get(courierPlanAndCounts, ['data', cityId, 'domainType', domainType, 'warehousesMap'], {}));
    }
    return get(courierPlanAndCounts, ['data', 'total', 'total', 'warehouses'], []).map(item => {
      return item.warehouseId;
    });
  };

  const renderWarehouseTotalCountsByCity = ({ cityId, domainType, warehouseId }) => {
    let totalStats;

    if (domainType) {
      totalStats = get(courierPlanAndCounts, ['data', cityId, 'domainType', domainType, 'warehousesMap', warehouseId], {
        planned: 0,
        total: 0,
        free: 0,
        activeFoodCouriers: 0,
        activeNonFoodCouriers: 0,
        busy: 0,
        utilization: 0,
      });
    }
    else {
      totalStats = find(get(courierPlanAndCounts, 'data.total.total.warehouses'), { warehouseId }) || {
        planned: 0,
        total: 0,
        free: 0,
        activeFoodCouriers: 0,
        activeNonFoodCouriers: 0,
        busy: 0,
        utilization: 0,
      };
    }

    const warehouseName = get(find(warehouses, { id: warehouseId }), 'name');

    if (warehouseName && !warehouseName.toLowerCase().includes(searchTerm)) {
      return null;
    }

    return (
      <tr className={classes.parentTableRow}>
        <td className={classes.rowName}>{warehouseName}</td>
        <td title={t('foodLiveMapPage:PLANNED')}>{totalStats.planned}</td>
        <td title={t('foodLiveMapPage:ACTUAL')}>{totalStats.total}</td>
        <td title={t('foodLiveMapPage:FREE')}>{totalStats.free}</td>
        <td title={t('foodLiveMapPage:ACTIVE')}>{totalStats.activeFoodCouriers}</td>
        <td title={t('foodLiveMapPage:ACTIVE_NON_FOOD_COURIERS')}>
          {GETIR_FOOD_DOMAIN_TYPE !== domainType && GETIR_DOMAIN_TYPE_CODES.includes(domainType) ? totalStats.activeNonFoodCouriers : '-'}
        </td>
        <td title={t('foodLiveMapPage:BUSY')}>{totalStats.busy}</td>
        <td title={t('foodLiveMapPage:UTILIZATION')}>{totalStats.utilization.toFixed(0)}%</td>
      </tr>
    );
  };

  const handleTotalRowClick = key => {
    setExpandableKeys({
      ...expandableKeys,
      [key]: !expandableKeys[key],
    });
  };

  const handleTermChange = event => {
    setSearchTerm(event.target.value.trim());
  };

  return (
    <div className={classes.courierCountsWrapper}>
      <div>
        <input className={classes.searchBox} placeholder="Depo" type="text" value={searchTerm} onInput={handleTermChange} />
      </div>
      <div className={classes.tableHeaderDiv}>
        <Button classname={classes.tableHeaderInfoButton} disabled variant="contained" shape="round" size="small">
          {get(props, ['currentCity', 'name', getLangKey()])}
        </Button>
      </div>
      <table>
        {domainTypeList.map(domainType => {
          return (
            <>
              <tr
                className={classes.parentTableRow}
                onClick={() => {
                  return handleTotalRowClick(`city${domainType}`);
                }}
              >
                <td className={classes.rowName}>{domainTypes[domainType][getLangKey()]}</td>
                {renderTotalCounts({ domainType, dataKey: currentCityId })}
              </tr>
              {expandableKeys[`city${domainType}`] ? (
                <tr>
                  <td colSpan={8} className={classes.expandedRow}>
                    <table className={classes.expandedTable}>
                      {getWarehouseListByCity({
                        cityId: currentCityId,
                        domainType,
                      }).map(warehouseId => {
                        return renderWarehouseTotalCountsByCity({
                          cityId: currentCityId,
                          domainType,
                          warehouseId,
                        });
                      })}
                    </table>
                  </td>
                </tr>
              ) : null}
            </>
          );
        })}
      </table>
      <hr />
      <div className={classes.tableHeaderDiv}>
        <Button classname={classes.tableHeaderInfoButton} disabled variant="contained" shape="round" size="small">
          {get(props, ['currentCountry', 'name', getLangKey()])}
        </Button>
      </div>
      <table>
        <>
          <tr
            className={classes.parentTableRow}
            onClick={() => {
              return handleTotalRowClick(`country${GETIR_FOOD_DOMAIN_TYPE}`);
            }}
          >
            <td className={classes.rowName}>{domainTypes[GETIR_FOOD_DOMAIN_TYPE][getLangKey()]} (TR)</td>
            {renderTotalCounts({ GETIR_FOOD_DOMAIN_TYPE, dataKey: 'byCountryCodes.TR' })}
          </tr>
        </>
      </table>
    </div>
  );
};

export default FoodCourierPlanAndCountsTable;
