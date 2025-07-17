import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Tag, Row, Col, Button, Tooltip, Switch } from 'antd';
import { DownloadOutlined, ReloadOutlined } from '@ant-design/icons';

import CategoryFilter from '@app/pages/MarketIntelligencePriceIndex/components/CategoryFilter';
import SubCategoryFilter from '@app/pages/MarketIntelligencePriceIndex/components/SubcategoryFilter';
import { Creators } from '@app/pages/MarketIntelligencePriceIndex/redux/actions';
import { stateSelector } from '@app/pages/MarketIntelligencePriceIndex/redux/selectors';
import { isFloat } from '@app/pages/MarketIntelligencePriceIndex/utils/isFloat';
import { INDEX_BY_LIST, INDEX_CALCULATION_DEFINITION, FILTER_KEY } from '@app/pages/MarketIntelligencePriceIndex/constants';
import useStyles from '@app/pages/MarketIntelligencePriceIndex/styles';
import SelectTitle from '../SelectTitle';

const TableTitle = (
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
) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligencePriceIndex');

  const excelExportCategory = useSelector(stateSelector.excelExportCategory);

  const handleexportPriceIndex = () => {
    const fields = Object.keys(
      indexBy !== INDEX_BY_LIST.PRODUCT[0]
        ? excelExportCategory.category.data[0]
        : excelExportCategory.data[0],
    ).map(key => {
      return { key, title: key, default: '' };
    });
    let content = (
      indexBy !== INDEX_BY_LIST.PRODUCT[0]
        ? excelExportCategory.category
        : excelExportCategory
    ).data.map(e => Object.fromEntries(
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

    const priceIndex = { fields, content };
    dispatch(Creators.exportPriceIndexRequest({ data: priceIndex }));
  };

  const handleClear = () => {
    dispatch(Creators.setClearFilter());
    setFilters({
      [FILTER_KEY.CATEGORY]: [],
      [FILTER_KEY.SUBCATEGORY]: [],
      [FILTER_KEY.BRAND]: [],
      [FILTER_KEY.SUPPLIER]: [],
      [FILTER_KEY.PRODUCT]: [],
    });
  };

  return (
    <>
      {indexBy !== INDEX_BY_LIST.PRODUCT[0] ? (
        <Row className={classes.tableRowContainerFilter}>
          <Col sm={6} className={classes.outdatedFilter}>
            {indexBy === INDEX_BY_LIST.CATEGORIES[0] ? (
              <div className={classes.excludeOutdatedProducts}>
                <SelectTitle
                  src="products"
                  description={t('EXCLUDE_OUTDATED_PRODUCTS')}
                />
                <Switch
                  size="small"
                  checked={showOutdatedProducts}
                  checkedChildren={t('ON')}
                  unCheckedChildren={t('OFF')}
                  className={classes.outdatedSwitch}
                  onChange={() => setShowOutdatedProducts(!showOutdatedProducts)}
                />
              </div>
            ) : (
              ''
            )}
          </Col>
          <Col sm={12} className={classes.exludeFilter}>
            <CategoryFilter
              setExcludeCategory={setExcludeCategory}
              excludeCategory={excludeCategory}
              indexBy={indexBy}
            />
            <SubCategoryFilter
              setExcludeSubCategory={setExcludeSubCategory}
              excludeSubCategory={excludeSubCategory}
              indexBy={indexBy}
              excludeSubCategoryList={excludeSubCategoryList}
            />
          </Col>
          <Col sm={6} />
        </Row>
      ) : (
        ''
      )}
      <Row className={classes.tableCategoryRow}>
        <Col sm={4} className={classes.excelExport}>
          {Object.keys(excelExportCategory)?.length > 0 ? (
            <Tooltip title={t('EXCEL_EXPORT')} color="green">
              <Button
                type="text"
                shape="circle"
                size="large"
                onClick={handleexportPriceIndex}
                icon={<DownloadOutlined className={classes.downloadOutlined} />}
              />
            </Tooltip>
          ) : (
            ''
          )}
          {indexBy === INDEX_BY_LIST.PRODUCT[0] ? (
            <Tooltip title={t('CLEAR_FILTERS')} color="green">
              <Button
                type="text"
                shape="circle"
                size="large"
                onClick={handleClear}
                icon={<ReloadOutlined className={classes.reloadOutlined} />}
              />
            </Tooltip>
          ) : (
            ''
          )}
        </Col>
        <Col sm={4} className={classes.centerItems}>
          <div className={classes.bolderDiv}>
            <Tag color="yellow"> {'<100IX'} </Tag>
            <Tag color="grey">=100IX</Tag>
            <Tag color="blue">{'>100IX'}</Tag>
          </div>
        </Col>
        <Col sm={4} className={classes.centerItems}>
          {t('UPDATED_EVERY_DAY')}
        </Col>
      </Row>
      <Row className={classes.tableRowContainer}>
        <Col sm={12}>
          <div className={classes.bolderDiv}>
            ({t(INDEX_CALCULATION_DEFINITION[indexType])})
          </div>
        </Col>
      </Row>
    </>
  );
};

export default TableTitle;
