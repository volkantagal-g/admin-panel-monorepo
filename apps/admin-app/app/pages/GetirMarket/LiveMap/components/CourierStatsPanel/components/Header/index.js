import { useState, useRef, Suspense, lazy } from 'react';
import { Divider, Button, Spin, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import { filtersSelector } from '../../../../redux/selectors';
import useOnClickOutside from '@shared/shared/hooks/useOnClickOutside';
import useStyles from './styles';
import AnalyticsService from '@shared/services/analytics';
import { LIVE_MAP_EVENTS } from '@app/pages/GetirMarket/LiveMap/mixPanelEvents';
import {
  GETIR_10_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
} from '@shared/shared/constants';

const importBusyList = () => import('./components/BusyWarehouseList');
const importBelowTable = () => import('./components/BelowTable');
const importNoStockTable = () => import('./components/NoStockTable');

const BelowTable = lazy(importBelowTable);
const NoStockTable = lazy(importNoStockTable);
const BusyWarehouseList = lazy(importBusyList);

const DROPDOWN_KEYS = {
  BUSY: 'BUSY',
  BELOW: 'BELOW',
  NO_BREAD_STOCK: 'NO_BREAD_STOCK',
  NO_RAMADAN_PITA_STOCK: 'NO_RAMADAN_PITA_STOCK',
};

const Header = ({ title = '', headerCounts, wrapperKey = '' }) => {
  const classes = useStyles();
  const { t } = useTranslation('getirMarketLiveMapPage');

  const ref = useRef();

  const [activeDropdownKey, setActiveDropdownKey] = useState();
  const selectedDomainType = useSelector(filtersSelector.getDomainType);

  const handleClickDropdown = key => {
    if (key !== activeDropdownKey) setActiveDropdownKey(key);
    if (key === DROPDOWN_KEYS.BUSY) {
      AnalyticsService.track(LIVE_MAP_EVENTS.BUTTON_CLICK, {
        button: LIVE_MAP_EVENTS.COURIER_COUNTS_TABLE.BUSY_WAREHOUSE_CLICK,
        tableName: LIVE_MAP_EVENTS.COURIER_COUNTS_TABLE[wrapperKey],
      });
    }
    if (key === DROPDOWN_KEYS.BELOW) {
      AnalyticsService.track(LIVE_MAP_EVENTS.BUTTON_CLICK, {
        button: LIVE_MAP_EVENTS.COURIER_COUNTS_TABLE.WAREHOUSE_UNDER_COURIER_PLAN_CLICK,
        tableName: LIVE_MAP_EVENTS.COURIER_COUNTS_TABLE[wrapperKey],
      });
    }
  };

  useOnClickOutside(ref, () => setActiveDropdownKey());

  return (
    <div className={classes.courierCountsHeader}>
      {/* LEFT SECTION */}
      <section className={classes.alignCenter}>{title}</section>
      {/* RIGHT SECTION */}
      {!_.isEmpty(headerCounts) && (
        <section className={classes.alignCenter}>
          <Tooltip title={t('global:WAREHOUSE')}>
            <span className={classes.spans}>
              {t('WAREHOUSE_SHORT')}
            </span>
          </Tooltip>
          <Tooltip title={t('global:ACTIVE')}>
            <span className={`${classes.green} ${classes.spans}`}>
              {headerCounts?.free || 0}
            </span>
          </Tooltip>
          <Tooltip title={t('BUSY')}>
            <span className={`${classes.red} ${classes.spans}`}>
              {headerCounts?.busy?.length > 0 ? (
                <Button
                  size="small"
                  className={classes.triggerButton}
                  onMouseEnter={importBusyList}
                  onClick={() => handleClickDropdown(DROPDOWN_KEYS.BUSY)}
                >
                  {headerCounts.busy.length}
                </Button>
              ) : (
                0
              )}
            </span>
          </Tooltip>
          <Divider type="vertical" className={classes.divider} />
          <Tooltip title={t('UNDER_PLAN_TOOLTIP')}>
            <span className={classes.spans}>
              {t('UNDER_PLAN_SHORT')}
            </span>
          </Tooltip>
          <Tooltip title={t('UNDER_PLAN_TOOLTIP')}>
            <span className={`${classes.purple} ${classes.spans}`}>
              {headerCounts?.below?.length > 0 ? (
                <Button
                  size="small"
                  className={classes.triggerButton}
                  onMouseEnter={importBelowTable}
                  onClick={() => handleClickDropdown(DROPDOWN_KEYS.BELOW)}
                >
                  {headerCounts.below.length}
                </Button>
              ) : (
                0
              )}
            </span>
          </Tooltip>
          {
            (selectedDomainType === GETIR_10_DOMAIN_TYPE || selectedDomainType === GETIR_MARKET_DOMAIN_TYPE) && (
              <>
                <Divider type="vertical" className={classes.divider} />
                <Tooltip title={t('NO_BREAD_STOCK_WAREHOUSES_TOOLTIP')}>
                  <span className={classes.spans}>
                    {t('NO_BREAD_STOCK_WAREHOUSES_SHORT')}
                  </span>
                </Tooltip>
                <Tooltip title={t('NO_BREAD_STOCK_WAREHOUSES_TOOLTIP')}>
                  <span className={`${classes.purple} ${classes.spans}`}>
                    {headerCounts?.noBreadStock?.length > 0 ? (
                      <Button
                        size="small"
                        className={classes.triggerButton}
                        onMouseEnter={importNoStockTable}
                        onClick={() => handleClickDropdown(DROPDOWN_KEYS.NO_BREAD_STOCK)}
                      >
                        {headerCounts.noBreadStock.length}
                      </Button>
                    ) : (
                      0
                    )}
                  </span>
                </Tooltip>
                <Divider type="vertical" className={classes.divider} />
                <Tooltip title={t('NO_RAMADAN_PITA_STOCK_WAREHOUSES_TOOLTIP')}>
                  <span className={classes.spans}>
                    {t('NO_RAMADAN_PITA_STOCK_WAREHOUSES_SHORT')}
                  </span>
                </Tooltip>
                <Tooltip title={t('NO_RAMADAN_PITA_STOCK_WAREHOUSES_TOOLTIP')}>
                  <span className={`${classes.purple} ${classes.spans}`}>
                    {headerCounts?.noRamadanPita?.length > 0 ? (
                      <Button
                        size="small"
                        className={classes.triggerButton}
                        onMouseEnter={importNoStockTable}
                        onClick={() => handleClickDropdown(DROPDOWN_KEYS.NO_RAMADAN_PITA_STOCK)}
                      >
                        {headerCounts.noRamadanPita.length}
                      </Button>
                    ) : (
                      0
                    )}
                  </span>
                </Tooltip>
              </>
            )
          }
          {/* DROPDOWNS */}
          {!!activeDropdownKey && (
            <div key="DROPDOWN" ref={ref} className={classes.dropdownWrapper}>
              {activeDropdownKey === DROPDOWN_KEYS.BUSY && (
                <Suspense fallback={<Spin />}>
                  <BusyWarehouseList header={t('BUSY_WAREHOUSES_TOOLTIP')} data={headerCounts.busy} classes={classes} />
                </Suspense>
              )}
              {activeDropdownKey === DROPDOWN_KEYS.BELOW && (
                <Suspense fallback={<Spin />}>
                  <BelowTable title={() => t('UNDER_PLAN_TOOLTIP')} data={headerCounts.below} classes={classes} />
                </Suspense>
              )}
              {
                (selectedDomainType === GETIR_10_DOMAIN_TYPE || selectedDomainType === GETIR_MARKET_DOMAIN_TYPE) && (
                  <>
                    {activeDropdownKey === DROPDOWN_KEYS.NO_BREAD_STOCK && (
                      <Suspense fallback={<Spin />}>
                        <NoStockTable title={() => t('NO_BREAD_STOCK_WAREHOUSES_TOOLTIP')} data={headerCounts.noBreadStock} classes={classes} />
                      </Suspense>
                    )}
                    {activeDropdownKey === DROPDOWN_KEYS.NO_RAMADAN_PITA_STOCK && (
                      <Suspense fallback={<Spin />}>
                        <NoStockTable title={() => t('NO_RAMADAN_PITA_STOCK_WAREHOUSES_TOOLTIP')} data={headerCounts.noRamadanPita} classes={classes} />
                      </Suspense>
                    )}
                  </>
                )
              }
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Header;
