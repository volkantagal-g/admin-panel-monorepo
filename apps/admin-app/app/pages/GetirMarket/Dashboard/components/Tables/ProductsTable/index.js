import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Empty } from 'antd';

import AnalyticsService from '@shared/services/analytics';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getSelectedCountryDivision } from '@shared/redux/selectors/countrySelection';
import useDebounce from '@shared/shared/hooks/useDebounce';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import TableFooter from '../TableFooter';
import ProductTableHeader from './ProductTableHeader';
import { getColumns } from './config';
import { getProductSaleSelector, filtersSelector } from '../../../redux/selectors';
import { calcFilteredTotalCount, calcFilteredTotalPrice, calcFilteredRate, getRowClassName } from '../utils';
import { salesGroupType } from './constants';

import useParentStyles from '../styles';
import useStyles from './styles';
import { MARKET_DASHBOARD_EVENTS } from '../../../mixPanelEvents';

const ProductsTable = ({ defaultSelectedDivisionCountries }) => {
  const tableData = useSelector(getProductSaleSelector.getData);
  const isPending = useSelector(getProductSaleSelector.isPending);
  const selectedDivisionCountries = useSelector(filtersSelector.getSelectedDivisionCountries) || defaultSelectedDivisionCountries;
  const selectedDivision = getSelectedCountryDivision();

  const { t } = useTranslation('getirMarketDashboardPage');

  const [limit, setLimit] = useState(10);
  const [selectedTableType, setSelectedTableType] = useState(() => salesGroupType(t).product);
  const [searchValue, setSearchValue] = useState(null);

  const classes = useStyles();
  const parentClasses = useParentStyles();

  const debouncedSearchedValue = useDebounce(searchValue, DEFAULT_DEBOUNCE_MS);

  const data = useMemo(() => {
    const dataSource = tableData[selectedTableType?.dataSource] || [];
    if (debouncedSearchedValue && debouncedSearchedValue === searchValue) {
      const lowerCaseSearchValue = debouncedSearchedValue.toLowerCase();
      return dataSource.filter(({ name }) => name?.toLowerCase().includes(lowerCaseSearchValue));
    }
    return dataSource;
  }, [debouncedSearchedValue, searchValue, selectedTableType, tableData]);

  useEffect(() => {
    if (debouncedSearchedValue) {
      AnalyticsService.track(MARKET_DASHBOARD_EVENTS.SEARCHED.EVENT_NAME, { keyword: debouncedSearchedValue, component: 'ProductsTable' });
    }
  }, [debouncedSearchedValue]);

  const tableColumns = useMemo(
    () => getColumns({
      totalPrice: tableData.totalAllPrice,
      title: selectedTableType.fullName,
      classes: parentClasses,
    }, t),
    [parentClasses, selectedTableType.fullName, tableData.totalAllPrice, t],
  );

  const handleSelectedTableType = type => {
    setSelectedTableType(type);
    AnalyticsService.track(
      MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.EVENT_NAME,
      { button: `Table - ${type?.dataSource}`, tableName: MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.TABLE_SORTING.PRODUCTS.NAME },
    );
  };

  const handleSearch = term => {
    setSearchValue(term);
  };

  const handleSort = (pagination, filters, sort) => {
    AnalyticsService.track(
      MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.EVENT_NAME,
      {
        button: MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.TABLE_SORTING.PRODUCTS[sort?.columnKey],
        tableName: MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.TABLE_SORTING.PRODUCTS.NAME,
      },
    );
  };

  // multiple country data is not possible for product table
  const isProductTableDisabled = selectedDivision && selectedDivisionCountries.length !== 1;

  const handleLimit = limitNumber => {
    if (limitNumber === 'All') {
      setLimit(50000);
    }
    else setLimit(limitNumber);
  };

  return isProductTableDisabled ? (
    <Empty
      imageStyle={{ height: '80px' }}
      description={(
        <span className={parentClasses.emptyDivDescription}>
          {t('NO_PRODUCT_DATA_WHEN_DIVISION_SELECTED')}
        </span>
      )}
      className={parentClasses.emptyDiv}
    />
  ) : (
    <>
      <ProductTableHeader
        onSelectTableType={handleSelectedTableType}
        selectedTableType={selectedTableType}
        onSearch={handleSearch}
        searchTerm={searchValue}
        disabled={isProductTableDisabled || isPending}
      />
      <AntTableV2
        data={data}
        columns={tableColumns}
        loading={!isProductTableDisabled ? isPending : false}
        className={`${classes.table} ${parentClasses.rightPaddingForScrollBar} ${parentClasses.table}`}
        containerClassName={parentClasses.antTableContainer}
        footer={
          isProductTableDisabled ? null : (
            <TableFooter
              setLimit={handleLimit}
              limit={limit}
              filteredTotalCount={calcFilteredTotalCount(data, debouncedSearchedValue, tableData.totalAllCount)}
              filteredTotalPrice={calcFilteredTotalPrice(data, debouncedSearchedValue, tableData.totalAllPrice)}
              filteredRate={calcFilteredRate(data, debouncedSearchedValue, tableData.totalAllPrice)}
            />
          )
        }
        pageSize={limit}
        scroll={{ y: 262 }}
        rowClassName={(record, index) => getRowClassName(parentClasses, index)}
        disabled={isProductTableDisabled}
        onChange={handleSort}
        showSorterTooltip={false}
      />
    </>
  );
};

export default ProductsTable;
