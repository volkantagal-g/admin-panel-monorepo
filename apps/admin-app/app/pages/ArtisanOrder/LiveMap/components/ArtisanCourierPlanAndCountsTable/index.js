import { useState } from 'react';
import { get, find } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { GETIR_LOCALS_DOMAIN_TYPE, GETIR_DOMAIN_TYPE_CODES } from '@shared/shared/constants';
import { getLangKey } from '@shared/i18n';
import useStyles from './styles';
import { Creators } from '../../redux/actions';
import { numberFormatWithoutDecimal } from '../../utils';

const domainTypes = {
  [GETIR_LOCALS_DOMAIN_TYPE]: {
    tr: 'GÇ Dedike',
    en: 'GL Dedicated',
  },
};

const domainTypeList = [GETIR_LOCALS_DOMAIN_TYPE];

const ArtisanCourierPlanAndCountsTable = props => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation();
  const { courierPlanAndCounts, warehouses, currentCityId } = props;
  const [expandableKeys, setExpandableKeys] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const renderTotalCounts = ({ dataKey: tempDataKey }) => {
    const dataKey = tempDataKey.split('.');
    const totalStats = get(courierPlanAndCounts, ['data', ...dataKey, 'domainType', GETIR_LOCALS_DOMAIN_TYPE, 'total'], {
      planned: 0,
      total: 0,
      free: 0,
      activeLocalsCouriers: 0,
      activeNonLocalsCouriers: 0,
      busy: 0,
      utilization: 0,
    });

    return (
      <>
        <td>{totalStats.planned}</td>
        <td>{totalStats.total}</td>
        <td>{totalStats.free}</td>
        <td>{totalStats.activeLocalsCouriers}</td>
        <td>-</td>
        <td>{totalStats.busy}</td>
        <td>{numberFormatWithoutDecimal.format(totalStats.utilization)}</td>
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
        activeLocalsCouriers: 0,
        activeNonLocalsCouriers: 0,
        busy: 0,
        utilization: 0,
      });
    }
    else {
      totalStats = find(get(courierPlanAndCounts, 'data.total.total.warehouses'), { warehouseId }) || {
        planned: 0,
        total: 0,
        free: 0,
        activeLocalsCouriers: 0,
        activeNonLocalsCouriers: 0,
        busy: 0,
        utilization: 0,
      };
    }

    const warehouseName = get(find(warehouses, { id: warehouseId }), 'name');

    if (warehouseName && !warehouseName.toLowerCase().includes(searchTerm)) {
      return null;
    }
    return (
      <tr className={classes.parentTableRow} key={`renderWarehouseTotalCountsByCity-${[cityId, domainType, warehouseId].join('-')}`}>
        <td className={classes.rowName}>{warehouseName}</td>
        <td>{totalStats.planned}</td>
        <td>{totalStats.total}</td>
        <td>{totalStats.free}</td>
        <td>{totalStats.activeLocalsCouriers}</td>
        <td>
          {GETIR_LOCALS_DOMAIN_TYPE !== domainType && GETIR_DOMAIN_TYPE_CODES.includes(domainType) ? totalStats.activeNonFoodCouriers : '-'}
        </td>
        <td>{totalStats.busy}</td>
        <td>{numberFormatWithoutDecimal.format(totalStats.utilization)}</td>
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
    const searchValue = event.target.value.trim();
    setSearchTerm(searchValue);
    dispatch(Creators.setWarehouseSearchTerm({ searchValue }));
  };

  return (
    <div className={classes.courierCountsWrapper}>
      <div>
        <input className={classes.searchBox} placeholder={t('WAREHOUSE')} type="text" value={searchTerm} onChange={handleTermChange} />
      </div>
      <table>
        {domainTypeList.map(domainType => {
          return (
            <tbody key={domainType}>
              <tr
                key={`${domainType}-1`}
                className={classes.parentTableRow}
                onClick={() => {
                  return handleTotalRowClick(`city${domainType}`);
                }}
              >
                <td key={`${domainType}-1-domainTypeName`} className={classes.rowName}>
                  {domainTypes[domainType][getLangKey()]}
                </td>
                {renderTotalCounts({ domainType, dataKey: currentCityId })}
              </tr>
              {expandableKeys[`city${domainType}`] ? (
                <tr key={`${domainType}-2`}>
                  <td colSpan={8} className={classes.expandedRow}>
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
                  </td>
                </tr>
              ) : null}
            </tbody>
          );
        })}
      </table>
      <hr />
      <table>
        <tbody>
          <tr
            key="ArtisanCourierPlanAndCountsTable-totalRow-tr"
            className={classes.parentTableRow}
            onClick={() => {
              return handleTotalRowClick(`country${GETIR_LOCALS_DOMAIN_TYPE}`);
            }}
          >
            <td className={classes.rowName}>{domainTypes[GETIR_LOCALS_DOMAIN_TYPE][getLangKey()]} (TR)</td>
            {renderTotalCounts({ GETIR_LOCALS_DOMAIN_TYPE, dataKey: 'byCountryCodes.TR' })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ArtisanCourierPlanAndCountsTable;
