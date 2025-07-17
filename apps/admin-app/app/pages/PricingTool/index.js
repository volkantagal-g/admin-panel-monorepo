import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { compose } from 'redux';
import { Col, Row, message, Table, Select, Badge } from 'antd';

import PageTitle from '@app/pages/PricingTool/components/PageTitle';
import TableColumns from '@app/pages/PricingTool/components/TableColumns';
import TableSummary from '@app/pages/PricingTool/components/TableSummary';
import TableTitle from '@app/pages/PricingTool/components/TableTitle';
import SelectFilter from '@app/pages/PricingTool/components/SelectFilter';
import ProductCard from '@app/pages/PricingTool/components/ProductCard';
import SimulateIndex from '@app/pages/PricingTool/components/SimulateIndex';

import { REDUX_KEY } from '@shared/shared/constants';
import { Creators } from './redux/actions';
import { listSelector, stateSelector } from './redux/selectors';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';

import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from './redux/reducer';
import saga from './redux/saga';

import useStyles from './styles';

const { Option } = Select;

const PricingTool = () => {
  usePageViewAnalytics({
    name: ROUTE.PRICING_TOOL.name,
    squad: ROUTE.PRICING_TOOL.squad,
  });

  const dispatch = useDispatch();
  const classes = useStyles();

  const { t } = useTranslation('pricingTool');

  const filteredTableData = useSelector(stateSelector.filteredTableData);
  const loading = useSelector(stateSelector.loading);
  const isSuccessCall = useSelector(stateSelector.isSuccessCall);
  const tableData = useSelector(stateSelector.tableData);
  const simulateData = useSelector(stateSelector.simulateData);

  const categoryList = useSelector(listSelector.categoryList);
  const subcategoryList = useSelector(listSelector.subcategoryList);
  const productList = useSelector(listSelector.productList);
  const manufacturerList = useSelector(listSelector.manufacturerList);
  const brandList = useSelector(listSelector.brandList);
  const supplierList = useSelector(listSelector.supplierList);

  const [filterDisabled, setFilterDisabled] = useState(false);
  const [openSimulation, setOpenSimulation] = useState(false);
  const [hasExcelData, setHasExcelData] = useState(false);
  const [showAandM, setShowAandM] = useState(true);
  const [showDiscounted, setShowDiscounted] = useState(false);
  const [hasFilter, setHasFilter] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [detailProductData, setDetailProductData] = useState(null);
  const [showIndex, setShowIndex] = useState(false);
  const [isCSVModalOpen, setIsCSVModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    supplier: [],
    category: '',
    subcategory: '',
    brand: '',
    manufacturer: '',
  });
  const pricingColumns = TableColumns(showAandM, setOpenDetail, setDetailProductData, showIndex, hasExcelData);

  const tableTitleMemo = useMemo(() => (
    <TableTitle
      setShowAandM={setShowAandM}
      setShowDiscounted={setShowDiscounted}
      showDiscounted={showDiscounted}
      showAandM={showAandM}
      hasFilter={hasFilter}
      setShowIndex={setShowIndex}
      showIndex={showIndex}
      setIsCSVModalOpen={setIsCSVModalOpen}
      isCSVModalOpen={isCSVModalOpen}
      setFilterDisabled={setFilterDisabled}
      setHasExcelData={setHasExcelData}
      setFilters={setFilters}
      setHasFilter={setHasFilter}
      setOpenSimulation={setOpenSimulation}
    />
  ), [showDiscounted, showAandM, hasFilter, showIndex, isCSVModalOpen]);

  const tableSummaryMemo = useMemo(() => {
    return (
      <Table.Summary fixed="top">
        <TableSummary showAandM={showAandM} showIndex={showIndex} />
      </Table.Summary>
    );
  }, [showAandM, showIndex]);

  useEffect(() => {
    if (isSuccessCall === false) {
      message.error({
        content: t('NOT_AUTHORIZED'),
        style: {
          marginTop: '8vh',
          marginLeft: '30px',
        },
      });
    }
  }, [isSuccessCall, t]);

  useEffect(() => {
    dispatch(Creators.getElasticityDataRequest());
  }, [dispatch]);

  useEffect(() => {
    let filterStatus = false;
    filterStatus = Object.values(filters).some(item => ((item && item !== '' && item?.length > 0)));
    setHasFilter(filterStatus);
    dispatch(Creators.setFilterList({ filters, hasFilter: filterStatus }));
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(Creators.setUpdateList());
  }, [dispatch, filteredTableData]);

  return (
    <div className="app-content">
      <PageTitle title={t('PRICING_TOOL')} />
      <SimulateIndex
        setOpenSimulation={setOpenSimulation}
        openSimulation={openSimulation}
        t={t}
        simulateData={simulateData}
        showAandM={showAandM}
      />
      <ProductCard
        productData={detailProductData}
        setOpenDetail={setOpenDetail}
        openDetail={openDetail}
        t={t}
      />
      <Row gutter={24} className={classes.selectContainer}>
        <Col span={4}>
          <SelectFilter
            type="category"
            description={t('CATEGORY')}
            placeholder={t('SELECT_CATEGORY')}
            setFilters={setFilters}
            filters={filters}
            optionList={categoryList}
            disabled={filterDisabled}
          />
        </Col>
        <Col span={4}>
          <SelectFilter
            type="subcategory"
            description={t('SUBCATEGORY')}
            placeholder={t('SELECT_SUBCATEGORY')}
            setFilters={setFilters}
            filters={filters}
            optionList={subcategoryList}
            disabled={filterDisabled}
          />
        </Col>
        <Col span={4}>
          <SelectFilter
            type="brand"
            description={t('BRAND')}
            placeholder={t('SELECT_BRAND')}
            setFilters={setFilters}
            filters={filters}
            optionList={brandList}
            disabled={filterDisabled}
          />
        </Col>
        <Col span={4}>
          <SelectFilter
            type="supplier"
            description={t('SUPPLIER')}
            placeholder={t('SELECT_SUPPLIER')}
            setFilters={setFilters}
            filters={filters}
            mode="multiple"
            optionList={supplierList}
            disabled={filterDisabled}
          />
        </Col>
        <Col span={4}>
          <SelectFilter
            type="manufacturer"
            description={t('MANUFACTURER')}
            placeholder={t('SELECT_MANUFACTURER')}
            setFilters={setFilters}
            filters={filters}
            optionList={manufacturerList}
            disabled={filterDisabled}
          />
        </Col>
        <Col span={4}>
          <SelectFilter
            type="product"
            description={t('PRODUCT')}
            placeholder={t('SELECT_PRODUCT')}
            setFilters={setFilters}
            filters={filters}
            options={productList.map(value => (
              <Option key={value} value={value} label={value}>
                <div className="demo-option-label-item">
                  <img
                    alt={t('PRODUCT')}
                    src={
                      tableData?.find(e => e?.product_id === value)?.picurl
                    }
                    className={classes.productSelectImg}
                  />
                  &nbsp;
                  {
                    tableData?.find(e => e?.product_id === value)
                      ?.product_name
                  }
                </div>
              </Option>
            ))}
            disabled={filterDisabled}
          />
        </Col>
      </Row>
      <Badge.Ribbon
        style={{ display: hasExcelData ? 'flex' : 'none' }}
        text="Filtered"
        color="purple"
      >
        <Table
          title={() => tableTitleMemo}
          size="small"
          bordered
          className={classes.subcategoryColumns}
          loading={loading}
          columns={pricingColumns}
          dataSource={
            showDiscounted
              ? filteredTableData.filter(
                element => element.price > element.discounted_price,
              )
              : filteredTableData
          }
          scroll={{ x: 1300, y: 800 }}
          summary={() => tableSummaryMemo}
        />
      </Badge.Ribbon>
    </div>
  );
};

const reduxKey = REDUX_KEY.PRICING_TOOL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(PricingTool);
