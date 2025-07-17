/* eslint-disable no-continue */
import { memo, useState } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Tabs, Tooltip } from 'antd';

import { getOrderStatsRows, getTotalCountryStats, getVisibilityOptions } from './config';
import { getLangKey } from '@shared/i18n';

import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import { filtersSelector, getSelectedDivisionSelector } from '../../redux/selectors';
import useStyles from './styles';
import './style.css';
import { numberFormat } from '@shared/utils/localization';

const { TabPane } = Tabs;

const TABLE = {
  city: {
    name: 'city',
    dimension: 'selectedCity',
  },
  country: {
    name: 'country',
    dimension: 'selectedCountry',
  },
  division: {
    name: 'division',
    dimension: 'selectedDivision',
  },
};

const renderRows = (dimension, orderStats, classes, t) => {
  const rows = getOrderStatsRows(dimension, t);
  const invisibleColumn = {};

  return rows.map((row, idx) => {
    return (
      // array of arrays and it will not update
      // eslint-disable-next-line react/no-array-index-key
      <tr key={idx}>
        <Columns
          cols={row}
          maxNumberOfCols={rows[0].length}
          invisibleColumn={invisibleColumn}
          orderStats={orderStats}
          classes={classes}
        />
      </tr>
    );
  });
};

const Columns = ({ cols, maxNumberOfCols, invisibleColumn, orderStats, classes }) => {
  const result = [];

  const selectedDivision = useSelector(getSelectedDivisionSelector);
  const { canAccess } = usePermission();
  const showFinancials = canAccess(permKey.PAGE_GETIR_MARKET_LIVE_MAP_SHOW_FINANCIALS);

  // if we show division stats, take those values for visibility config
  const visibilityDimension = selectedDivision ? TABLE.division.dimension : TABLE.country.dimension;

  const visibilityOptions = getVisibilityOptions(orderStats, showFinancials, visibilityDimension);

  for (let i = 0; i < maxNumberOfCols; i += 1) {
    if (invisibleColumn[i]) continue;

    const col = cols[i];

    if (col?.visibility) {
      const { hideAllColumn } = col.visibility;
      const { visible } = visibilityOptions[col.visibility.field];
      if (!visible) {
        // eslint-disable-next-line no-param-reassign
        if (hideAllColumn) invisibleColumn[i] = true;
        continue;
      }
    }
    // empty cell if there is nothing to render
    if (!col?.render && !col?.children) {
      let colClassNames = classes.emptyCell;
      if (typeof col?.className === 'function') {
        colClassNames += ` ${col.className()}`;
      }
      result.push(<td className={colClassNames} key={i} />);
      continue;
    }

    if (col.children) {
      const colClassName = col.className();
      result.push(
        <td className={colClassName} key={col.key}>
          {col.children.map(child => {
            const value = _.get(orderStats, child.field) || 0;
            const className = child.className(value);
            return (
              <Tooltip title={col.tooltip} key={child.field}>
                <span className={className}>
                  {child.render(value)}
                </span>
              </Tooltip>
            );
          })}
        </td>,
      );
      continue;
    }

    // base case
    const value = _.get(orderStats, col.field) || 0;
    const className = col.className(value);
    result.push(
      <td className={className} key={col.field}>
        <Tooltip title={col.tooltip}>
          {col.render(value)}
        </Tooltip>
      </td>,
    );
  }
  return result;
};

const TableRows = ({ classes, shownTable, selectedDivision, orderStats, t }) => {
  const getTableClassName = tableValue => {
    return `${classes.table} ${shownTable === tableValue ? '' : classes.hiddenTable}`;
  };

  return Object.values(TABLE).map(table => {
    if (!selectedDivision && table.name === TABLE.division.name) return null;

    return (
      <table key={table.name} className={getTableClassName(table.name)}>
        <tbody>{renderRows(table.dimension, orderStats, classes, t)}</tbody>
      </table>
    );
  });
};

const OrderStatsTable = ({ orderStats }) => {
  const { t } = useTranslation('getirMarketLiveMapPage');
  const classes = useStyles();
  const selectedCityName = useSelector(filtersSelector.getCityName);
  const selectedCountryName = getSelectedCountry().name[getLangKey()];
  const selectedDivision = useSelector(getSelectedDivisionSelector);
  const selectedDivisionName = _.get(selectedDivision, `name[${getLangKey()}]`, '');

  const [shownTable, setShownTable] = useState(TABLE.city.name);

  const totalCountryStats = getTotalCountryStats(orderStats, t);

  const handleShownTableChange = key => setShownTable(key);

  return (
    <div className={classes.container}>
      <div className={classes.mobileTabs}>
        <Tabs defaultActiveKey={TABLE.city.name} onChange={handleShownTableChange} size="small" tabBarGutter={8}>
          <TabPane tab={selectedCityName} key={TABLE.city.name} />
          <TabPane tab={selectedCountryName} key={TABLE.country.name} />
          {selectedDivision && (
            <TabPane tab={selectedDivisionName} key={TABLE.division.name} />
          )}
        </Tabs>
      </div>
      <div className={classes.tableContainer}>
        <TableRows
          orderStats={orderStats}
          selectedDivision={selectedDivision}
          classes={classes}
          shownTable={shownTable}
          t={t}
        />
      </div>
      <div className={classes.totalCountryContainer}>
        <span>
          {t('global:TOTAL')} {selectedCountryName}:
        </span>
        <div className={classes.totalCountryData}>
          <Tooltip title={totalCountryStats.today.tooltip}>
            <span className={classes.rightMargin}>
              {numberFormat({ maxDecimal: 0 }).format(totalCountryStats.today.value)}
            </span>
          </Tooltip>
          (
          <Tooltip title={totalCountryStats.lastWeek.tooltip}>
            <span className={classes.rightMargin}>
              {numberFormat({ maxDecimal: 0 }).format(totalCountryStats.lastWeek.value)}
            </span>
          </Tooltip>
          <Tooltip title={totalCountryStats.growth.tooltip}>
            <span className={totalCountryStats.growth.className}>
              {numberFormat({ maxDecimal: 0 }).format(totalCountryStats.growth.value)}
            </span>
          </Tooltip>
          )
        </div>
      </div>
    </div>
  );
};

export default memo(OrderStatsTable);
