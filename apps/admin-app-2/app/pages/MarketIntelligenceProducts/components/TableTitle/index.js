import { useDispatch } from 'react-redux';
import { Row, Col, Tooltip, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import SelectFilter from '../SelectFilter';
import useStyles from '@app/pages/MarketIntelligenceProducts/styles';
import { Creators } from '@app/pages/MarketIntelligenceProducts/redux/actions';

const TableTitle = (filters, setFilters, options, excelExport, showPrediction) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligenceProducts');

  const handleExportProducts = () => {
    let excelTitle = [];
    let excelColumns = [];

    if (showPrediction === false) {
      excelTitle = excelExport?.columns?.filter(e => !e.includes('pred')).map(key => {
        return ({ key, title: key, default: '' });
      });
      // eslint-disable-next-line camelcase
      excelColumns = excelExport?.data?.map(({ predicted, pred_subcategory, pred_category, ...rest }) => {
        return rest;
      });
    }
    else {
      excelTitle = excelExport?.columns?.map(key => {
        return ({ key, title: key, default: '' });
      });
      excelColumns = excelExport?.data;
    }

    const containsNumbers = str => (/\d/.test(str));
    excelColumns = excelColumns.map(obj => {
      const newObj = obj;
      Object.entries(obj).forEach(
        element => {
          if (typeof element[1] === 'string' && containsNumbers(element[1])) {
            newObj[element[0]] = element[1].replace('.', ',');
          }
        },
      );
      return newObj;
    });
    const products = { fields: excelTitle, content: excelColumns };
    dispatch(Creators.exportProductsRequest({ data: products }));
  };

  return (
    <Row className={classes.tableFilterContainer}>
      <Col sm={4} className={classes.tableFilterItem}>
        <SelectFilter
          src="category"
          description={t('CATEGORY')}
          placeholder={t('SEARCH_CATEGORY')}
          handleChange={value => setFilters({ ...filters, category: (value === undefined ? [] : value) })}
          options={options?.category}
        />
      </Col>
      <Col sm={4} className={classes.tableFilterItem}>
        <SelectFilter
          src="subcategory"
          description={t('SUBCATEGORY')}
          placeholder={t('SEARCH_SUBCATEGORY')}
          handleChange={value => setFilters({ ...filters, subcategory: (value === undefined ? [] : value) })}
          options={options?.subcategory}
        />
      </Col>
      <Col sm={4} className={classes.tableFilterItem}>
        <SelectFilter
          src="brand"
          description={t('BRAND')}
          placeholder={t('SEARCH_BRAND')}
          handleChange={value => setFilters({ ...filters, brand: (value === undefined ? [] : value) })}
          options={options?.brand}
        />

      </Col>
      <Col sm={4} className={classes.tableFilterItem}>
        <SelectFilter
          src="products"
          description={t('PRODUCT')}
          placeholder={t('SEARCH_PRODUCT')}
          handleChange={value => setFilters({ ...filters, product: (value === undefined ? [] : value) })}
          options={options?.product}
        />
      </Col>
      {excelExport?.data?.length > 0 ? (
        <Col className={classes.excelExport}>
          <Tooltip
            title={t('EXCEL_EXPORT')}
            className={classes.excelExportTooltip}
          >
            <Button
              type="text"
              shape="circle"
              size="large"
              onClick={handleExportProducts}
              icon={(
                <DownloadOutlined className={classes.downloadOutlined} />
              )}
            />
          </Tooltip>
        </Col>
      )
        : ''}

    </Row>
  );
};
export default TableTitle;
