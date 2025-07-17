import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Table, Switch, Row, Col, message } from 'antd';
import moment from 'moment';
import { compose } from 'redux';

import DateSelect from './components/DateFilter';
import CompetitorSelect from './components/CompetitorSelect';
import TableColumns from './components/TableColumns';
import TableTitle from './components/TableTitle';
import TableSummary from './components/TableSummary';
import PageTitle from './components/PageTitle';
import SelectTitle from './components/SelectTitle';

import { REDUX_KEY } from '@shared/shared/constants';
import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { usePageViewAnalytics } from '@shared/hooks';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { ROUTE } from '@app/routes';
import saga from '@app/pages/MarketIntelligenceProducts/redux/saga';
import reducer from '@app/pages/MarketIntelligenceProducts/redux/reducer';
import { Creators } from '@app/pages/MarketIntelligenceProducts/redux/actions';
import { listSelector, stateSelector } from './redux/selectors';
import useStyles from '@app/pages/MarketIntelligenceProducts/styles';

const MarketIntelligenceProducts = () => {
  usePageViewAnalytics({
    name: ROUTE.MARKET_INTELLIGENCE_PRODUCTS.name,
    squad: ROUTE.MARKET_INTELLIGENCE_PRODUCTS.squad,
  });

  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligenceProducts');

  const country = getSelectedCountry();
  const countryCode = country.code.alpha2;
  const countryCurrency = country.currency.symbol;

  const competitorList = useSelector(listSelector.competitorList);
  const productMatchDataLoading = useSelector(stateSelector.productMatchDataLoading);
  const excelExport = useSelector(stateSelector.excelExport);
  const tableData = useSelector(stateSelector.tableData);
  const competitorListLoading = useSelector(stateSelector.competitorListLoading);

  const [showPrediction, setShowPrediction] = useState(false);
  const [currentCompetitor, setCurrentCompetitor] = useState(null);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [filteredData, setFilteredData] = useState(null);

  const [filters, setFilters] = useState({
    category: [],
    subcategory: [],
    brand: [],
    product: [],
  });

  const [options, setOptions] = useState({
    category: [],
    subcategory: [],
    brand: [],
    product: [],
  });

  const tableTitle = TableTitle(filters, setFilters, options, excelExport, showPrediction);
  const tableSummary = TableSummary(showPrediction, filteredData || tableData, classes);
  const [tableColumns, setTableColumns] = useState(TableColumns(showPrediction, countryCurrency, classes, t));

  useEffect(() => {
    dispatch(Creators.getCompetitorListRequest());
  }, [dispatch, country]);

  const getOptions = data => {
    const categoryList = [];
    const subCategoryList = [];
    const brandList = [];
    const productList = [];

    data?.forEach(element => {
      if (!categoryList.includes(element.category)) categoryList.push(element.category);
      if (!subCategoryList.includes(element.subcategory)) subCategoryList.push(element.subcategory);
      if (!brandList.includes(element.brand)) brandList.push(element.brand);
      if (!productList.includes(element.product_name)) productList.push(element.product_name);
    });

    setOptions({
      category: categoryList,
      subcategory: subCategoryList,
      brand: brandList,
      product: productList,
    });
  };

  useEffect(() => {
    if (currentCompetitor) {
      dispatch(Creators.postProductMatchDataRequest({
        crawlDate: date,
        competitorName: currentCompetitor,
      }));
    }
    else if (competitorListLoading === false && competitorList.length === 0) {
      message.error(t('NO_COMPETITORS_FOUND'));
    }
  }, [competitorList, competitorListLoading, countryCode, currentCompetitor, date, dispatch, t]);

  useEffect(() => {
    setTableColumns(TableColumns(showPrediction, countryCurrency, classes, t));
  }, [classes, country, countryCurrency, showPrediction, t]);

  useEffect(() => {
    if (competitorList) setCurrentCompetitor(competitorList[0]);
  }, [competitorList]);

  useEffect(() => {
    let tempFilteredData = [];
    let tempTableData = tableData;
    getOptions(tableData);
    Object.entries(filters).forEach(filter => {
      const filterPropName = filter[0] === 'product' ? 'product_name' : filter[0];
      const filterPropValue = filter[1];
      if (filterPropValue?.length > 0) {
        (tempFilteredData?.length > 0 ? tempFilteredData : tempTableData)
          .map(element => (element[filterPropName] === filterPropValue ? tempFilteredData.push(element) : ''));
      }
      if (tempFilteredData.length > 0) {
        tempTableData = tempFilteredData;
        tempFilteredData = [];
      }
    });

    getOptions(tempTableData);
    setFilteredData(tempTableData);
  }, [filters, tableData]);

  return (
    <div className="app-content">
      <PageTitle title={t('COMPETITOR_PRODUCTS')} />
      {competitorList ? (
        <Row
          sm={2}
          className={classes.filterContainer}
        >
          <Col sm={4}>
            <CompetitorSelect
              currentCompetitor={currentCompetitor}
              setCurrentCompetitor={setCurrentCompetitor}
              loading={productMatchDataLoading || competitorListLoading}
              currentCompetitorList={competitorList}
            />
          </Col>
          <Col sm={4}>
            <DateSelect
              setDate={setDate}
              date={date}
              loading={productMatchDataLoading || competitorListLoading}
            />
          </Col>
          <Col sm={4}>
            <SelectTitle src="prediction" description={t('PREDICTION')} />
            <Switch
              disabled={productMatchDataLoading || competitorListLoading}
              onChange={() => setShowPrediction(!showPrediction)}
            />
          </Col>
        </Row>
      ) : (
        ''
      )}
      <Table
        title={() => (excelExport ? tableTitle : null)}
        dataSource={filteredData || tableData}
        columns={tableColumns}
        scroll={{ y: 'calc(100vh - 4em)' }}
        loading={(productMatchDataLoading || competitorListLoading) || false}
        size="small"
        bordered
        summary={() => tableSummary}
      />
    </div>
  );
};

const reduxKey = REDUX_KEY.MARKET_INTELLIGENCE_PRODUCTS;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketIntelligenceProducts);
