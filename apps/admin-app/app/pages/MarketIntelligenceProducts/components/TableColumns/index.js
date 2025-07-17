import { Image, Col, Row } from 'antd';

import downArrow from '../../assets/img/down-arrow.png';
import noPicture from '../../assets/img/no-pictures.png';

const TableColumns = (showPrediction, currency, classes, t) => {
  const columns = [
    showPrediction ?
      {
        title: t('CATEGORY'),
        children: [
          {
            title: t('COMPETITOR_CATEGORY'),
            dataIndex: 'category',
            key: 'category',
            sorter: (a, b) => a.category.length - b.category.length,
            sortDirections: ['descend', 'ascend'],
            width: '5%',
            render: text => (
              <span className={classes.tableColumns}>
                {text}
              </span>
            ),
          },
          {
            title: t('PREDICTED_GETIR_CATEGORY'),
            dataIndex: 'pred_category',
            key: 'pred_category',
            sorter: (a, b) => a.pred_category.length - b.pred_category.length,
            sortDirections: ['descend', 'ascend'],
            width: '5%',
            render: text => (
              <span className={classes.tableColumns}>
                {text.trim()}
              </span>
            ),
          }],
      } :
      {
        title: t('CATEGORY'),
        dataIndex: 'category',
        key: 'category',
        sorter: (a, b) => a.category.length - b.category.length,
        sortDirections: ['descend', 'ascend'],
        width: '10%',
        render: text => (
          <span className={classes.tableColumns}>
            {text}
          </span>
        ),
      },
    showPrediction ?
      {
        title: t('SUBCATEGORY'),
        children: [
          {
            title: t('COMPETITOR_SUBCATEGORY'),
            dataIndex: 'subcategory',
            key: 'subcategory',
            sorter: (a, b) => a.subcategory.length - b.subcategory.length,
            sortDirections: ['descend', 'ascend'],
            width: '5%',
            render: text => (
              <span className={classes.tableColumns}>
                {text}
              </span>
            ),
          },
          {
            title: t('PREDICTED_GETIR_SUBCATEGORY'),
            dataIndex: 'pred_subcategory',
            key: 'pred_subcategory',
            sorter: (a, b) => a.pred_subcategory.length - b.pred_subcategory.length,
            sortDirections: ['descend', 'ascend'],
            width: '5%',
            render: text => (
              <span className={classes.tableColumns}>
                {text.trim()}
              </span>
            ),
          }],
      } :
      {
        title: t('SUBCATEGORY'),
        dataIndex: 'subcategory',
        key: 'subcategory',
        sorter: (a, b) => a.subcategory.length - b.subcategory.length,
        sortDirections: ['descend', 'ascend'],
        width: '10%',
        render: text => (
          <span className={classes.tableColumns}>
            {text}
          </span>
        ),
      },
    {
      title: t('BRAND'),
      dataIndex: 'brand',
      key: 'brand',
      sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ['descend', 'ascend'],
      width: '5%',
      render: text => (
        <span className={classes.tableColumns}>
          {text}
        </span>
      ),
    },
    {
      title: t('PRODUCT_NAME'),
      dataIndex: 'product_name',
      key: 'product_name',
      sorter: (a, b) => a.product_name.length - b.product_name.length,
      sortDirections: ['descend', 'ascend'],
      width: '10%',
      render: text => (
        <span className={classes.tableColumns}>
          {text}
        </span>
      ),
    },
    {
      title: t('IMAGE'),
      dataIndex: 'image_url',
      key: 'image_url',
      sorter: (a, b) => a.image_url.length - b.image_url.length,
      width: '8%',
      render: text => (
        <Image src={text} fallback={noPicture} className={classes.tableColumnsImage} />
      ),
      align: 'center',
    },
    {
      title: t('PRICE'),
      dataIndex: 'base_price',
      key: 'base_price',
      sorter: (a, b) => a.base_price - b.base_price,
      sortDirections: ['descend', 'ascend'],
      align: 'center',
      width: '8%',
      render: (text, record) => {
        return {
          children: (
            <Row className={classes.priceRowContainer}>
              <Col
                sm={4}
                className={classes.priceRowItemImg}
              >
                {record.discounted_price && parseFloat(record.discounted_price) < parseFloat(text)
                  ? (
                    <img
                      src={downArrow}
                      alt={t('DOWN')}
                      className={classes.arrowImg}
                    />
                  ) : null}
              </Col>
              <Col sm={8} className={classes.priceRowItem}>
                <div>
                  {`${parseFloat(text).toFixed(2)} ${currency}`}
                </div>
                {record.discounted_price && record.discounted_price < parseFloat(text)
                  ? (
                    <div className={classes.discountedPrice}>
                      {`${parseFloat(record.discounted_price).toFixed(2)} ${currency}`}
                    </div>
                  ) : null}
              </Col>
            </Row>
          ),
        };
      },
    },
    {
      title: t('UNIT'),
      dataIndex: 'unit',
      key: 'unit',
      sorter: (a, b) => (a?.unit && b?.unit ? a.unit.localeCompare(b.unit) : null),
      sortDirections: ['descend', 'ascend'],
      align: 'center',
    },
    {
      title: t('SIZE'),
      dataIndex: 'size',
      key: 'size',
      sorter: (a, b) => parseInt(a.size, 10) - parseInt(b.size, 10),
      sortDirections: ['descend', 'ascend'],
      align: 'center',
    },
    {
      title: t('QUANTITY'),
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => parseInt(a.quantity, 10) - parseInt(b.quantity, 10),
      sortDirections: ['descend', 'ascend'],
      align: 'center',
    },
    {
      title: t('UNIT_PRICE'),
      dataIndex: 'base_unit_price',
      key: 'base_unit_price',
      sorter: (a, b) => a.base_unit_price - b.base_unit_price,
      sortDirections: ['descend', 'ascend'],
      align: 'center',
      width: '8%',
      render: (text, record) => {
        return {
          children: text ? (
            <Row className={classes.priceRowContainer}>
              <Col sm={4} className={classes.priceRowItemImg}>
                {record.discounted_unit_price &&
                parseFloat(record.discounted_unit_price) < parseFloat(text) ? (
                  <img
                    src={downArrow}
                    alt={t('DOWN')}
                    className={classes.arrowImg}
                  />
                  ) : null}
              </Col>
              <Col sm={8} className={classes.priceRowItem}>
                <div>{`${parseFloat(text).toFixed(2)} ${currency}`}</div>
                {record.discounted_unit_price &&
                record.discounted_unit_price < parseFloat(text) ? (
                  <div className={classes.discountedPrice}>
                    {`${parseFloat(record.discounted_unit_price).toFixed(
                      2,
                    )} ${currency}`}
                  </div>
                  ) : null}
              </Col>
            </Row>
          ) : (
            <div>{text}</div>
          ),
        };
      },
    },
    {
      title: t('UNIT_PRICE_UNIT'),
      dataIndex: 'unit_price_unit',
      key: 'unit_price_unit',
      sorter: (a, b) => (a?.unit_price_unit && b?.unit_price_unit ? a.unit_price_unit.localeCompare(b.unit_price_unit) : null),
      sortDirections: ['descend', 'ascend'],
      align: 'center',
    },
    {
      title: t('UNIT_PRICE_SIZE'),
      dataIndex: 'unit_price_size',
      key: 'unit_price_size',
      sorter: (a, b) => parseInt(a.unit_price_size, 10) - parseInt(b.unit_price_size, 10),
      sortDirections: ['descend', 'ascend'],
      align: 'center',
    },
  ];

  return columns;
};

export default TableColumns;
