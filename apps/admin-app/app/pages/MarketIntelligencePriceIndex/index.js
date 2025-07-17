import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { compose } from 'redux';
import { Table, Alert, Badge, Row, Col, message } from 'antd';

import CompetitorFilter from '@app/pages/MarketIntelligencePriceIndex/components/CompetitorFilter';
import CategoryColumns from '@app/pages/MarketIntelligencePriceIndex/components/CategoryColumns';
import ProductColumns from '@app/pages/MarketIntelligencePriceIndex/components/ProductColumns';
import PriceIndexByFilter from '@app/pages/MarketIntelligencePriceIndex/components/PriceIndexByFilter';
import BaseCompetitor from '@app/pages/MarketIntelligencePriceIndex/components/BaseCompetitor';
import CategoryFilter from '@app/pages/MarketIntelligencePriceIndex/components/CategoryFilter';
import SubCategoryFilter from '@app/pages/MarketIntelligencePriceIndex/components/SubcategoryFilter';
import InformationText from '@app/pages/MarketIntelligencePriceIndex/components/Information';
import DomainTypeSelect from '@app/pages/MarketIntelligencePriceIndex/components/DomainTypeFilter';
import IndexType from '@app/pages/MarketIntelligencePriceIndex/components/IndexType';
import TableTitle from '@app/pages/MarketIntelligencePriceIndex/components/TableTitle';
import TableSummary from '@app/pages/MarketIntelligencePriceIndex/components/TableSummary';
import PageTitle from '@app/pages/MarketIntelligencePriceIndex/components/PageTitle';
import ProductFilter from '@app/pages/MarketIntelligencePriceIndex/components/ProductFilter';
import Filter from '@app/pages/MarketIntelligencePriceIndex/components/Filter';

import { REDUX_KEY } from '@shared/shared/constants';
import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { FILTER_KEY, INDEX_BY_DICT, INDEX_BY_LIST, TR_COUNTRY_CODE } from '@app/pages/MarketIntelligencePriceIndex/constants';
import { Creators } from '@app/pages/MarketIntelligencePriceIndex/redux/actions';
import { stateSelector, listSelector } from '@app/pages/MarketIntelligencePriceIndex/redux/selectors';
import reducer from '@app/pages/MarketIntelligencePriceIndex/redux/reducer';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import saga from '@app/pages/MarketIntelligencePriceIndex/redux/saga';
import useStyles from '@app/pages/MarketIntelligencePriceIndex/styles';

