import { useTranslation } from 'react-i18next';
import { Image, Row, Col, Divider, Tag, Tooltip } from 'antd';
import moment from 'moment';
import { WarningOutlined } from '@ant-design/icons';

import getirlogo from '@app/pages/MarketIntelligencePriceIndex/img/assets/getirlogo.png';
import downArrow from '@app/pages/MarketIntelligencePriceIndex/img/assets/down-arrow.png';
import noPicture from '@app/pages/MarketIntelligencePriceIndex/img/assets/no-pictures.png';

import { COMPETITORS } from '@app/pages/MarketIntelligencePriceIndex/constants';
import { backgroundColorProductFinder, colorProductFinder } from '@app/pages/MarketIntelligencePriceIndex/utils/colorFinder';

import useStyles from '@app/pages/MarketIntelligencePriceIndex/styles';

export const UPPER_CASE_FORMAT = 'YYYY-MM-DD';

const ProductColumns = (competitorList, countryCurrency) => {
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligencePriceIndex');

  const day = moment().format(UPPER_CASE_FORMAT);

  const tableProperties = [
    {
      title: (
        <Row className={classes.priceIndexRow}>
          <img
            src={getirlogo}
            alt={t('GETIR')}
            className={classes.priceIndexImage}
          />
          <span>{t('GETIR')}</span>
        </Row>
      ),
      dataIndex: 'getir_product_name',
      key: 'getir_product_name',
      sorter: (a, b) => a.getir_index - b.getir_index,
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'descend',
      align: 'center',
      fixed: 'left',
      width: 400,
      render: (text, record) => {
        return {
          props: {
            style: {
              fontWeight: 'bolder',
              backgroundColor: backgroundColorProductFinder(record.getir_index),
              color: colorProductFinder(record.getir_index),
            },
          },
          children: (
            <Row className={classes.rowChildrenContainer}>
              <Col className={classes.colChildrenImageContainer}>
                <Image
                  src={record.getir_image}
                  fallback={noPicture}
                  className={classes.rowChildrenImage}
                />
              </Col>
              <Col className={classes.colChildrenContainer}>
                <Row className={classes.rowTitle}>{text}</Row>
                <Row item><Tag color="purple">{record.segments}</Tag></Row>
                <Divider orientation="vertical" className={classes.divider} />
                <Row className={classes.rowChildrenContent}>
                  <Col
                    sm={6}
                    className={classes.colChildrenContent}
                  >
                    <Row sm={6} className={classes.downArrowRow}>
                      {record.getir_discounted_price &&
                        record.getir_discounted_price <
                        record.getir_price ? (
                          <img
                            src={downArrow}
                            alt={t('DOWN')}
                            className={classes.downButton}
                          />
                        ) : null}
                    </Row>
                    <Row
                      className={classes.priceIndexRow}
                      sm={6}
                    >
                      <div>
                        {`${parseFloat(record.getir_price).toFixed(2)} ${countryCurrency}`}
                      </div>
                      {record.getir_discounted_price &&
                        record.getir_discounted_price <
                        record.getir_price
                        ? (
                          <div className={classes.discountedPriceDiv}>
                            {`${parseFloat(
                              record.getir_discounted_price,
                            ).toFixed(2)} ${countryCurrency}`}
                          </div>
                        ) : null}
                    </Row>
                  </Col>
                  <Col sm={6} className={classes.priceIndexCol}>
                    <div className={classes.indexDiv}>
                      {parseFloat(record.getir_index).toFixed(0)}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          ),
        };
      },
    },
  ];
  competitorList.map(competitor => {
    return tableProperties.push({
      title: (
        <Row className={classes.priceIndexRow}>
          {COMPETITORS[competitor] ? (
            <>
              <img
                src={COMPETITORS[competitor][1]}
                alt={competitor}
                className={classes.priceIndexImage}
              />
              <span>{COMPETITORS[competitor][0]}</span>
            </>
          ) : (
            <>
              <img
                src={noPicture}
                alt={competitor}
                className={classes.priceIndexImage}
              />
              <span>{competitor}</span>
            </>
          )}
        </Row>
      ),
      dataIndex: `${competitor.toLowerCase()}_competitor_product_name`,
      key: `${competitor.toLowerCase()}_competitor_product_name`,
      sorter: (a, b) => a[`${competitor.toLowerCase()}_price_index`] - b[`${competitor.toLowerCase()}_price_index`],
      align: 'center',
      width: 250,
      render: (text, record) => {
        return {
          props: {
            style: {
              fontWeight: 'bolder',
              backgroundColor: backgroundColorProductFinder(
                record[`${competitor.toLowerCase()}_price_index`],
              ),
              color: colorProductFinder(
                record[`${competitor.toLowerCase()}_price_index`],
              ),
            },
          },
          children: record[`${competitor.toLowerCase()}_competitor_price`] ? (
            <Row className={classes.rowChildrenContainer}>
              <Col className={classes.colChildrenImageContainer}>
                <Image
                  src={record[`${competitor.toLowerCase()}_competitor_image`]}
                  fallback={noPicture}
                  className={classes.rowChildrenImage}
                />
              </Col>
              <Col className={classes.colChildrenContainer}>
                <Row className={classes.rowTitle}>{text}</Row>
                {day !==
                record[`${competitor.toLowerCase()}_last_crawl_date`]?.split(
                  ' ',
                )[0] ? (
                  <Tooltip title={t('LAST_CRAWL_DATE')} placement="bottom">
                    <Row className={classes.lastCrawlDate}>
                      <WarningOutlined
                        className={classes.exclamationCircle}
                        style={{ color: 'red', marginRight: '3px' }}
                      />
                      {
                        record[
                          `${competitor.toLowerCase()}_last_crawl_date`
                        ]?.split(' ')[0]
                      }
                    </Row>
                  </Tooltip>
                  ) : (
                    ''
                  )}
                <Divider orientation="vertical" className={classes.divider} />
                <Row className={classes.rowChildrenContent}>
                  <Col sm={6} className={classes.colChildrenContent}>
                    <Row className={classes.downArrowRow} sm={3}>
                      {record[
                        `${competitor.toLowerCase()}_competitor_discounted_price`
                      ] &&
                      record[
                        `${competitor.toLowerCase()}_competitor_discounted_price`
                      ] <
                        record[
                          `${competitor.toLowerCase()}_competitor_price`
                        ] ? (
                          <img
                            src={downArrow}
                            alt={t('DOWN')}
                            className={classes.downButton}
                          />
                        ) : null}
                    </Row>
                    <Row className={classes.priceIndexRow} sm={6}>
                      <div>
                        {`${parseFloat(
                          record[`${competitor.toLowerCase()}_competitor_price`],
                        ).toFixed(2)} ${countryCurrency}`}
                      </div>
                      {record[
                        `${competitor.toLowerCase()}_competitor_discounted_price`
                      ] &&
                      record[
                        `${competitor.toLowerCase()}_competitor_discounted_price`
                      ] <
                        record[
                          `${competitor.toLowerCase()}_competitor_price`
                        ] ? (
                          <div className={classes.discountedPriceDiv}>
                            {` ${parseFloat(
                              record[
                                `${competitor.toLowerCase()}_competitor_discounted_price`
                              ],
                            ).toFixed(2)} ${countryCurrency} `}
                          </div>
                        ) : null}
                    </Row>
                  </Col>
                  <Col className={classes.priceIndexCol} sm={6}>
                    {`${parseFloat(
                      record[`${competitor.toLowerCase()}_price_index`],
                    ).toFixed(0)}`}
                  </Col>
                </Row>
              </Col>
            </Row>
          ) : null,
        };
      },
    });
  });

  return tableProperties;
};

export default ProductColumns;
