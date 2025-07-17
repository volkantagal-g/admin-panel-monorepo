import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import { message, Table, Badge } from 'antd';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';

import TableColumns from './components/TableColumns';
import TableSummary from './components/TableSummary';
import TableTitle from './components/TableTitle';
import ProductCard from './components/ProductCard';
import SimulateIndex from './components/SimulateIndex';
import GuardrailDetail from './components/GuardrailDetail';
import FilterDrawer from './components/FilterDrawer';
import BundleDetail from './components/BundleDetail';
import PageTitle from './components/PageHeader';

import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@app/pages/MarketIntelligencePriceRecommendation/redux/saga';
import reducer from '@app/pages/MarketIntelligencePriceRecommendation/redux/reducer';

import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { REDUX_KEY } from '@shared/shared/constants';
import { Creators } from './redux/actions';
import { listSelector, stateSelector } from './redux/selectors';
import {
  FILTER_KEY,
  RULE_KEY,
  RULE_NAME_TRANSLATER,
  DEFAULT_DOMAIN_TYPE,
  COMPETITORS,
  INTEGRATION_LIST,
} from './constants';
import { isFloat } from './utils/common';

import useStyles from './styles';

const MarketIntelligencePriceRecommendation = () => {
  usePageViewAnalytics({
    name: ROUTE.MARKET_INTELLIGENCE_PRICE_RECOMMENDATION.name,
    squad: ROUTE.MARKET_INTELLIGENCE_PRICE_RECOMMENDATION.squad,
  });
  const { t } = useTranslation('marketIntelligencePriceRecommendation');

  const dispatch = useDispatch();
  const classes = useStyles();

  const countryDetail = useSelector(getSelectedCountryV2);
  const countryCode = countryDetail?.code?.alpha2;

  const filteredTableData = useSelector(stateSelector.filteredTableData);
  const tableData = useSelector(stateSelector.tableData);
  const loading = useSelector(stateSelector.loading);
  const isSuccessCall = useSelector(stateSelector.isSuccessCall);
  const simulateData = useSelector(stateSelector.simulateData);
  const competitorList = useSelector(listSelector.competitorList);

  const [openSimulation, setOpenSimulation] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openGuardrailDetail, setOpenGuardrailDetail] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [showIndex, setShowIndex] = useState(false);
  const [showIndexType, setShowIndexType] = useState(1);
  const [showBundleCheck, setShowBundleCheck] = useState(false);
  const [showFamilyColumn, setShowFamilyColumn] = useState(false);
  const [showBundleStatusDetailModal, setShowBundleStatusDetailModal] = useState(false);

  const [filterDisabled, setFilterDisabled] = useState(false);
  const [applyRecommendedPrice, setApplyRecommendedPrice] = useState(false);
  const [hasExcelData, setHasExcelData] = useState(false);
  const [hasFilter, setHasFilter] = useState(false);
  const [detailProductData, setDetailProductData] = useState(null);
  const [baseCompetitor, setBaseCompetitor] = useState('');
  const [currentCompetitorList, setCurrentCompetitorList] = useState([]);
  const [unsavedCompetitorList, setUnsavedCompetitorList] = useState([]);
  const [priorityList, setPriorityList] = useState([]);
  const [indexType, setIndexType] = useState(1);
  const [domainType, setDomainType] = useState(1);
  const [excelAllData, setExcelAllData] = useState(false);

  const [filters, setFilters] = useState({
    [FILTER_KEY.supplier]: [],
    [FILTER_KEY.brand]: [],
    [FILTER_KEY.manufacturer]: [],
    [FILTER_KEY.product]: [],
    [FILTER_KEY.categoryRole]: [],
    [FILTER_KEY.globalCategory]: [],
    [FILTER_KEY.categoryPlanning]: [],
    [FILTER_KEY.kvi]: [],
    [FILTER_KEY.family]: [],
    [FILTER_KEY.tableFilter]: {
      [FILTER_KEY.matchedProduct]: {
        [FILTER_KEY.directMatchedProduct]: [],
        [FILTER_KEY.inDirectMatchedProduct]: [],
        [FILTER_KEY.notMatchedProduct]: [],
      },
      [FILTER_KEY.guardrailFailed]: [],
      [FILTER_KEY.finalAlert]: [],
      [FILTER_KEY.newRecommendation]: [],
      [FILTER_KEY.bundledProduct]: [],
      [FILTER_KEY.discountedProduct]: [],
    },
  });

  const pricingColumns = TableColumns(
    setOpenDetail,
    setDetailProductData,
    showIndex,
    setOpenGuardrailDetail,
    applyRecommendedPrice,
    setApplyRecommendedPrice,
    showBundleCheck,
    setShowBundleStatusDetailModal,
    showFamilyColumn,
    filters,
    setFilters,
    setOpenDrawer,
  );

  const tableTitleMemo = useMemo(
    () => (
      <TableTitle
        setShowIndex={setShowIndex}
        showIndex={showIndex}
        setHasExcelData={setHasExcelData}
        setFilters={setFilters}
        setOpenSimulation={setOpenSimulation}
        domainType={domainType}
        baseCompetitor={baseCompetitor}
        indexType={indexType}
        priorityList={priorityList}
        currentCompetitorList={currentCompetitorList}
        excelAllData={excelAllData}
        setExcelAllData={setExcelAllData}
        filterDisabled={filterDisabled}
        showIndexType={showIndexType}
        setShowIndexType={setShowIndexType}
        setOpenDrawer={setOpenDrawer}
        showBundleCheck={showBundleCheck}
        setShowBundleCheck={setShowBundleCheck}
        showFamilyColumn={showFamilyColumn}
        setShowFamilyColumn={setShowFamilyColumn}
        countryCode={countryCode}
      />
    ),
    [
      baseCompetitor,
      countryCode,
      currentCompetitorList,
      domainType,
      excelAllData,
      filterDisabled,
      indexType,
      priorityList,
      showBundleCheck,
      showFamilyColumn,
      showIndex,
      showIndexType,
    ],
  );

  const tableSummaryMemo = useMemo(() => {
    return (
      <Table.Summary fixed="top">
        <TableSummary
          showIndex={showIndex}
          showIndexType={showIndexType}
          setApplyRecommendedPrice={setApplyRecommendedPrice}
          applyRecommendedPrice={applyRecommendedPrice}
          showBundleCheck={showBundleCheck}
          showFamilyColumn={showFamilyColumn}
        />
      </Table.Summary>
    );
  }, [applyRecommendedPrice, showBundleCheck, showFamilyColumn, showIndex, showIndexType]);

  useEffect(() => {
    if (isSuccessCall === false) {
      setFilterDisabled(true);
      message.error({
        content: t('SOMETHING_WENT_WRONG'),
        style: {
          marginTop: '8vh',
          marginLeft: '30px',
        },
      });
    }
  }, [isSuccessCall, t]);

  useEffect(() => {
    if (countryCode && competitorList) {
      setBaseCompetitor(competitorList[0]);
      setCurrentCompetitorList(competitorList?.slice(0, 1));
      setUnsavedCompetitorList(competitorList?.slice(0, 1));
    }
  }, [dispatch, countryCode, competitorList]);

  useEffect(() => {
    if (countryCode) {
      dispatch(
        Creators.setIntegrationType({ integrationType: INTEGRATION_LIST.GETIR[0]?.toLowerCase() }),
      );
      dispatch(Creators.getRecommendationDataRequest({ domainType: DEFAULT_DOMAIN_TYPE }));
      dispatch(Creators.getCompetitorListRequest({ domainType: DEFAULT_DOMAIN_TYPE }));
      dispatch(Creators.getPricingRulesDataRequest({ domainType: DEFAULT_DOMAIN_TYPE }));
    }
  }, [dispatch, countryCode]);

  useEffect(() => {
    let filterStatus = false;
    Object.entries(filters).forEach(([key, value]) => {
      if (key === FILTER_KEY.tableFilter) {
        Object.entries(value)?.forEach(([keyData, valueData]) => {
          if (
            (keyData === FILTER_KEY.matchedProduct
              ? Object.entries(valueData)
              : valueData
            )?.some(([filterKey, filter]) => (filterKey === FILTER_KEY.notMatchedProduct
              ? filter?.includes(true)
              : filter && filter !== '' && filter?.length > 0))
          ) {
            filterStatus = true;
          }
        });
      }
      else if (value && value !== '' && value?.length > 0) filterStatus = true;
    });
    setHasFilter(filterStatus);
    dispatch(Creators.setFilterList({ filters, hasFilter: filterStatus }));
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(Creators.setUpdateList());
    const priceFinalResultList = filteredTableData && filteredTableData?.length > 0 && filteredTableData
      .filter(element => element?.new_price && element?.final_result && !element?.final_alert)
      .every(
        data => data?.final_result?.toFixed(2) === data?.new_price?.toFixed(2),
      );
    if (filteredTableData?.length === 0 && !hasFilter) setFilterDisabled(true);
    else setFilterDisabled(false);
    setApplyRecommendedPrice(priceFinalResultList);
  }, [dispatch, filteredTableData, hasFilter]);

  useEffect(() => {
    if (tableData) {
      let content = (excelAllData ? filteredTableData : tableData)?.map(e => Object.fromEntries(
        Object.entries(e).map(([key, value]) => [
          key,
          isFloat(value) ? parseFloat(value)?.toFixed(2) : value,
        ]),
      ));
      let bundleContent = [];
      content?.forEach(value => {
        if (
          value?.bundle_product_infos &&
          value?.bundle_product_infos !== '' &&
          value?.bundle_product_infos?.length > 0
        ) {
          value?.bundle_product_infos?.forEach(bundleValue => {
            bundleContent.push({
              product_id: value.getir_product_id,
              product_name: value.product_name,
              bundle_id: bundleValue.bundle_id,
              bundle_name: bundleValue.bundle_product_name,
              current_product_price: value.price,
              new_product_price: value.new_price,
              bundle_product_price: bundleValue.bundle_product_price,
              bundle_price: bundleValue.bundle_price,
              bundle_index: parseFloat(bundleValue.bundle_index).toFixed(2),
              bundle_status: bundleValue.bundle_status,
            });
          });
        }
      });
      content.forEach(elementValue => {
        if (
          elementValue?.competitor_product_infos &&
          elementValue?.competitor_product_infos !== ''
        ) {
          const index = content.findIndex(
            x => x?.getir_product_id === elementValue?.getir_product_id,
          );
          Object.entries(elementValue?.competitor_product_infos).forEach(
            ([competitorName, competitorDetail]) => {
              if (competitorName !== COMPETITORS.GORILLAS[0]) {
                content[index] = {
                  ...content[index],
                  [`${competitorName?.toLowerCase()}_product_name`]:
                    competitorDetail?.competitor_product_name,
                  [`${competitorName?.toLowerCase()}_price`]: parseFloat(
                    competitorDetail?.competitor_price,
                  )?.toFixed(2),
                  [`${competitorName?.toLowerCase()}_new_index`]: parseFloat(
                    (elementValue.new_price /
                      competitorDetail.competitor_price) *
                      100,
                  )?.toFixed(1),
                  [`${competitorName?.toLowerCase()}_current_index`]:
                    parseFloat(
                      (elementValue.price / competitorDetail.competitor_price) *
                        100,
                    )?.toFixed(1),
                };
              }
            },
          );
        }
      });

      const containsNumbers = str => /\d/.test(str);

      bundleContent = bundleContent.map(obj => {
        const newObj = obj;
        Object.entries(obj).forEach(([key, value]) => {
          if (typeof value === 'string' && containsNumbers(value)) {
            newObj[key] = value?.replace('.', ',');
          }
          if (value?.length > 0) {
            newObj[key] = value?.toString();
          }
        });
        return newObj;
      });

      content = content.map(obj => {
        const newObj = obj;
        Object.entries(obj).forEach(([key, value]) => {
          if (typeof value === 'string' && containsNumbers(value)) {
            newObj[key] = value?.replace('.', ',');
          }
          if (value?.length > 0) {
            newObj[key] = value?.toString();
          }
          if (
            key === RULE_KEY.CALCULATED_RULE ||
            key === RULE_KEY.GUARDRAIL_RULE
          ) {
            newObj[key] = RULE_NAME_TRANSLATER[value];
          }
          if (
            (key === RULE_KEY.CALCULATED_RULE_VALUE &&
              value &&
              obj[RULE_KEY.CALCULATED_RULE] !== RULE_NAME_TRANSLATER.index) ||
            (key === RULE_KEY.GUARDRAIL_RULE_MIN &&
              value &&
              obj[RULE_KEY.GUARDRAIL_RULE] !== RULE_NAME_TRANSLATER.index) ||
            (key === RULE_KEY.GUARDRAIL_RULE_MAX &&
              value &&
              obj[RULE_KEY.GUARDRAIL_RULE] !== RULE_NAME_TRANSLATER.index)
          ) {
            newObj[key] = `%${value}`;
          }
        });
        return newObj;
      });
      dispatch(
        Creators.setExcelData({ data: content, bundleData: bundleContent }),
      );
    }
  }, [dispatch, excelAllData, filteredTableData, tableData]);

  return (
    <>
      <div className="app-content">
        <PageTitle />
        <SimulateIndex
          setOpenSimulation={setOpenSimulation}
          openSimulation={openSimulation}
          simulateData={simulateData}
          currentCompetitorList={currentCompetitorList}
          setCurrentCompetitorList={setCurrentCompetitorList}
          baseCompetitor={baseCompetitor}
          setBaseCompetitor={setBaseCompetitor}
          competitorList={competitorList}
          indexType={indexType}
          setIndexType={setIndexType}
          domainType={domainType}
          setDomainType={setDomainType}
          priorityList={priorityList}
          setPriorityList={setPriorityList}
          setUnsavedCompetitorList={setUnsavedCompetitorList}
          unsavedCompetitorList={unsavedCompetitorList}
        />
        <ProductCard
          productData={detailProductData}
          setOpenDetail={setOpenDetail}
          openDetail={openDetail}
        />
        <GuardrailDetail
          productData={detailProductData}
          openGuardrailDetail={openGuardrailDetail}
          setOpenGuardrailDetail={setOpenGuardrailDetail}
        />
        <BundleDetail
          bundleData={detailProductData}
          showBundleStatusDetailModal={showBundleStatusDetailModal}
          setShowBundleStatusDetailModal={setShowBundleStatusDetailModal}
          classes={classes}
        />
        <Badge.Ribbon
          style={{ display: hasExcelData ? 'flex' : 'none' }}
          text={t('FILTERED')}
          color="purple"
        >
          <Table
            title={() => tableTitleMemo}
            size="small"
            bordered
            className={classes.elasticTable}
            loading={loading}
            columns={pricingColumns}
            dataSource={filteredTableData}
            scroll={{ x: 1000, y: 800 }}
            summary={() => tableSummaryMemo}
          />
        </Badge.Ribbon>
      </div>
      <FilterDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        filters={filters}
        setFilters={setFilters}
        classes={classes}
        filterDisabled={filterDisabled}
        tableData={tableData}
      />
    </>
  );
};
const reduxKey = REDUX_KEY.MARKET_INTELLIGENCE_PRICE_RECOMMENDATION;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketIntelligencePriceRecommendation);
