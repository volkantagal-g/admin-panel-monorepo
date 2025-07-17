import { useDispatch, useSelector } from 'react-redux';
import { Switch, Tooltip, Col, Row, Button, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { DownloadOutlined } from '@ant-design/icons';

import { Creators } from '../../redux/actions';
import { listSelector, stateSelector } from '../../redux/selectors';
import { FILTER_KEY, INDEX_TYPE_LIST, DE_COUNTRY_CODE } from '../../constants';
import useStyles from '../../styles';
import SelectTitle from '../SelectTitle';
import IntegrationType from '../IntegrationType';

const { Option } = Select;

const TableTitle = ({
  setShowIndex,
  showIndex,
  setHasExcelData,
  setFilters,
  setOpenSimulation,
  domainType,
  baseCompetitor,
  indexType,
  priorityList,
  currentCompetitorList,
  excelAllData,
  setExcelAllData,
  filterDisabled,
  showIndexType,
  setShowIndexType,
  setOpenDrawer,
  showBundleCheck,
  setShowBundleCheck,
  showFamilyColumn,
  setShowFamilyColumn,
  countryCode,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligencePriceRecommendation');

  const loading = useSelector(stateSelector.loading);
  const updateList = useSelector(listSelector.updateList);
  const historicUpdateList = useSelector(listSelector.historicUpdateList);
  const excelExportDataTitles = useSelector(
    stateSelector.excelExportDataTitles,
  );
  const excelExportDataColumns = useSelector(
    stateSelector.excelExportDataColumns,
  );
  const excelExportBundleDataTitles = useSelector(
    stateSelector.excelExportBundleDataTitles,
  );
  const excelExportBundleDataColumns = useSelector(
    stateSelector.excelExportBundleDataColumns,
  );

  const handleSimulateIndex = () => {
    setOpenSimulation(true);
    let isDifferent = true;
    if (historicUpdateList?.length === updateList?.length) {
      historicUpdateList.forEach(baseElement => {
        updateList.forEach(changedElement => {
          if (
            baseElement?.getir_product_id === changedElement?.getir_product_id
          ) {
            const difference = Object.entries(baseElement).some(
              ([key, value]) => key === 'new_getir_price' &&
                value !== changedElement.new_getir_price,
            );
            if (difference) isDifferent = true;
            else isDifferent = false;
          }
        });
      });
    }
    if (isDifferent) {
      dispatch(
        Creators.getSimulateIndexRequest({
          productList: updateList,
          competitorList: currentCompetitorList,
          domainType,
          baseCompetitor,
          indexType,
          priorityList,
        }),
      );
    }
  };

  const handleClear = () => {
    dispatch(Creators.setClearFilteredData());
    setFilters({
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
        [FILTER_KEY.matchedProduct]: [],
        [FILTER_KEY.guardrailFailed]: [],
        [FILTER_KEY.finalAlert]: [],
        [FILTER_KEY.newRecommendation]: [],
        [FILTER_KEY.bundledProduct]: [],
        [FILTER_KEY.discountedProduct]: [],
        [FILTER_KEY.activeRule]: [],
      },
    });
    setHasExcelData(false);
  };

  const exportCsv = () => {
    dispatch(
      Creators.exportPriceRecommendationRequest({
        rows: excelExportDataTitles,
        fileName: `${
          excelAllData ? 'Filtered' : 'All'
        }_Price_Recommendation_Products_${moment()?.format('YYYY-MM-DD')}}.csv`,
        columns: excelExportDataColumns,
      }),
    );
    dispatch(
      Creators.exportPriceRecommendationRequest({
        rows: excelExportBundleDataTitles,
        fileName: `${
          excelAllData ? 'Filtered' : 'All'
        }_Price_Recommendation_Bundle_Products_${moment()?.format('YYYY-MM-DD')}}.csv`,
        columns: excelExportBundleDataColumns,
      }),
    );
  };
  return (
    <Row className={classes.subcategoryPriceChange}>
      <Col sm={3}>
        <Tooltip title={t('ALL_FILTERED_CSV_DATA')} color="purple">
          <SelectTitle src="csv" description={t('CSV_EXPORT')} />
        </Tooltip>
        <div className={classes.csvButtonWrapper}>
          <Switch
            size="small"
            checked={excelAllData}
            checkedChildren={t('FILTERED_CHECKED')}
            unCheckedChildren={t('ALL')}
            onChange={() => setExcelAllData(!excelAllData)}
          />
          <Tooltip
            title={
              <div style={{ fontSize: '1.5vh' }}>{t('CSV_EXPORT')}</div>
            }
            color="green"
          >
            <Button
              type="text"
              shape="circle"
              size="large"
              icon={(
                <DownloadOutlined
                  style={{ color: 'green', fontSize: '2.2vh' }}
                />
              )}
              onClick={() => exportCsv()}
            />
          </Tooltip>
        </div>
      </Col>
      {countryCode === DE_COUNTRY_CODE ? (
        <Col sm={3} className={classes.index}>
          <Row>
            <IntegrationType />
          </Row>
        </Col>
      ) : (
        <div />
      )}
      <Col sm={2} className={classes.index}>
        <SelectTitle src="family" description={t('FAMILY_NAME')} />
        <Row className={classes.tableTitleButtons}>
          <Switch
            disabled={loading}
            size="small"
            checked={showFamilyColumn}
            checkedChildren={t('ON')}
            unCheckedChildren={t('OFF')}
            onChange={() => setShowFamilyColumn(!showFamilyColumn)}
          />
        </Row>
      </Col>
      <Col sm={2} className={classes.index}>
        <Tooltip title={t('SHOW_BUNDLE_INDEX_CHECK')} color="purple">
          <SelectTitle src="bundled" description={t('BUNDLE_CHECK')} />
        </Tooltip>
        <Row className={classes.tableTitleButtons}>
          <Switch
            disabled={loading}
            size="small"
            checked={showBundleCheck}
            checkedChildren={t('ON')}
            unCheckedChildren={t('OFF')}
            onChange={() => setShowBundleCheck(!showBundleCheck)}
          />
        </Row>
      </Col>
      <Col sm={2} className={classes.index}>
        <Tooltip title={t('SHOW_INDEX_OF_PRODUCTS')} color="purple">
          <SelectTitle src="index" description={t('INDEX_WITHOUT_COLON')} />
        </Tooltip>
        <Row className={classes.tableTitleButtons}>
          <Switch
            disabled={loading}
            size="small"
            checked={showIndex}
            checkedChildren={t('ON')}
            unCheckedChildren={t('OFF')}
            onChange={() => setShowIndex(!showIndex)}
          />
        </Row>
      </Col>
      {showIndex && (
        <Col sm={5} className={classes.index}>
          <SelectTitle src="weighted" description={t('INDEX_TYPE')} />
          <Select
            filterOption
            className={classes.categorySelect}
            defaultValue={INDEX_TYPE_LIST.NOMINAL_INDEX.key}
            value={showIndexType}
            onChange={value => setShowIndexType(value)}
            disabled={loading || !showIndex}
          >
            {Object.values(INDEX_TYPE_LIST).map(value => (
              <Option key={value?.key} value={value?.key} label={value?.name}>
                <div className="demo-option-label-item">{value?.name}</div>
              </Option>
            ))}
          </Select>
        </Col>
      )}
      <Col span={4} className={classes.additionalFilterWrapper}>
        <Button
          type="text"
          onClick={() => setOpenDrawer(true)}
          className={classes.purpleGetirColor}
          disabled={filterDisabled}
        >
          {t('FILTERS')}
        </Button>
      </Col>
      <Col sm={4} className={classes.simulateButtonWrapper}>
        <Button
          type="text"
          onClick={handleSimulateIndex}
          className={classes.purpleGetirColor}
          disabled={!(updateList?.length > 0)}
        >
          {t('SIMULATE_INDEX')}
        </Button>
      </Col>
      <Col sm={4} className={classes.clearButtonWrapper}>
        <Tooltip title={t('BACK_TO_ALL_DATA')} color="purple">
          <Button
            type="text"
            onClick={handleClear}
            className={classes.purpleGetirColor}
          >
            {t('RESET')}
          </Button>
        </Tooltip>
      </Col>
    </Row>
  );
};
export default TableTitle;
