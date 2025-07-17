import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InputNumber, Switch, Tooltip, Col, Row, Button, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import { Creators } from '../../redux/actions';
import { listSelector, stateSelector } from '../../redux/selectors';
import { SELECT_TITLE_ICONS } from '../../constants';
import { isFloat } from '../../utils/common';
import { changeExcelProductPrice, changeProductPrice, getSubcategoryPercentage } from '../../utils/changePrice';
import { isDiscountedPrice } from '../../utils/calculate';
import useStyles from '../../styles';
import CsvImporter from '@shared/components/UI/CsvImporter';

const TableTitle = ({
  showDiscounted,
  showAandM,
  setShowAandM,
  hasFilter,
  setShowIndex,
  showIndex,
  setShowDiscounted,
  setIsCSVModalOpen,
  isCSVModalOpen,
  setFilterDisabled,
  setHasExcelData,
  setFilters,
  setHasFilter,
  setOpenSimulation,
}) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const { t } = useTranslation('pricingTool');

  const subcategoryPercentage = useSelector(
    stateSelector.subcategoryPercentage,
  );
  const loading = useSelector(stateSelector.loading);
  const tableData = useSelector(stateSelector.tableData);
  const filteredTableData = useSelector(stateSelector.filteredTableData);
  const priceType = useSelector(stateSelector.priceType);
  const updateList = useSelector(listSelector.updateList);

  const exampleCsv = {
    product_id: '56f50648707a850300a1d71d',
    new_price: 109,
    new_ssr: 2,
  };

  const changeSubcategoryPercentage = value => {
    dispatch(Creators.setSubcategoryPercentage({ data: value }));

    const tempArray = [];
    let tempTableData;

    filteredTableData.forEach(event => {
      const tempEvent = { ...event };
      tempEvent.new_price = isDiscountedPrice(event) * (1 + value / 100);
      tempEvent.price_change =
        (100 * (event.new_price - isDiscountedPrice(event))) /
        isDiscountedPrice(event);
      tempArray.push(tempEvent);
    });

    tempArray.forEach(record => {
      const { newTableData } = changeProductPrice(
        tempArray,
        priceType,
        record,
        record.new_price,
        'new_price',
        showAandM,
      );
      tempTableData = newTableData;
    });

    dispatch(Creators.setFilteredTableData({ data: tempTableData }));
  };

  const handleExcelExport = () => {
    const fields = Object.keys(filteredTableData[0]).map(key => {
      return { key, title: key, default: '' };
    });
    let content = filteredTableData.map(e => Object.fromEntries(
      Object.entries(e).map(([key, value]) => [
        key,
        isFloat(value) ? parseFloat(value).toFixed(2) : value,
      ]),
    ));

    const containsNumbers = str => /\d/.test(str);
    content = content.map(obj => {
      const newObj = obj;
      Object.entries(obj).forEach(element => {
        if (typeof element[1] === 'string' && containsNumbers(element[1])) {
          newObj[element[0]] = element[1].replace('.', ',');
        }
      });
      return newObj;
    });

    const pricingTool = { fields, content };
    dispatch(Creators.exportPricingToolRequest({ data: pricingTool }));
  };

  const handleExcelImport = ({ data }) => {
    const propList = ['new_price', 'new_ssr'];
    const changedList = [];
    data.forEach(dataItem => {
      if (dataItem?.product_id) {
        tableData.forEach((tableDataItem, tableDataIndex) => {
          if (dataItem.product_id === tableDataItem.product_id) {
            propList.forEach(property => {
              if (parseFloat(tableData[tableDataIndex][property]) !== parseFloat(dataItem[property])
              && dataItem[property] !== '' && dataItem[property] !== null) {
                const currentNewRecord = changedList.find(element => element.product_id === tableData[tableDataIndex].product_id) || tableData[tableDataIndex];
                const { newTableData } =
                changeExcelProductPrice(currentNewRecord, priceType, tableData[tableDataIndex], parseFloat(dataItem[property]), property, showAandM);
                if (changedList.some(element => element.product_id === newTableData.product_id)) {
                  changedList.forEach((element, elementIndex) => {
                    if (element.product_id === newTableData.product_id) {
                      changedList[elementIndex] = newTableData;
                    }
                  });
                }
                else changedList.push(newTableData);
              }
              else if (dataItem[property] === '' || dataItem[property] === null) {
                message.error({ content: `${t('INVALID_PRICE_OR_SSR')} ${dataItem.product_id}` });
              }
              else if (changedList.some(element => element.product_id === tableData[tableDataIndex].product_id)) {
                changedList.forEach((element, elementIndex) => {
                  if (element.product_id === tableData[tableDataIndex].product_id) {
                    changedList[elementIndex][property] = tableData[tableDataIndex][property];
                  }
                });
              }
              else changedList.push(tableData[tableDataIndex]);
            });
          }
        });
      }
    });
    setFilterDisabled(true);
    setHasExcelData(true);
    setShowDiscounted(false);

    const { percentage } = getSubcategoryPercentage(changedList, showAandM);
    dispatch(Creators.setSubcategoryPercentage({ data: percentage }));
    dispatch(Creators.setExcelData({ data: changedList }));
  };

  const handleClear = () => {
    dispatch(Creators.setClearFilteredData());
    setFilters({
      category: '',
      subcategory: '',
      brand: '',
      manufacturer: '',
      supplier: [],
    });
    setHasFilter(false);
    setHasExcelData(false);
  };

  return (
    <Row gutter={19} className={classes.subcategoryPriceChange}>
      <Col sm={3}>
        <div className={classes.subcategoryPriceChangeDiv}>
          {t('ALL_PRODUCTS_PRICE_CHANGE')}
        </div>
        <InputNumber
          prefix="%"
          value={subcategoryPercentage}
          onChange={changeSubcategoryPercentage}
          step={0.1}
          disabled={!hasFilter}
        />
      </Col>
      <Col sm={3} className={classes.discounted}>
        <Tooltip title={t('SHOW_ONLY_DISCOUNTED_PRODUCTS')} color="purple">
          <div className={classes.discountedDiv}>
            <img
              alt={t('PRODUCTS')}
              src={SELECT_TITLE_ICONS.discounted}
              className={classes.currentPriceImg}
            />{' '}
            {t('DISCOUNTED')}
          </div>
        </Tooltip>
        <Switch
          disabled={loading}
          size="small"
          checked={showDiscounted}
          onChange={() => {
            setShowDiscounted(!showDiscounted);
          }}
        />
      </Col>
      <Col sm={3} className={classes.setStruckPrice}>
        <Tooltip title={t('TOOLTIP_TITLE_PURPLE')} color="purple">
          <div className={classes.setStruckPriceDiv}>
            <img
              alt={t('PRODUCTS')}
              src={SELECT_TITLE_ICONS.scratch}
              className={classes.currentPriceImg}
            />{' '}
            {t('SET_STRUCK_PRICE')}
          </div>
        </Tooltip>
        <Switch
          disabled={loading}
          checked={showAandM}
          size="small"
          onChange={() => setShowAandM(!showAandM)}
        />
      </Col>
      <Col sm={3} className={classes.index}>
        <Tooltip title={t('SHOW_INDEX')} color="purple">
          <div className={classes.indexDiv}>
            <img
              alt={t('INDEX')}
              src={SELECT_TITLE_ICONS.index}
              className={classes.currentPriceImg}
            />{' '}
            {t('INDEX')}
          </div>
        </Tooltip>
        <Switch
          disabled={loading}
          size="small"
          checked={showIndex}
          onChange={() => setShowIndex(!showIndex)}
        />
      </Col>
      <Col sm={3} className={classes.simulateButtonWrapper}>
        <Button
          type="text"
          onClick={() => {
            setOpenSimulation(true);
            dispatch(Creators.getSimulateIndexRequest({ productList: updateList }));
          }}
          className={classes.purpleGetirColor}
          disabled={!(updateList?.length > 0)}
        >
          {t('SIMULATE_INDEX')}
        </Button>
      </Col>
      <Col sm={3} className={classes.clearButtonWrapper}>
        <Tooltip title={t('CLEAR_DATA')} color="purple">
          <Button
            type="text"
            onClick={handleClear}
            className={classes.purpleGetirColor}
          >
            {t('RESET')}
          </Button>
        </Tooltip>
      </Col>
      {filteredTableData?.length > 0 ? (
        <Col sm={1} className={classes.excelExport}>
          <Tooltip
            title={t('EXCEL_EXPORT')}
            placement="bottomRight"
          >
            <Button
              type="text"
              shape="circle"
              size="large"
              onClick={handleExcelExport}
              icon={<DownloadOutlined className={classes.downloadOutlined} />}
            />
          </Tooltip>
        </Col>
      ) : null}
      {filteredTableData?.length > 0 ? (
        <Col sm={1} className={classes.csvImporterWrapper}>
          <Button
            type="text"
            shape="circle"
            size="large"
            className={classes.csvImporter}
            onClick={() => setIsCSVModalOpen(true)}
          >
            <CsvImporter
              modalProps={{
                title: t('UPLOAD_CSV_AND_EXECUTE'),
                okText: t('UPLOAD_CSV_AND_EXECUTE'),
              }}
              onOkayClick={handleExcelImport}
              hasNestedHeaderKeys
              exampleCsv={exampleCsv}
              isVisible={isCSVModalOpen}
              exampleTableProps={{ className: classes.csvModal }}
            />
          </Button>
        </Col>
      ) : null}
    </Row>
  );
};
export default TableTitle;
