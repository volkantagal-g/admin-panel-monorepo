import { Image, InputNumber, Tooltip, Col, Row, Button, Badge } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import noPicture from '../../assets/img/no-pictures.png';
import downArrow from '../../assets/img/down-arrow.png';
import { changeProductPrice } from '../../utils/changePrice';
import { priceColor, numberFormatter } from '../../utils/common';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';

import { Creators } from '../../redux/actions';
import { stateSelector, listSelector } from '../../redux/selectors';

import useStyles from '../../styles';
import { calculatePercentage } from '../../utils/calculate';
import { COMPETITORS } from '@app/pages/MarketIntelligencePriceIndex/constants';

const TableColumns = (showAandM, setOpenDetail, setDetailProductData, showIndex, hasExcelData) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('pricingTool');

  const country = getSelectedCountry();
  const currency = country.currency.symbol;

  const filteredTableData = useSelector(stateSelector.filteredTableData);
  const priceType = useSelector(stateSelector.priceType);
  const competitorList = useSelector(listSelector.competitorList);

  const [indexChildren, setIndexChildren] = useState([]);

  useEffect(() => {
    const tempChildren = [];
    if (competitorList?.length > 0) {
      competitorList.forEach(competitor => {
        const tempCompetitor = competitor?.split('-')[0];
        tempChildren.push({
          title: (
            <Row className={classes.priceIndexRow}>
              {COMPETITORS[competitor] ? (
                <>
                  <img
                    src={COMPETITORS[competitor][1]}
                    alt={tempCompetitor}
                    className={classes.priceIndexImage}
                  />
                  <span>{COMPETITORS[competitor][0]}</span>
                </>
              ) : (
                <>
                  <img
                    src={noPicture}
                    alt={tempCompetitor}
                    className={classes.priceIndexImage}
                  />
                  <span>{competitor}</span>
                </>
              )}
            </Row>
          ),
          dataIndex: 'competitor_product_infos',
          key: competitor,
          align: 'center',
          width: 100,
          render: (text, record) => {
            return {
              props: { style: { backgroundColor: !text[competitor] && '#E3E5E5' } },
              children: text[competitor] && (
                <div>
                  {(
                    (record.new_price /
                      text[competitor].competitor_discounted_price) *
                    100
                  ).toFixed(2)}
                </div>
              ),
            };
          },
        });
      });
    }
    setIndexChildren(tempChildren);
  }, [classes, competitorList, t]);

  const handleChangeInput = (record, value, type) => {
    const { percentage, newTableData } = changeProductPrice(filteredTableData, priceType, record, value, type, showAandM);
    dispatch(Creators.setSubcategoryPercentage({ data: percentage }));
    dispatch(Creators.setFilteredTableData({ data: newTableData }));
  };

  let columns = [
    {
      title: t('PRODUCT_NAME'),
      dataIndex: 'product_name',
      key: 'product_name',
      fixed: 'left',
      sorter: (a, b) => a.product_name.length - b.product_name.length,
      sortDirections: ['descend', 'ascend'],
      width: 200,
      render: (text, record) => (
        <Row gutter={2}>
          <Col span={8}>
            <Image src={record.picurl} fallback={noPicture} height="6vh" />
          </Col>
          <Col span={16}>
            <Button
              type="text"
              onClick={() => {
                setDetailProductData(record);
                setOpenDetail(true);
              }}
              className={classes.productNameSpan}
            >
              {text}
              {record.competitor_product_infos !== '' && (
              <Tooltip
                title={t('MATCHED_PRODUCT')}
                placement="bottom"
              >
                <Badge color="#5D3EBC" className={classes.competitorInfoBadge} />
              </Tooltip>
              )}
            </Button>
          </Col>
        </Row>
      ),
    },
    {
      title: t('PRICE_ELASTICITY'),
      dataIndex: 'price_elasticity',
      key: 'price_elasticity',
      fixed: 'left',
      width: 80,
      sorter: (a, b) => a.price_elasticity - b.price_elasticity,
      align: 'center',
      render: text => (
        <div> {parseFloat(text).toFixed(2)}</div>
      ),
    },
    {
      title: priceType === 'price' ? t('PRICE') : t('EFFECTIVE_PRICE'),
      fixed: 'left',
      children: [
        {
          title: t('CURRENT'),
          dataIndex: priceType,
          key: priceType,
          fixed: 'left',
          sorter: (a, b) => a.price - b.price,
          sortDirections: ['descend', 'ascend'],
          align: 'center',
          width: 100,
          render: (text, record) => {
            const listPrice = parseFloat(record.price);
            return {
              children: (
                <div className={classes.currentPriceContainer}>
                  <Row
                    gutter={24}
                    justify="center"
                    align="center"
                  >
                    <Col span={6} className={classes.downArrowCol}>
                      {record.discounted_price &&
                        parseFloat(record.discounted_price) < listPrice ? (
                          <img
                            src={downArrow}
                            alt={t('DOWN')}
                            className={classes.currentPriceImg}
                          />
                        ) : null}
                    </Col>
                    <Col
                      span={12}
                      justify="start"
                      align="center"
                      direction="column"
                      className={classes.columnDiv}
                    >
                      <div>
                        {parseFloat(text).toFixed(2)} {currency}
                      </div>
                      {record.discounted_price &&
                        record.discounted_price < listPrice ? (
                          <div className={classes.currentPriceDiv}>
                            {`${parseFloat(record.discounted_price).toFixed(2)} ${currency}`}
                          </div>
                        ) : null}
                    </Col>
                  </Row>
                </div>
              ),
            };
          },
        },
        {
          title: t('NEW'),
          dataIndex: priceType,
          key: priceType,
          fixed: 'left',
          width: 150,
          align: 'center',
          render: (text, record) => {
            return {
              children: (
                <>
                  <div>
                    <Tooltip
                      title={t('NEW_PRICE')}
                      placement="bottom"
                    >
                      <InputNumber
                        prefix={currency}
                        value={(!showAandM && !hasExcelData) ? record?.price?.toFixed(2) : record?.new_price?.toFixed(2)}
                        onChange={v => handleChangeInput(record, v, 'new_price')}
                        step={0.01}
                        min={0}
                        size="small"
                      />
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip
                      title={t('NEW_PRICE_PERCENTAGE')}
                      placement="bottom"
                    >
                      <InputNumber
                        prefix="%"
                        value={record?.price_change?.toFixed(1)}
                        onChange={v => handleChangeInput(record, v, 'price_change')}
                        step={0.1}
                        size="small"
                      />
                    </Tooltip>
                  </div>
                  {record.new_price < record[priceType] && (
                    <div>
                      <Tooltip
                        title={t('SUPPLIER_SUPPORT_RATIO')}
                        placement="bottom"
                      >
                        <div>
                          <InputNumber
                            prefix="%"
                            value={record?.new_ssr?.toFixed(1)}
                            defaultValue={0.0}
                            onChange={v => handleChangeInput(record, v, 'new_ssr')}
                            min={0}
                            max={100}
                            step={0.1}
                            size="small"
                          />
                        </div>
                      </Tooltip>
                    </div>
                  )}
                </>
              ),
            };
          },
        },
      ],
    },
    {
      title: t('INDEX'),
      children: indexChildren,
    },
    {
      title: t('WEEKLY_SALES'),
      children: [
        {
          title: t('CURRENT'),
          dataIndex: 'total_sales',
          key: 'total_sales',
          align: 'center',
          width: 100,
          render(text) {
            return {
              children: (
                <div>
                  {numberFormatter(text)}
                </div>
              ),
            };
          },
        },
        {
          title: t('NEW'),
          dataIndex: 'weekly_sales_predicted',
          key: 'weekly_sales_predicted',
          align: 'center',
          width: 100,
          render: (text, record) => {
            return {
              children: (
                <>
                  <div>{numberFormatter(text.toFixed(0))}</div>
                  <div
                    className={classes.productColumn}
                    style={{ color: priceColor(record.weekly_sales_predicted_percentage) }}
                  >
                    {record.weekly_sales_predicted_percentage !== 0
                      && (
                      <div>
                        <div>{numberFormatter((text - record.total_sales).toFixed(0))}</div>
                        <div>{`(${numberFormatter(record.weekly_sales_predicted_percentage)}%)`}
                        </div>
                      </div>
                      )}
                  </div>
                </>
              ),
            };
          },
        },
      ],
    },
    {
      title: t('WEEKLY_TOTAL_BASKET_VALUE'),
      children: [
        {
          title: t('CURRENT'),
          dataIndex: 'weekly_sales_basket',
          key: 'weekly_sales_basket',
          align: 'center',
          width: 100,
          render: text => (
            <div> {
              numberFormatter(text.toFixed(2)) + currency
            }
            </div>
          ),
        },
        {
          title: t('NEW'),
          dataIndex: 'weekly_total_basket_predicted',
          key: 'weekly_total_basket_predicted',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <>
              <div>{numberFormatter(text.toFixed(2)) + currency}
              </div>
              <div
                className={classes.productColumn}
                style={{ color: priceColor(record.weekly_total_basket_predicted_percentage) }}
              >
                {record.weekly_total_basket_predicted_percentage !== 0 && (
                <div>
                  <div>{numberFormatter((text - record.weekly_sales_basket).toFixed(0))} </div>
                  <div>{`(${numberFormatter(record.weekly_total_basket_predicted_percentage)}%)`}</div>
                </div>
                )}
              </div>
            </>
          ),
        },
      ],
    },
    {
      title: t('WEEKLY_NOMINAL_MARGIN'),
      children: [
        {
          title: t('CURRENT'),
          children: [
            {
              title: t('UNIT'),
              dataIndex: 'margin_current_product',
              key: 'margin_current_product',
              align: 'center',
              width: 100,
              render: text => (
                <div> {
                  numberFormatter(text.toFixed(2)) + currency
                }
                </div>
              ),
            },
            {
              title: t('TOTAL'),
              dataIndex: 'margin_current_gross',
              key: 'margin_current_gross',
              align: 'center',
              width: 100,
              render: text => (
                <div> {
                  numberFormatter(text.toFixed(2)) + currency
                }
                </div>
              ),
            },
          ],
        },
        {
          title: t('NEW'),
          children: [
            {
              title: t('UNIT'),
              dataIndex: 'margin_new_product',
              key: 'margin_new_product',
              align: 'center',
              width: 100,
              render: (text, record) => (
                <>
                  <div>{numberFormatter(text.toFixed(2)) + currency}
                  </div>
                  <div
                    className={classes.productColumn}
                    style={{ color: priceColor(record.margin_difference_product_percentage) }}
                  >
                    {record.margin_difference_product_percentage !== 0 && (
                    <div>
                      <div>{numberFormatter((text - record.margin_current_product).toFixed(2))} </div>
                      <div>{`(${numberFormatter(record.margin_difference_product_percentage)}%)`}</div>
                    </div>
                    )}
                  </div>
                </>
              ),
            },
            {
              title: t('TOTAL'),
              dataIndex: 'margin_new_gross',
              key: 'margin_new_gross',
              align: 'center',
              width: 100,
              render: (text, record) => (
                <>
                  <div>{numberFormatter(text.toFixed(2)) + currency}
                  </div>
                  <div
                    className={classes.productColumn}
                    style={{ color: priceColor(record.margin_difference_gross_percentage) }}
                  >
                    {record.margin_difference_gross_percentage !== 0 && (
                    <div>
                      <div>{numberFormatter((text - record.margin_current_gross).toFixed(0))} </div>
                      <div>{`(${numberFormatter(record.margin_difference_gross_percentage)}%)`}</div>
                    </div>
                    )}
                  </div>
                </>
              ),
            },
          ],
        },
      ],
    },
    {
      title: t('MARGIN'),
      children: [
        {
          title: t('CURRENT_GM'),
          dataIndex: 'margin_current_product_percentage',
          key: 'margin_current_product_percentage',
          align: 'center',
          width: 100,
          render: text => (
            <div>
              {numberFormatter(parseFloat(text).toFixed(2))}%
            </div>

          ),
        },
        {
          title: t('STRUCK_PRICE_MARGIN'),
          dataIndex: 'margin_new_product_percentage',
          key: 'margin_new_product_percentage',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <>
              <div>{numberFormatter(text)}% </div>
              <div
                className={classes.productColumn}
                style={{ color: priceColor(record.struck_price_margin_difference) }}
              >
                {record.struck_price_margin_difference !== 0 && (
                <div>
                  <div>{numberFormatter(record.struck_price_margin_difference)}% </div>
                </div>
                )}
              </div>
            </>
          ),
        },
      ],
    },
    {
      title: t('A&M'),
      children: [
        {
          title: t('CURRENT'),
          children: [
            {
              title: t('UNIT'),
              dataIndex: 'aandm',
              key: 'aandm',
              sorter: (a, b) => a.aandm - b.aandm,
              width: 100,
              align: 'center',
              render: (text, record) => (
                record.price > record.discounted_price ? (
                  <div>
                    <div>
                      {parseFloat(text).toFixed(2) + currency}
                    </div>
                    <div>
                      SSR: {`${(100 * parseFloat(record.current_ssr)).toFixed(1)}%`}
                    </div>
                  </div>
                )
                  : null
              ),
            },
            {
              title: t('TOTAL'),
              dataIndex: 'aandm_gross',
              key: 'aandm_gross',
              sorter: (a, b) => a.aandm_gross - b.aandm_gross,
              width: 100,
              align: 'center',
              render: (text, record) => (
                record.price > record.discounted_price ? (
                  <div>
                    {numberFormatter(parseFloat(text)) + currency}
                  </div>
                )
                  : null
              ),
            },
          ],
        },
        {
          title: t('NEW'),
          children: [
            {
              title: t('UNIT'),
              dataIndex: 'new_aandm_product',
              key: 'new_aandm_product',
              width: 120,
              align: 'center',
              render: (text, record) => (
                <>
                  <div>{numberFormatter(text.toFixed(2)) + currency}
                  </div>
                  <div
                    className={classes.productColumn}
                    style={{ color: priceColor(record.difference_aandm_percentage) }}
                  >
                    {record.difference_aandm_percentage !== 0 && (
                    <div>
                      <div>{numberFormatter((text - record.aandm).toFixed(2))} </div>
                      <div>{`(${numberFormatter(record.difference_aandm_percentage)}%)`}</div>
                    </div>
                    )}
                  </div>
                </>
              ),
            },
            {
              title: t('TOTAL'),
              dataIndex: 'new_aandm_gross',
              key: 'new_aandm_gross',
              sorter: (a, b) => a.new_aandm_gross - b.new_aandm_gross,
              width: 100,
              align: 'center',
              render: (text, record) => (
                <>
                  <div>{numberFormatter(text.toFixed(2)) + currency}
                  </div>
                  <div
                    className={classes.productColumn}
                    style={{ color: priceColor(calculatePercentage(record.aandm_gross, text)) }}
                  >
                    {calculatePercentage(record.aandm_gross, text) !== 0 && (
                    <div>
                      <div>{numberFormatter((text - record.aandm_gross).toFixed(2))} </div>
                      <div>{`(${numberFormatter(calculatePercentage(record.aandm_gross, text))}%)`}</div>
                    </div>
                    )}
                  </div>
                </>
              ),
            },
          ],
        },
      ],
    },
  ];

  if (!showAandM) columns = columns.filter(e => e.title !== t('A&M'));
  if (!showIndex) columns = columns.filter(e => e.title !== t('INDEX'));
  return columns;
};

export default TableColumns;