const MarketIntelligencePriceIndex = () => {
  usePageViewAnalytics({
    name: ROUTE.MARKET_INTELLIGENCE_PRICE_INDEX.name,
    squad: ROUTE.MARKET_INTELLIGENCE_PRICE_INDEX.squad,
  });
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligencePriceIndex');

  const [currentCompetitorList, setCurrentCompetitorList] = useState([]);
  const [indexType, setIndexType] = useState(1);
  const [domainType, setDomainType] = useState('GETIR_10');
  const [excludeCategory, setExcludeCategory] = useState([]);
  const [baseCompetitor, setBaseCompetitor] = useState('');
  const [excludeSubCategory, setExcludeSubCategory] = useState([]);
  const [excludeSubCategoryList, setExcludeSubCategoryList] = useState([]);
  const [showOutdatedProducts, setShowOutdatedProducts] = useState(false);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  const competitorList = useSelector(listSelector.competitorList);
  const isLoading = useSelector(stateSelector.isLoading);
  const isLoadingCompetitorFilter = useSelector(stateSelector.isLoadingCompetitorFilter);
  const tableData = useSelector(stateSelector.tableData);
  const excelExportCategory = useSelector(stateSelector.excelExportCategory);
  const indexBy = useSelector(stateSelector.indexBy);
  const subCategoryList = useSelector(listSelector.subCategoryList);
  const brandList = useSelector(listSelector.brandList);
  const isLoadingFilter = useSelector(stateSelector.isLoadingFilter);
  const supplierList = useSelector(listSelector.supplierList);

  const country = useSelector(getSelectedCountryV2);
  const countryCode = country?.code?.alpha2;
  const countryCurrency = country?.currency?.symbol;

  const [filters, setFilters] = useState({
    [FILTER_KEY.CATEGORY]: [],
    [FILTER_KEY.SUBCATEGORY]: [],
    [FILTER_KEY.BRAND]: [],
    [FILTER_KEY.SUPPLIER]: [],
    [FILTER_KEY.PRODUCT]: [],
  });

  useEffect(() => {
    dispatch(Creators.fetchCompetitorListRequest({
      afterSuccess: competitorData => {
        setBaseCompetitor(competitorData[0]);
        setCurrentCompetitorList(competitorData.slice(0, 4));
      },
    }));
  }, [dispatch]);

  useEffect(() => {
    setIsLoadingTable(isLoading);
  }, [isLoading]);

  const tableTitle = TableTitle(
    indexType,
    excludeCategory,
    setExcludeCategory,
    excludeSubCategory,
    setExcludeSubCategory,
    indexBy,
    excludeSubCategoryList,
    setFilters,
    showOutdatedProducts,
    setShowOutdatedProducts,
  );

  const currentColumns = indexBy === INDEX_BY_LIST.PRODUCT[0]
    ? ProductColumns(currentCompetitorList || competitorList, countryCurrency)
    : CategoryColumns(currentCompetitorList || competitorList);

  useEffect(() => {
    if (isLoadingCompetitorFilter === false && competitorList?.length === 0) {
      message.error(t('NO_COMPETITORS_FOUND'));
      setIsLoadingTable(false);
    }
  }, [competitorList, isLoadingCompetitorFilter, t]);

  useEffect(() => {
    const filterStatus = Object.values(filters).some(filter => (filter && filter !== '' && filter?.length > 0));
    dispatch(Creators.setFilterList({ filters, hasFilter: filterStatus }));
  }, [dispatch, filters]);

  const handlePriceIndexChange = () => {
    setBaseCompetitor(competitorList[0]);
    dispatch(Creators.setSelectedProduct({}));
    setCurrentCompetitorList(competitorList.slice(0, 4));
  };

  useEffect(() => {
    if (
      competitorList?.length > 0 &&
      countryCode &&
      baseCompetitor &&
      indexBy === INDEX_BY_LIST.PRODUCT[0]
    ) {
      const fetchData = {
        exclude_category: excludeCategory || [],
        exclude_subcategory: excludeSubCategory,
        country_code: countryCode,
        competitor_list: competitorList,
        base_competitor: baseCompetitor,
        index_type: indexType,
        domain_type: domainType,
        is_last_crawl: showOutdatedProducts,
      };
      dispatch(
        Creators.postIndexByDataRequest({
          fetchData,
          indexBy: INDEX_BY_DICT[indexBy],
        }),
      );
      dispatch(Creators.getCategoriesRequest());
      dispatch(Creators.getSubCategoriesRequest());
    }
  }, [
    baseCompetitor,
    competitorList,
    countryCode,
    dispatch,
    domainType,
    excludeCategory,
    excludeSubCategory,
    indexBy,
    indexType,
    showOutdatedProducts,
  ]);

  useEffect(() => {
    if (currentCompetitorList?.length > 0 && countryCode && baseCompetitor && indexBy === INDEX_BY_LIST.CATEGORIES[0]) {
      const fetchData = {
        exclude_category: excludeCategory || [],
        exclude_subcategory: excludeSubCategory,
        country_code: countryCode,
        competitor_list: currentCompetitorList,
        base_competitor: baseCompetitor,
        index_type: indexType,
        domain_type: domainType,
        is_last_crawl: showOutdatedProducts,
      };
      dispatch(
        Creators.postIndexByDataRequest({
          fetchData,
          indexBy: INDEX_BY_DICT[indexBy],
        }),
      );
      dispatch(Creators.getCategoriesRequest());
      dispatch(Creators.getSubCategoriesRequest());
    }
  }, [
    baseCompetitor,
    countryCode,
    currentCompetitorList,
    dispatch,
    domainType,
    excludeCategory,
    excludeSubCategory,
    indexBy,
    indexType,
    showOutdatedProducts,
  ]);

  useEffect(() => {
    if (excludeCategory && excludeCategory !== []) {
      const tempSubCategoryList = subCategoryList.filter(subCategory => !excludeCategory.includes(subCategory.category_name));
      setExcludeSubCategoryList(tempSubCategoryList);
    }
  }, [excludeCategory, subCategoryList]);

  return (
    <div className="app-content">
      <PageTitle title={t('PRICE_INDEX')} />
      <Row className={classes.indexFilterContainer}>
        <Col sm={3} className={classes.filterContainer}>
          <PriceIndexByFilter
            onChange={handlePriceIndexChange}
            isLoading={
              isLoading ||
              isLoadingCompetitorFilter ||
              isLoadingFilter ||
              isLoadingTable
            }
          />
        </Col>
        <Col sm={3} className={classes.filterContainer}>
          <IndexType
            indexType={indexType}
            setIndexType={setIndexType}
            isLoading={
              isLoading ||
              isLoadingCompetitorFilter ||
              isLoadingFilter ||
              isLoadingTable
            }
          />
        </Col>
        {countryCode === TR_COUNTRY_CODE ? (
          <Col sm={3} className={classes.filterContainer}>
            <DomainTypeSelect
              domainType={domainType}
              setDomainType={setDomainType}
              isLoading={
                isLoading ||
                isLoadingCompetitorFilter ||
                isLoadingFilter ||
                isLoadingTable
              }
            />
          </Col>
        ) : null}
        <Col sm={3} className={classes.filterContainer}>
          <CompetitorFilter
            currentCompetitorList={currentCompetitorList || []}
            setCurrentCompetitorList={setCurrentCompetitorList}
            setBaseCompetitor={setBaseCompetitor}
            isLoading={
              isLoading ||
              isLoadingCompetitorFilter ||
              isLoadingFilter ||
              isLoadingTable
            }
          />
        </Col>
        <Col sm={3} className={classes.filterContainer}>
          <BaseCompetitor
            currentCompetitorList={currentCompetitorList || []}
            baseCompetitor={baseCompetitor}
            setBaseCompetitor={setBaseCompetitor}
            isLoading={
              isLoading ||
              isLoadingCompetitorFilter ||
              isLoadingFilter ||
              isLoadingTable
            }
          />
        </Col>
      </Row>
      {indexBy === INDEX_BY_LIST.PRODUCT[0] && (
        <Row className={classes.indexFilterContainer}>
          <Col sm={3} className={classes.filterContainer}>
            <CategoryFilter
              excludeCategory={excludeCategory}
              setExcludeCategory={setExcludeCategory}
              isLoading={
                isLoading ||
                isLoadingCompetitorFilter ||
                isLoadingFilter ||
                isLoadingTable
              }
              setFilters={setFilters}
              filters={filters}
            />
          </Col>
          <Col sm={3} className={classes.filterContainer}>
            <SubCategoryFilter
              excludeSubCategory={excludeSubCategory}
              setExcludeSubCategory={setExcludeSubCategory}
              indexBy={indexBy}
              isLoading={
                isLoading ||
                isLoadingCompetitorFilter ||
                isLoadingFilter ||
                isLoadingTable
              }
              setFilters={setFilters}
              filters={filters}
            />
          </Col>
          <Col sm={4} className={classes.filterContainer}>
            <Filter
              list={brandList}
              placeholder={t('SELECT_BRAND')}
              description={t('BRAND')}
              src="brand"
              isLoading={
                isLoading ||
                isLoadingCompetitorFilter ||
                isLoadingFilter ||
                isLoadingTable
              }
              setFilters={setFilters}
              filters={filters}
              filterKey="BRAND"
              mode="multiple"
            />
          </Col>
          <Col sm={4} className={classes.filterContainer}>
            <Filter
              list={supplierList}
              placeholder={t('SELECT_SUPPLIER')}
              description={t('SUPPLIER')}
              src="supplier"
              isLoading={
                isLoading ||
                isLoadingCompetitorFilter ||
                isLoadingFilter ||
                isLoadingTable
              }
              setFilters={setFilters}
              filters={filters}
              filterKey="SUPPLIER"
              mode="multiple"
            />
          </Col>
          <Col sm={3} className={classes.filterContainer}>
            <ProductFilter
              tableData={tableData}
              setFilters={setFilters}
              filters={filters}
              isLoading={
                isLoading ||
                isLoadingCompetitorFilter ||
                isLoadingFilter ||
                isLoadingTable
              }
            />
          </Col>
        </Row>
      )}
      <Badge.Ribbon
        className={
          excludeCategory?.length !== 0 || excludeSubCategory?.length !== 0
            ? classes.flexBadge
            : classes.noneBadge
        }
        text={t('FILTERED')}
        color="purple"
      >
        <div
          className={
            excludeCategory?.length !== 0 || excludeSubCategory?.length !== 0
              ? classes.filtredgridlines
              : classes.gridlines
          }
        >
          <Table
            locale={{
              emptyText:
                isLoading === false ? (
                  <Row className={classes.tableRowContainer}>
                    <Col className={classes.tableCol} sm={6}>
                      <Alert
                        message={t('NO_COMMON_PRODUCTS_FOUND')}
                        description={t('TRY_REMOVING_COMPETITOR')}
                        type="warning"
                        showIcon
                      />
                    </Col>
                  </Row>
                ) : (
                  ''
                ),
            }}
            title={() => (excelExportCategory ? tableTitle : null)}
            size="small"
            bordered
            className={classes.tableContainer}
            loading={isLoading ||
              isLoadingCompetitorFilter ||
              isLoadingFilter ||
              isLoadingTable}
            columns={currentColumns}
            dataSource={tableData}
            pagination={
              indexBy === INDEX_BY_LIST.PRODUCT[0]
                ? { defaultPageSize: 50 }
                : false
            }
            scroll={{
              y: '100vh',
              x: indexBy === INDEX_BY_LIST.PRODUCT[0] ? 1300 : null,
            }}
            summary={() => TableSummary(currentCompetitorList)}
          />
        </div>
      </Badge.Ribbon>
      {tableData ? <InformationText /> : null}
    </div>
  );
};

const reduxKey = REDUX_KEY.MARKET_INTELLIGENCE_PRICE_INDEX;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketIntelligencePriceIndex);
